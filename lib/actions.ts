"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";
import { INITIAL_PROJECTS, ProjectData } from "@/lib/seed-data";
import { signToken, setAdminCookie, clearAdminCookie, getAdminSession } from "@/lib/auth";
import { saveContact, listContacts } from "@/lib/contacts-store";
import { notifyNewContact, sendText, ownerNumber, whatsappStatus } from "@/lib/whatsapp";
import { z } from "zod";

// Shared memory store fallback when MongoDB is not connected
let memoryProjects: ProjectData[] = [...INITIAL_PROJECTS];

// Zod Validation Schemas
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const projectSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(2, "Title is required"),
  subtitle: z.string().min(2, "Subtitle is required"),
  description: z.string().min(5, "Description is required"),
  techBadges: z.array(z.string()),
  liveLink: z.string().url("Must be a valid URL"),
  githubLink: z.string().optional(),
  featured: z.boolean().default(true),
  category: z.string().min(1, "Category is required"),
  architecture: z.object({
    auth: z.string(),
    database: z.string(),
    caching: z.string(),
    apis: z.string(),
    systemHighlights: z.array(z.string()),
  }),
});

// Contact Submission Server Action
export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const validated = contactSchema.parse(rawData);

    // Saved first so it always reaches the admin inbox; the WhatsApp alert is best-effort.
    const saved = await saveContact(validated);
    const alert = await notifyNewContact(saved);
    if (!alert.ok && whatsappStatus().configured) console.error("[whatsapp] alert failed:", alert.error);
    revalidatePath("/admin");

    return { success: true, message: "Message sent successfully! Abhishek will get back to you shortly." };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: error.message || "Failed to submit message." };
  }
}

// Admin Login Server Action
export async function loginAdmin(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const validUsername = process.env.ADMIN_USERNAME || "admin";
  const validPassword = process.env.ADMIN_PASSWORD || "admin123password";

  if (username === validUsername && password === validPassword) {
    const token = signToken(username);
    await setAdminCookie(token);
    redirect("/admin");
  }

  return { success: false, error: "Invalid username or password credentials." };
}

// Admin Logout Server Action
export async function logoutAdmin() {
  await clearAdminCookie();
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin/login");
}

// Get All Projects Action
export async function getProjects(): Promise<ProjectData[]> {
  try {
    const db = await connectToDatabase();
    if (db) {
      const dbProjects = await Project.find({}).sort({ createdAt: -1 }).lean();
      if (dbProjects.length > 0) {
        return dbProjects.map((p: any) => ({
          _id: p._id.toString(),
          id: p.id,
          title: p.title,
          subtitle: p.subtitle,
          description: p.description,
          techBadges: p.techBadges || [],
          liveLink: p.liveLink,
          githubLink: p.githubLink,
          featured: p.featured ?? true,
          category: p.category,
          architecture: p.architecture || {
            auth: "Standard JWT",
            database: "MongoDB",
            caching: "Redis",
            apis: "REST API",
            systemHighlights: [],
          },
        }));
      }
    }
  } catch (err) {
    console.error("Error fetching projects from MongoDB, using fallback memory state:", err);
  }

  return memoryProjects;
}

// Create Project (Admin Protected)
export async function createProjectAction(data: ProjectData) {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized access. Admin login required.");
  }

  try {
    const validated = projectSchema.parse(data);
    const db = await connectToDatabase();

    if (db) {
      await Project.create(validated);
    } else {
      memoryProjects.unshift(validated as ProjectData);
    }

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, message: "Project created successfully!" };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create project." };
  }
}

// Update Project (Admin Protected)
export async function updateProjectAction(id: string, data: Partial<ProjectData>) {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized access. Admin login required.");
  }

  try {
    const db = await connectToDatabase();
    if (db) {
      await Project.findOneAndUpdate({ id }, data, { new: true });
    } else {
      memoryProjects = memoryProjects.map((p) => (p.id === id ? { ...p, ...data } : p));
    }

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, message: "Project updated successfully!" };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update project." };
  }
}

// Delete Project (Admin Protected)
export async function deleteProjectAction(id: string) {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized access. Admin login required.");
  }

  try {
    const db = await connectToDatabase();
    if (db) {
      await Project.findOneAndDelete({ id });
    } else {
      memoryProjects = memoryProjects.filter((p) => p.id !== id);
    }

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, message: "Project deleted successfully!" };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete project." };
  }
}

// Fetch Contacts for Admin
export async function getAdminContacts() {
  const session = await getAdminSession();
  if (!session) return [];
  return listContacts();
}

// Sends a sample alert so the owner can confirm WhatsApp is wired up (Admin Protected)
export async function sendTestWhatsAppAction() {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized access. Admin login required.");

  const status = whatsappStatus();
  if (!status.configured) {
    return { success: false, error: "WhatsApp isn't set up yet. Add WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_NOTIFY_TO." };
  }
  const res = status.mode === "template"
    ? await notifyNewContact({ name: "Test Sender", email: "test@example.com", subject: "Test alert from Studio", message: "If you can read this, portfolio alerts are working.", createdAt: new Date() })
    : await sendText(ownerNumber(), "Test alert from your portfolio Studio. If you can read this, WhatsApp is connected.");
  return res.ok
    ? { success: true, message: `Test alert sent to ${status.to}.` }
    : { success: false, error: res.error };
}
