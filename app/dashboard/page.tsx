import { getCurrentUser } from "@/lib/get-user"
import { redirect } from "next/navigation"
import DashboardClient from "@/components/dashboard-client"
import { getUserPaystubs, getUserOrders } from "@/lib/actions"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch user's paystubs
  const paystubsResult = await getUserPaystubs()
  const paystubs = paystubsResult.success ? paystubsResult.data : []

  // Fetch user's orders
  const ordersResult = await getUserOrders()
  const orders = ordersResult.success ? ordersResult.data : []

  return <DashboardClient user={user} paystubs={paystubs || []} orders={orders || []} />
}

