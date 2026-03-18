import { getAdminFromToken } from "@/lib/admin-auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value

  // If no token, redirect to login
  if (!token) {
    redirect("/admin/login")
  }

  const admin = await getAdminFromToken(token)

  // If token is invalid, redirect to login
  if (!admin) {
    redirect("/admin/login")
  }

  // If we have a valid admin, render with sidebar and header
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar admin={admin} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader admin={admin} />

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
