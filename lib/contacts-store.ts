import "server-only";
import { connectToDatabase } from "@/lib/mongodb";
import Contact from "@/models/Contact";

// Contact messages live in MongoDB; without MONGODB_URI they fall back to this in-memory list.
// Kept out of lib/actions.ts on purpose: everything exported from a "use server" file is callable from the browser.

export interface ContactInput { name: string; email: string; subject: string; message: string }
export interface ContactRecord extends ContactInput { _id?: string; status?: "unread" | "read" | "replied"; createdAt: string | Date }

const memory: ContactRecord[] = [];

export async function saveContact(c: ContactInput): Promise<ContactRecord> {
  const db = await connectToDatabase();
  if (db) {
    const doc = await Contact.create(c);
    return JSON.parse(JSON.stringify(doc.toObject()));
  }
  const rec: ContactRecord = { ...c, status: "unread", createdAt: new Date() };
  memory.unshift(rec);
  return rec;
}

/** Newest first. */
export async function listContacts(limit = 200): Promise<ContactRecord[]> {
  try {
    const db = await connectToDatabase();
    if (db) return JSON.parse(JSON.stringify(await Contact.find({}).sort({ createdAt: -1 }).limit(limit).lean()));
  } catch (err) {
    console.error("Error fetching contacts from DB:", err);
  }
  return memory.slice(0, limit);
}

export async function countUnread(): Promise<number> {
  const db = await connectToDatabase();
  if (db) return Contact.countDocuments({ status: "unread" });
  return memory.filter((c) => !c.status || c.status === "unread").length;
}

export async function markAllRead(): Promise<number> {
  const db = await connectToDatabase();
  if (db) {
    const res = await Contact.updateMany({ status: "unread" }, { $set: { status: "read" } });
    return res.modifiedCount ?? 0;
  }
  let n = 0;
  memory.forEach((c) => { if (!c.status || c.status === "unread") { c.status = "read"; n++; } });
  return n;
}
