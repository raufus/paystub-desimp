"use client"

import { useState, useEffect } from "react"
import { getAllOrders } from "@/lib/admin-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye } from "lucide-react"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState("")

  useEffect(() => {
    loadOrders()
  }, [page])

  const loadOrders = async () => {
    setLoading(true)
    try {
      const result = await getAllOrders(page, 10)
      if (result && Array.isArray(result.orders)) {
        setOrders(result.orders)
        setTotalPages(result.pages)
      } else {
        console.error("Failed to load orders: invalid result", result)
        setOrders([])
      }
    } catch (error) {
      console.error("Error loading orders:", error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const filteredOrders = Array.isArray(orders) ? orders.filter(
    (o) =>
      o.email.toLowerCase().includes(search.toLowerCase()) ||
      o.package_type.toLowerCase().includes(search.toLowerCase())
  ) : []

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
        <p className="text-gray-600 mt-2">Manage all customer orders</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Input
            placeholder="Search by email or package type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Orders ({orders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">User Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Package</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">{order.id}</td>
                      <td className="py-3 px-4">{order.email}</td>
                      <td className="py-3 px-4 capitalize">{order.package_type}</td>
                      <td className="py-3 px-4">${order.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Eye size={16} />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No orders found</p>
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
