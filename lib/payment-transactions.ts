"use server"

import { query, queryOne, insert } from "./db/mysql"

export interface PaymentTransaction {
  id: number
  user_id: number
  order_id: number
  payment_method: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed" | "refunded"
  transaction_id: string
  metadata: Record<string, any>
  created_at: string
  updated_at: string
}

// Create payment transaction
export async function createPaymentTransaction(
  userId: number,
  orderId: number,
  paymentMethod: string,
  amount: number,
  currency: string = "USD"
) {
  try {
    const id = await insert(
      `INSERT INTO payment_transactions 
       (user_id, order_id, payment_method, amount, currency, status, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, 'pending', NOW(), NOW())`,
      [userId, orderId, paymentMethod, amount, currency]
    )
    return { success: true, transactionId: id }
  } catch (error) {
    console.error("Create payment transaction error:", error)
    return { error: "Failed to create transaction" }
  }
}

// Update transaction status
export async function updateTransactionStatus(
  transactionId: number,
  status: "completed" | "failed" | "refunded",
  externalTransactionId?: string
) {
  try {
    await query(
      "UPDATE payment_transactions SET status = ?, transaction_id = ?, updated_at = NOW() WHERE id = ?",
      [status, externalTransactionId || null, transactionId]
    )
    return { success: true }
  } catch (error) {
    console.error("Update transaction status error:", error)
    return { error: "Failed to update transaction" }
  }
}

// Get transaction
export async function getTransaction(transactionId: number) {
  try {
    const transaction = await queryOne(
      "SELECT * FROM payment_transactions WHERE id = ?",
      [transactionId]
    ) as PaymentTransaction
    return transaction
  } catch (error) {
    console.error("Get transaction error:", error)
    return null
  }
}

// Get user transactions
export async function getUserTransactions(userId: number, limit: number = 20) {
  try {
    const transactions = await query(
      "SELECT * FROM payment_transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT ?",
      [userId, limit]
    ) as PaymentTransaction[]
    return transactions || []
  } catch (error) {
    console.error("Get user transactions error:", error)
    return []
  }
}

// Get all transactions (admin)
export async function getAllTransactions(page: number = 1, limit: number = 20) {
  try {
    const offset = (page - 1) * limit
    const transactions = await query(
      `SELECT pt.*, u.email FROM payment_transactions pt 
       JOIN users u ON pt.user_id = u.id 
       ORDER BY pt.created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    ) as any[]

    const countResult = await query("SELECT COUNT(*) as total FROM payment_transactions") as any[]
    const total = countResult[0]?.total || 0

    return {
      transactions: transactions || [],
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  } catch (error) {
    console.error("Get all transactions error:", error)
    return { transactions: [], total: 0, page, limit, pages: 0 }
  }
}
