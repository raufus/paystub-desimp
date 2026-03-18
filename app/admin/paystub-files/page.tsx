"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, ChevronLeft, ChevronRight } from "lucide-react"

interface PaystubFile {
  id: number
  email: string
  filename: string
  employee_name: string | null
  pay_date: string | null
  gross_pay: number | null
  net_pay: number | null
  created_at: string
}

export default function AdminPaystubFilesPage() {
  const [files, setFiles] = useState<PaystubFile[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(0)

  useEffect(() => {
    fetchFiles()
  }, [page])

  const fetchFiles = async () => {
    try {
      const response = await fetch(`/api/admin/paystub-files?page=${page}`)
      const data = await response.json()
      setFiles(data.files || [])
      setTotal(data.total || 0)
      setPages(data.pages || 0)
    } catch (error) {
      console.error("Failed to fetch files:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading paystub files...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paystub Files</h1>
        <p className="text-gray-600 mt-2">View all purchased paystub files</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Files</p>
              <p className="text-3xl font-bold text-gray-900">{total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Gross Pay</p>
              <p className="text-3xl font-bold text-gray-900">
                ${files.reduce((sum, f) => sum + (f.gross_pay || 0), 0).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Net Pay</p>
              <p className="text-3xl font-bold text-gray-900">
                ${files.reduce((sum, f) => sum + (f.net_pay || 0), 0).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Files Table */}
      <Card>
        <CardHeader>
          <CardTitle>Paystub Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">User Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Filename</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Employee</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Pay Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Gross Pay</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Net Pay</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Created</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {files.map(file => (
                  <tr key={file.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900 text-sm">{file.email}</td>
                    <td className="py-3 px-4 text-gray-900 text-sm">{file.filename}</td>
                    <td className="py-3 px-4 text-gray-900">{file.employee_name || "-"}</td>
                    <td className="py-3 px-4 text-gray-900">
                      {file.pay_date ? new Date(file.pay_date).toLocaleDateString() : "-"}
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      {file.gross_pay ? `$${file.gross_pay.toFixed(2)}` : "-"}
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      {file.net_pay ? `$${file.net_pay.toFixed(2)}` : "-"}
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {new Date(file.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" className="gap-1">
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
    </div>
  )
}
