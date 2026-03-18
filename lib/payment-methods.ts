"use server"

import { query, queryOne } from "./db/mysql"

export interface PaymentMethod {
  id: number
  name: string
  slug: string
  enabled: boolean
  config: Record<string, string>
  created_at: string
  updated_at: string
}

// Get all payment methods
export async function getPaymentMethods() {
  try {
    const methods = await query("SELECT * FROM payment_methods WHERE enabled = true") as PaymentMethod[]
    return methods || []
  } catch (error) {
    console.error("Get payment methods error:", error)
    return []
  }
}

// Get single payment method
export async function getPaymentMethod(slug: string) {
  try {
    const method = await queryOne("SELECT * FROM payment_methods WHERE slug = ?", [slug]) as PaymentMethod
    return method
  } catch (error) {
    console.error("Get payment method error:", error)
    return null
  }
}

// Update payment method (admin only)
export async function updatePaymentMethod(id: number, enabled: boolean, config: Record<string, string>) {
  try {
    await query(
      "UPDATE payment_methods SET enabled = ?, config = ?, updated_at = NOW() WHERE id = ?",
      [enabled, JSON.stringify(config), id]
    )
    return { success: true }
  } catch (error) {
    console.error("Update payment method error:", error)
    return { error: "Failed to update payment method" }
  }
}

// Get payment method config
export async function getPaymentMethodConfig(slug: string) {
  try {
    const method = await getPaymentMethod(slug)
    if (!method) return null
    return typeof method.config === 'string' ? JSON.parse(method.config) : method.config
  } catch (error) {
    console.error("Get payment method config error:", error)
    return null
  }
}
