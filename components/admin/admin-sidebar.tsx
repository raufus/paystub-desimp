"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  ShoppingCart,
  Settings,
  BarChart3,
  LogOut,
  Menu,
  X,
  CreditCard,
  BookOpen,
  Briefcase
} from "lucide-react"
import { useState } from "react"
import { adminLogout } from "@/lib/admin-actions"
import { useRouter } from "next/navigation"

interface AdminUser {
  id: number
  email: string
  full_name: string | null
  role: string
}

export function AdminSidebar({ admin }: { admin: AdminUser }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/paystubs", label: "Paystubs", icon: FileText },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/payments", label: "Payments", icon: CreditCard },
    { href: "/admin/blog", label: "Blog", icon: BookOpen },
    { href: "/admin/services", label: "Services", icon: Briefcase },
    { href: "/admin/support", label: "Support", icon: LogOut },
    { href: "/admin/reports", label: "Reports", icon: BarChart3 },
    { href: "/admin/logs", label: "Logs", icon: LogOut },
    { href: "/admin/settings", label: "Settings", icon: Settings }
  ]

  const handleLogout = async () => {
    try {
      await adminLogout()
      router.push("/admin-login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
      router.push("/admin-login")
      router.refresh()
    }
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static w-64 h-screen bg-card border-r border-border transition-transform duration-300 z-40 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold">Admin</h1>
          <p className="text-sm text-muted-foreground mt-1">{admin.role}</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
