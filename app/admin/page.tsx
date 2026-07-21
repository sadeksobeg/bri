import { cookies } from "next/headers";
import { verifySession, getSessionCookieName } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(getSessionCookieName())?.value;
  const valid = sessionCookie ? await verifySession(sessionCookie) : false;

  if (!valid) {
    redirect("/admin/login");
  }

  return <AdminDashboard />;
}
