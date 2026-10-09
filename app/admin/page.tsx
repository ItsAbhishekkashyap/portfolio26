import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getProjects, getAdminContacts } from "@/lib/actions";
import { whatsappStatus } from "@/lib/whatsapp";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const projects = await getProjects();
  // Mongo documents carry ObjectIds and Dates; client components need plain JSON.
  const contacts = JSON.parse(JSON.stringify(await getAdminContacts()));

  return <AdminDashboard initialProjects={projects} contacts={contacts} whatsapp={whatsappStatus()} />;
}
