"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface PaymentTransaction {
  id: number
  user_id: number
  order_id: number
  email: string
  payment_method: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed" | "refunded"
  transaction_id: string
  created_at: string
}

export default function PaymentsPage() {
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(0)
  const [selectedTransaction, setSelectedTransaction] = useState<PaymentTransaction | null>(null)
  const [viewOpen, setViewOpen] = useState(false)

  useEffect(() => {
    fetchTransactions()
  }, [page])

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`/api/admin/payments?page=${page}`)
      const data = await response.json()
      setTransactions(data.transactions || [])
      setTotal(data.total || 0)
      setPages(data.pages || 0)
    } catch (error) {
      console.error("Failed to fetch transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case "stripe":
        return "bg-blue-100 text-blue-800"
      case "paypal":
        return "bg-indigo-100 text-indigo-800"
      case "card":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading payments...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600 mt-2">View and manage payment transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Transactions</p>
              <p className="text-3xl font-bold text-gray-900">{total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-3xl font-bold text-green-600">
                {transactions.filter(t => t.status === "completed").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">
                {transactions.filter(t => t.status === "pending").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">
                ${transactions
                  .filter(t => t.status === "completed")
                  .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0)
                  .toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Method</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">#{transaction.id}</td>
                    <td className="py-3 px-4 text-gray-900">{transaction.email}</td>
                    <td className="py-3 px-4">
                      <Badge className={getMethodColor(transaction.payment_method)}>
                        {transaction.payment_method.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      ${(parseFloat(transaction.amount) || 0).toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => {
                          setSelectedTransaction(transaction)
                          setViewOpen(true)
                        }}
                      >
                        <Eye size={16} />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Page {page} of {pages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(Math.min(pages, page + 1))}
                disabled={page === pages}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Modal */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Transaction ID: #{selectedTransaction?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">User Email</p>
                  <p className="font-medium text-gray-900">{selectedTransaction.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <Badge className={getMethodColor(selectedTransaction.payment_method)}>
                    {selectedTransaction.payment_method.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="font-medium text-gray-900">
                    ${(parseFloat(selectedTransaction.amount) || 0).toFixed(2)} {selectedTransaction.currency}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge className={getStatusColor(selectedTransaction.status)}>
                    {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">User ID</p>
                  <p className="font-medium text-gray-900">{selectedTransaction.user_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-medium text-gray-900">{selectedTransaction.order_id}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Transaction ID</p>
                  <p className="font-medium text-gray-900 break-all">{selectedTransaction.transaction_id || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(selectedTransaction.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
