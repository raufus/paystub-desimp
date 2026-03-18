"use server"

import { cookies } from "next/headers"
import { adminLogin as adminLoginAuth, getAdminFromToken, adminLogout as adminLogoutAuth } from "./admin-auth"
import { query, queryOne } from "./db/mysql"

// Admin Login Action
export async function adminLogin(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  console.log("Admin login attempt for:", email)

  const result = await adminLoginAuth(email.toString(), password.toString())

  if (!result) {
    console.log("Admin authentication failed for:", email)
    return { error: "Invalid email or password" }
  }

  console.log("Admin authentication successful for:", email)

  // Set cookie
  const cookieStore = await cookies()
  cookieStore.set("admin_token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/"
  })

  console.log("Admin cookie set successfully")

  return { success: true, redirectTo: "/admin" }
}

// Admin Logout Action
export async function adminLogout() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value

  if (token) {
    await adminLogoutAuth(token)
  }

  cookieStore.delete("admin_token")
  return { success: true }
}

// Get Current Admin
export async function getCurrentAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value

  if (!token) {
    return null
  }

  return await getAdminFromToken(token)
}

// Get Dashboard Stats
export async function getDashboardStats() {
  try {
    const totalUsersResult = await query("SELECT COUNT(*) as count FROM users") as any[]
    const totalPaystubsResult = await query("SELECT COUNT(*) as count FROM paystubs") as any[]
    const totalOrdersResult = await query("SELECT COUNT(*) as count FROM orders") as any[]
    const totalRevenueResult = await query("SELECT SUM(amount) as total FROM orders WHERE status = 'completed'") as any[]

    const recentUsers = await query(
      "SELECT id, email, created_at FROM users ORDER BY created_at DESC LIMIT 5"
    ) as any[]

    const recentPaystubs = await query(
      `SELECT p.id, p.employee_name, p.created_at, u.email 
       FROM paystubs p 
       JOIN users u ON p.user_id = u.id 
       ORDER BY p.created_at DESC LIMIT 5`
    ) as any[]

    // Convert totalRevenue to number
    const totalRevenue = totalRevenueResult[0]?.total ? parseFloat(totalRevenueResult[0].total) : 0

    return {
      totalUsers: totalUsersResult[0]?.count || 0,
      totalPaystubs: totalPaystubsResult[0]?.count || 0,
      totalOrders: totalOrdersResult[0]?.count || 0,
      totalRevenue: totalRevenue,
      recentUsers: Array.isArray(recentUsers) ? recentUsers : [],
      recentPaystubs: Array.isArray(recentPaystubs) ? recentPaystubs : []
    }
  } catch (error) {
    console.error("Get dashboard stats error:", error)
    return null
  }
}

// Get All Users
export async function getAllUsers(page: number = 1, limit: number = 10) {
  try {
    const offset = (page - 1) * limit

    const users = await query(
      `SELECT id, email, full_name, created_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    ) as any[]

    const countResult = await query("SELECT COUNT(*) as total FROM users") as any[]
    const total = countResult[0]?.total || 0

    return {
      users: Array.isArray(users) ? users : [],
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  } catch (error) {
    console.error("Get all users error:", error)
    return null
  }
}

// Get User Details
export async function getUserDetails(userId: number) {
  try {
    const user = await queryOne("SELECT * FROM users WHERE id = ?", [userId])

    if (!user) {
      return null
    }

    const paystubs = await query("SELECT * FROM paystubs WHERE user_id = ? ORDER BY created_at DESC", [userId]) as any[]

    const orders = await query("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC", [userId]) as any[]

    return {
      user,
      paystubs: Array.isArray(paystubs) ? paystubs : [],
      orders: Array.isArray(orders) ? orders : []
    }
  } catch (error) {
    console.error("Get user details error:", error)
    return null
  }
}

// Get All Paystubs
export async function getAllPaystubs(page: number = 1, limit: number = 10) {
  try {
    const offset = (page - 1) * limit

    const paystubs = await query(
      `SELECT p.*, u.email FROM paystubs p 
       JOIN users u ON p.user_id = u.id 
       ORDER BY p.created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    ) as any[]

    const countResult = await query("SELECT COUNT(*) as total FROM paystubs") as any[]
    const total = countResult[0]?.total || 0

    return {
      paystubs: Array.isArray(paystubs) ? paystubs : [],
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  } catch (error) {
    console.error("Get all paystubs error:", error)
    return null
  }
}

// Get All Orders
export async function getAllOrders(page: number = 1, limit: number = 10) {
  try {
    const offset = (page - 1) * limit

    const orders = await query(
      `SELECT o.*, u.email FROM orders o 
       JOIN users u ON o.user_id = u.id 
       ORDER BY o.created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    ) as any[]

    const countResult = await query("SELECT COUNT(*) as total FROM orders") as any[]
    const total = countResult[0]?.total || 0

    return {
      orders: Array.isArray(orders) ? orders : [],
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  } catch (error) {
    console.error("Get all orders error:", error)
    return null
  }
}

// Delete User
export async function deleteUser(userId: number) {
  try {
    // Delete related data first
    await query("DELETE FROM paystubs WHERE user_id = ?", [userId])
    await query("DELETE FROM orders WHERE user_id = ?", [userId])
    await query("DELETE FROM tax_returns WHERE user_id = ?", [userId])
    await query("DELETE FROM w2_forms WHERE user_id = ?", [userId])
    await query("DELETE FROM form_1099 WHERE user_id = ?", [userId])

    // Delete user
    await query("DELETE FROM users WHERE id = ?", [userId])

    return { success: true }
  } catch (error) {
    console.error("Delete user error:", error)
    return { error: "Failed to delete user" }
  }
}

// Delete Paystub
export async function deletePaystub(paystubId: number) {
  try {
    await query("DELETE FROM paystubs WHERE id = ?", [paystubId])
    return { success: true }
  } catch (error) {
    console.error("Delete paystub error:", error)
    return { error: "Failed to delete paystub" }
  }
}

// Get Activity Logs
export async function getActivityLogs(page: number = 1, limit: number = 20) {
  try {
    const offset = (page - 1) * limit

    const logs = await query(
      `SELECT al.*, u.email FROM activity_logs al 
       LEFT JOIN users u ON al.user_id = u.id 
       ORDER BY al.created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    ) as any[]

    const countResult = await query("SELECT COUNT(*) as total FROM activity_logs") as any[]
    const total = countResult[0]?.total || 0

    return {
      logs: Array.isArray(logs) ? logs : [],
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  } catch (error) {
    console.error("Get activity logs error:", error)
    return null
  }
}

// Get Admin Audit Logs
export async function getAdminAuditLogs(page: number = 1, limit: number = 20) {
  try {
    const offset = (page - 1) * limit

    const logs = await query(
      `SELECT aal.*, aa.email FROM admin_audit_log aal 
       LEFT JOIN admin_users aa ON aal.admin_id = aa.id 
       ORDER BY aal.created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    ) as any[]

    const countResult = await query("SELECT COUNT(*) as total FROM admin_audit_log") as any[]
    const total = countResult[0]?.total || 0

    return {
      logs: Array.isArray(logs) ? logs : [],
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  } catch (error) {
    console.error("Get admin audit logs error:", error)
    return null
  }
}

// Get Support Tickets
export async function getSupportTickets(page: number = 1, limit: number = 10) {
  try {
    const offset = (page - 1) * limit

    const tickets = await query(
      `SELECT st.*, u.email FROM support_tickets st 
       JOIN users u ON st.user_id = u.id 
       ORDER BY st.created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    ) as any[]

    const countResult = await query("SELECT COUNT(*) as total FROM support_tickets") as any[]
    const total = countResult[0]?.total || 0

    return {
      tickets: Array.isArray(tickets) ? tickets : [],
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  } catch (error) {
    console.error("Get support tickets error:", error)
    return null
  }
}

// Update Ticket Status
export async function updateTicketStatus(ticketId: number, status: string) {
  try {
    await query("UPDATE support_tickets SET status = ? WHERE id = ?", [status, ticketId])
    return { success: true }
  } catch (error) {
    console.error("Update ticket status error:", error)
    return { error: "Failed to update ticket" }
  }
}
