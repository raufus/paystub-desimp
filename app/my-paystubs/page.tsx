"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

interface PaystubFile {
  id: number
  filename: string
  employee_name: string | null
  pay_date: string | null
  gross_pay: number | null
  net_pay: number | null
  created_at: string
}

export default function MyPaystubsPage() {
  const [paystubs, setPaystubs] = useState<PaystubFile[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(0)

  useEffect(() => {
    fetchPaystubs()
  }, [page])

  const fetchPaystubs = async () => {
    try {
      const response = await fetch(`/api/paystub-files?page=${page}`)
      const data = await response.json()
      setPaystubs(data.files || [])
      setTotal(data.total || 0)
      setPages(data.pages || 0)
    } catch (error) {
      console.error("Failed to fetch paystubs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (fileId: number, filename: string) => {
    try {
      const response = await fetch(`/api/paystub-files/${fileId}/download`)
      if (!response.ok) throw new Error("Download failed")
      
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download error:", error)
      alert("Failed to download paystub")
    }
  }

  const handleDelete = async (fileId: number) => {
    if (!confirm("Are you sure you want to delete this paystub?")) return
    
    try {
      const response = await fetch(`/api/paystub-files/${fileId}`, { method: "DELETE" })
      if (response.ok) {
        setPaystubs(paystubs.filter(p => p.id !== fileId))
        setTotal(total - 1)
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("Failed to delete paystub")
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading paystubs...</div>
  }

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Paystubs</h1>
          <p className="text-gray-600 mt-2">View and download your purchased paystubs</p>
        </div>

        {paystubs.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-600 py-8">No paystubs yet. Create one to get started!</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Your Paystubs ({total})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Filename</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Employee</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Pay Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Gross Pay</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Net Pay</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date Created</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paystubs.map(paystub => (
                        <tr key={paystub.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-900 text-sm">{paystub.filename}</td>
                          <td className="py-3 px-4 text-gray-900">{paystub.employee_name || "-"}</td>
                          <td className="py-3 px-4 text-gray-900">
                            {paystub.pay_date ? new Date(paystub.pay_date).toLocaleDateString() : "-"}
                          </td>
                          <td className="py-3 px-4 text-gray-900">
                            {paystub.gross_pay ? `$${paystub.gross_pay.toFixed(2)}` : "-"}
                          </td>
                          <td className="py-3 px-4 text-gray-900">
                            {paystub.net_pay ? `$${paystub.net_pay.toFixed(2)}` : "-"}
                          </td>
                          <td className="py-3 px-4 text-gray-600 text-sm">
                            {new Date(paystub.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDownload(paystub.id, paystub.filename)}
                                className="gap-1"
                              >
                                <Download size={16} />
                                Download
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(paystub.id)}
                                className="gap-1 text-red-600 hover:text-red-700"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
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
          </>
        )}
      </div>
    </div>
  )
}
