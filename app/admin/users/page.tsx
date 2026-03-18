"use client"

import { useState, useEffect } from "react"
import { getAllUsers, deleteUser } from "@/lib/admin-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Eye } from "lucide-react"
import Link from "next/link"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState("")

  useEffect(() => {
    loadUsers()
  }, [page])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const result = await getAllUsers(page, 10)
      if (result && Array.isArray(result.users)) {
        setUsers(result.users)
        setTotalPages(result.pages)
      } else {
        console.error("Failed to load users: invalid result", result)
        setUsers([])
      }
    } catch (error) {
      console.error("Error loading users:", error)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId)
      loadUsers()
    }
  }

  const filteredUsers = Array.isArray(users) ? users.filter(
    (user) =>
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      (user.full_name && user.full_name.toLowerCase().includes(search.toLowerCase()))
  ) : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
        <p className="text-gray-600 mt-2">Manage all registered users</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Input
            placeholder="Search by email or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{user.full_name || "-"}</td>
                      <td className="py-3 px-4">{new Date(user.created_at).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <Link href={`/admin/users/${user.id}`}>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye size={16} />
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                          className="gap-2"
                        >
                          <Trash2 size={16} />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No users found</p>
          )}

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="py-2 px-4">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
