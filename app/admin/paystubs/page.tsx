"use client"

import { useState, useEffect } from "react"
import { getAllPaystubs, deletePaystub } from "@/lib/admin-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Eye, Download } from "lucide-react"
import Link from "next/link"

export default function AdminPaystubsPage() {
  const [paystubs, setPaystubs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState("")

  useEffect(() => {
    loadPaystubs()
  }, [page])

  const loadPaystubs = async () => {
    setLoading(true)
    try {
      const result = await getAllPaystubs(page, 10)
      if (result && Array.isArray(result.paystubs)) {
        setPaystubs(result.paystubs)
        setTotalPages(result.pages)
      } else {
        console.error("Failed to load paystubs: invalid result", result)
        setPaystubs([])
      }
    } catch (error) {
      console.error("Error loading paystubs:", error)
      setPaystubs([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (paystubId: number) => {
    if (confirm("Are you sure you want to delete this paystub?")) {
      await deletePaystub(paystubId)
      loadPaystubs()
    }
  }

  const filteredPaystubs = Array.isArray(paystubs) ? paystubs.filter(
    (p) =>
      p.employee_name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  ) : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paystubs Management</h1>
        <p className="text-gray-600 mt-2">Manage all generated paystubs</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Input
            placeholder="Search by employee name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Paystubs ({paystubs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : filteredPaystubs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Employee</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">User Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Created</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPaystubs.map((paystub) => (
                    <tr key={paystub.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{paystub.employee_name}</td>
                      <td className="py-3 px-4">{paystub.company_name || "-"}</td>
                      <td className="py-3 px-4">{paystub.email}</td>
                      <td className="py-3 px-4">{new Date(paystub.created_at).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Eye size={16} />
                          View
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(paystub.id)}
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
            <p className="text-gray-600">No paystubs found</p>
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
              <span className="py-2 px-4">Page {page} of {totalPages}</span>
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
