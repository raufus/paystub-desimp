"use server"

import { query, queryOne, insert } from "./db/mysql"

export interface PaystubFile {
  id: number
  user_id: number
  transaction_id: number | null
  order_id: number | null
  filename: string
  html_content: string
  employee_name: string | null
  pay_date: string | null
  gross_pay: number | null
  net_pay: number | null
  created_at: string
  updated_at: string
}

// Save paystub file to database
export async function savePaystubFile(
  userId: number,
  htmlContent: string,
  filename: string,
  transactionId?: number,
  orderId?: number,
  employeeName?: string,
  payDate?: string,
  grossPay?: number,
  netPay?: number
) {
  try {
    const id = await insert(
      `INSERT INTO paystub_files 
       (user_id, transaction_id, order_id, filename, html_content, employee_name, pay_date, gross_pay, net_pay, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [userId, transactionId || null, orderId || null, filename, htmlContent, employeeName || null, payDate || null, grossPay || null, netPay || null]
    )
    return { success: true, fileId: id }
  } catch (error) {
    console.error("Save paystub file error:", error)
    return { error: "Failed to save paystub file" }
  }
}

// Get user's paystub files
export async function getUserPaystubFiles(userId: number, limit: number = 20, offset: number = 0) {
  try {
    const files = await query(
      `SELECT id, filename, employee_name, pay_date, gross_pay, net_pay, created_at 
       FROM paystub_files 
       WHERE user_id = ? 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    ) as any[]

    const countResult = await query("SELECT COUNT(*) as total FROM paystub_files WHERE user_id = ?", [userId]) as any[]
    const total = countResult[0]?.total || 0

    return {
      files: files || [],
      total,
      limit,
      offset,
      pages: Math.ceil(total / limit)
    }
  } catch (error) {
    console.error("Get user paystub files error:", error)
    return { files: [], total: 0, limit, offset, pages: 0 }
  }
}

// Get single paystub file
export async function getPaystubFile(fileId: number, userId: number) {
  try {
    const file = await queryOne(
      "SELECT * FROM paystub_files WHERE id = ? AND user_id = ?",
      [fileId, userId]
    ) as PaystubFile

    return file
  } catch (error) {
    console.error("Get paystub file error:", error)
    return null
  }
}

// Get all paystub files (admin)
export async function getAllPaystubFiles(page: number = 1, limit: number = 20) {
  try {
    const offset = (page - 1) * limit

    const files = await query(
      `SELECT pf.*, u.email FROM paystub_files pf 
       JOIN users u ON pf.user_id = u.id 
       ORDER BY pf.created_at DESC 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    ) as any[]

    const countResult = await query("SELECT COUNT(*) as total FROM paystub_files") as any[]
    const total = countResult[0]?.total || 0

    return {
      files: files || [],
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  } catch (error) {
    console.error("Get all paystub files error:", error)
    return { files: [], total: 0, page, limit, pages: 0 }
  }
}

// Delete paystub file
export async function deletePaystubFile(fileId: number, userId: number) {
  try {
    await query("DELETE FROM paystub_files WHERE id = ? AND user_id = ?", [fileId, userId])
    return { success: true }
  } catch (error) {
    console.error("Delete paystub file error:", error)
    return { error: "Failed to delete paystub file" }
  }
}
