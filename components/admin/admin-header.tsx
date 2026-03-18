"use client"

import { Bell, Settings, User } from "lucide-react"

interface AdminUser {
  id: number
  email: string
  full_name: string | null
  role: string
}

export function AdminHeader({ admin }: { admin: AdminUser }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {admin.full_name || admin.email}</h2>
        <p className="text-sm text-gray-600">Manage your application from here</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} className="text-gray-600" />
        </button>

        {/* Settings */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings size={20} className="text-gray-600" />
        </button>

        {/* Profile */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <User size={20} className="text-gray-600" />
        </button>
      </div>
    </header>
  )
}
