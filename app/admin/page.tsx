import { getDashboardStats } from "@/lib/admin-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, ShoppingCart, DollarSign } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Failed to load dashboard data</p>
      </div>
    )
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-500",
      href: "/admin/users"
    },
    {
      title: "Total Paystubs",
      value: stats.totalPaystubs,
      icon: FileText,
      color: "bg-green-500",
      href: "/admin/paystubs"
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "bg-purple-500",
      href: "/admin/orders"
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-orange-500",
      href: "/admin/reports"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.href} href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`${stat.color} p-2 rounded-lg`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentUsers && stats.recentUsers.length > 0 ? (
                stats.recentUsers.map((user: any) => (
                  <div key={user.id} className="flex items-center justify-between pb-4 border-b last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{user.email}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No recent users</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Paystubs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Paystubs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentPaystubs && stats.recentPaystubs.length > 0 ? (
                stats.recentPaystubs.map((paystub: any) => (
                  <div key={paystub.id} className="flex items-center justify-between pb-4 border-b last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{paystub.employee_name}</p>
                      <p className="text-sm text-gray-600">{paystub.email}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {new Date(paystub.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No recent paystubs</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
