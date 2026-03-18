"use client"

import { useState, useEffect, use } from "react"
import { getUserDetails } from "@/lib/admin-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Calendar, FileText, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function UserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [user, setUser] = useState<any>(null)
  const [paystubs, setPaystubs] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserDetails()
  }, [id])

  const loadUserDetails = async () => {
    setLoading(true)
    try {
      const result = await getUserDetails(parseInt(id))
      if (result) {
        setUser(result.user)
        setPaystubs(Array.isArray(result.paystubs) ? result.paystubs : [])
        setOrders(Array.isArray(result.orders) ? result.orders : [])
      }
    } catch (error) {
      console.error("Error loading user details:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading user details...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">User not found</p>
        <Link href="/admin/users">
          <Button className="mt-4">Back to Users</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/users">
          <Button variant="outline" size="sm">
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{user.full_name || user.email}</h1>
          <p className="text-gray-600 mt-1">User Details</p>
        </div>
      </div>

      {/* User Information */}
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <div className="flex items-center gap-2 mt-1">
                <Mail size={16} className="text-gray-400" />
                <p className="text-gray-900">{user.email}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <p className="text-gray-900 mt-1">{user.full_name || "-"}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Joined Date</label>
              <div className="flex items-center gap-2 mt-1">
                <Calendar size={16} className="text-gray-400" />
                <p className="text-gray-900">{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Account Status</label>
              <p className="text-gray-900 mt-1">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Paystubs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={20} />
            Paystubs ({paystubs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {paystubs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Employee</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Created</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paystubs.map((paystub) => (
                    <tr key={paystub.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{paystub.employee_name}</td>
                      <td className="py-3 px-4">{paystub.company_name || "-"}</td>
                      <td className="py-3 px-4">{new Date(paystub.created_at).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="outline" size="sm">
                          View
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
        </CardContent>
      </Card>

      {/* User Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart size={20} />
            Orders ({orders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Package</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">{order.id}</td>
                      <td className="py-3 px-4 capitalize">{order.package_type}</td>
                      <td className="py-3 px-4">${order.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{new Date(order.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No orders found</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
