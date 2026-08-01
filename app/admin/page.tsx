import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getProjects, getAdminContacts } from "@/lib/actions";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const projects = await getProjects();
  const contacts = await getAdminContacts();

  return <AdminDashboard initialProjects={projects} contacts={contacts} />;
}
