"use client"

import { useState, useEffect } from "react"
import { getActivityLogs } from "@/lib/admin-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState("")

  useEffect(() => {
    loadLogs()
  }, [page])

  const loadLogs = async () => {
    setLoading(true)
    try {
      const result = await getActivityLogs(page, 20)
      if (result && Array.isArray(result.logs)) {
        setLogs(result.logs)
        setTotalPages(result.pages)
      } else {
        console.error("Failed to load logs: invalid result", result)
        setLogs([])
      }
    } catch (error) {
      console.error("Error loading logs:", error)
      setLogs([])
    } finally {
      setLoading(false)
    }
  }

  const filteredLogs = Array.isArray(logs) ? logs.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      (log.email && log.email.toLowerCase().includes(search.toLowerCase()))
  ) : []

  const getActionColor = (action: string) => {
    if (action.includes("create") || action.includes("add")) return "bg-green-100 text-green-800"
    if (action.includes("delete") || action.includes("remove")) return "bg-red-100 text-red-800"
    if (action.includes("update") || action.includes("edit")) return "bg-blue-100 text-blue-800"
    if (action.includes("download") || action.includes("export")) return "bg-purple-100 text-purple-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
        <p className="text-gray-600 mt-2">Track all user activities</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Input
            placeholder="Search by action or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Logs ({logs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : filteredLogs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">User Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{log.email || "System"}</td>
                      <td className="py-3 px-4">{log.action}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getActionColor(log.action)}`}>
                          {log.action_type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No logs found</p>
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
