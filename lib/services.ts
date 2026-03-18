"use server"

import { query, queryOne, insert } from "./db/mysql"

export interface Service {
  id: number
  title: string
  slug: string
  description: string
  icon: string
  features: string
  price: number
  status: "active" | "inactive"
  order: number
  created_at: string
  updated_at: string
}

// Get all active services
export async function getActiveServices() {
  try {
    const services = await query(
      "SELECT * FROM services WHERE status = 'active' ORDER BY `order` ASC"
    ) as Service[]
    return services || []
  } catch (error) {
    console.error("Get active services error:", error)
    return []
  }
}

// Get service by slug
export async function getServiceBySlug(slug: string) {
  try {
    const service = await queryOne(
      "SELECT * FROM services WHERE slug = ? AND status = 'active'",
      [slug]
    ) as Service
    return service
  } catch (error) {
    console.error("Get service by slug error:", error)
    return null
  }
}

// Get all services (admin)
export async function getAllServices(page: number = 1, limit: number = 10) {
  try {
    const offset = (page - 1) * limit
    const services = await query(
      "SELECT * FROM services ORDER BY `order` ASC LIMIT ? OFFSET ?",
      [limit, offset]
    ) as Service[]

    const countResult = await query("SELECT COUNT(*) as total FROM services") as any[]
    const total = countResult[0]?.total || 0

    return {
      services: services || [],
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  } catch (error) {
    console.error("Get all services error:", error)
    return { services: [], total: 0, page, limit, pages: 0 }
  }
}

// Create service
export async function createService(data: Omit<Service, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const id = await insert(
      `INSERT INTO services (title, slug, description, icon, features, price, status, \`order\`, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [data.title, data.slug, data.description, data.icon, data.features, data.price, data.status, data.order]
    )
    return { success: true, id }
  } catch (error) {
    console.error("Create service error:", error)
    return { error: "Failed to create service" }
  }
}

// Update service
export async function updateService(id: number, data: Partial<Service>) {
  try {
    const updates: string[] = []
    const values: any[] = []

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'created_at') {
        if (key === 'order') {
          updates.push(`\`order\` = ?`)
        } else {
          updates.push(`${key} = ?`)
        }
        values.push(value)
      }
    })

    values.push(id)
    updates.push("updated_at = NOW()")

    await query(
      `UPDATE services SET ${updates.join(', ')} WHERE id = ?`,
      values
    )
    return { success: true }
  } catch (error) {
    console.error("Update service error:", error)
    return { error: "Failed to update service" }
  }
}

// Delete service
export async function deleteService(id: number) {
  try {
    await query("DELETE FROM services WHERE id = ?", [id])
    return { success: true }
  } catch (error) {
    console.error("Delete service error:", error)
    return { error: "Failed to delete service" }
  }
}

// Reorder services
export async function reorderServices(services: Array<{ id: number; order: number }>) {
  try {
    for (const service of services) {
      await query("UPDATE services SET `order` = ? WHERE id = ?", [service.order, service.id])
    }
    return { success: true }
  } catch (error) {
    console.error("Reorder services error:", error)
    return { error: "Failed to reorder services" }
  }
}
