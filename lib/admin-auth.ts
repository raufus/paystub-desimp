import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { query, queryOne, insert } from './db/mysql'

const JWT_SECRET = process.env.JWT_SECRET || 'admin-secret-key-change-in-production'

export interface AdminUser {
  id: number
  email: string
  full_name: string | null
  role: 'super_admin' | 'admin' | 'moderator'
  status: 'active' | 'inactive' | 'suspended'
  created_at: Date
}

export interface AdminSession {
  id: number
  admin_id: number
  token: string
  expires_at: Date
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Generate JWT token for admin
export function generateAdminToken(adminId: number): string {
  return jwt.sign({ adminId, type: 'admin' }, JWT_SECRET, { expiresIn: '24h' })
}

// Verify JWT token
export function verifyAdminToken(token: string): { adminId: number; type: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { adminId: number; type: string }
  } catch {
    return null
  }
}

// Admin login
export async function adminLogin(email: string, password: string): Promise<{ admin: AdminUser; token: string } | null> {
  try {
    // Find admin by email
    const admin = await queryOne(
      'SELECT id, email, password, full_name, role, status FROM admin_users WHERE email = ?',
      [email]
    )

    if (!admin) {
      console.log('Admin not found:', email)
      return null
    }

    // Check if admin is active
    if (admin.status !== 'active') {
      console.log('Admin account not active:', email)
      return null
    }

    // Verify password
    const isValid = await verifyPassword(password, admin.password)
    if (!isValid) {
      console.log('Invalid password for admin:', email)
      return null
    }

    // Generate token
    const token = generateAdminToken(admin.id)

    // Update last login
    await query('UPDATE admin_users SET last_login = NOW() WHERE id = ?', [admin.id])

    // Create session
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 1) // 24 hours

    await insert(
      'INSERT INTO admin_sessions (admin_id, token, expires_at) VALUES (?, ?, ?)',
      [admin.id, token, expiresAt]
    )

    return {
      admin: {
        id: admin.id,
        email: admin.email,
        full_name: admin.full_name,
        role: admin.role,
        status: admin.status,
        created_at: admin.created_at
      },
      token
    }
  } catch (error) {
    console.error('Admin login error:', error)
    return null
  }
}

// Get admin from token
export async function getAdminFromToken(token: string): Promise<AdminUser | null> {
  try {
    const payload = verifyAdminToken(token)

    if (!payload || payload.type !== 'admin') {
      return null
    }

    // Check if session exists and is valid
    const session = await queryOne(
      'SELECT * FROM admin_sessions WHERE token = ? AND expires_at > NOW()',
      [token]
    )

    if (!session) {
      return null
    }

    // Get admin details
    const admin = await queryOne(
      'SELECT id, email, full_name, role, status, created_at FROM admin_users WHERE id = ?',
      [payload.adminId]
    )

    if (!admin || admin.status !== 'active') {
      return null
    }

    return admin as AdminUser
  } catch (error) {
    console.error('Get admin from token error:', error)
    return null
  }
}

// Admin logout
export async function adminLogout(token: string): Promise<void> {
  try {
    await query('DELETE FROM admin_sessions WHERE token = ?', [token])
  } catch (error) {
    console.error('Admin logout error:', error)
  }
}

// Create new admin user (super admin only)
export async function createAdminUser(
  email: string,
  password: string,
  fullName: string,
  role: 'admin' | 'moderator' = 'admin'
): Promise<AdminUser | null> {
  try {
    // Check if email already exists
    const existing = await queryOne('SELECT id FROM admin_users WHERE email = ?', [email])
    if (existing) {
      return null
    }

    const hashedPassword = await hashPassword(password)

    const adminId = await insert(
      'INSERT INTO admin_users (email, password, full_name, role) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, fullName, role]
    )

    const admin = await queryOne(
      'SELECT id, email, full_name, role, status, created_at FROM admin_users WHERE id = ?',
      [adminId]
    )

    return admin as AdminUser
  } catch (error) {
    console.error('Create admin user error:', error)
    return null
  }
}

// Check admin permissions
export function hasPermission(role: string, permission: string): boolean {
  const permissions: Record<string, string[]> = {
    super_admin: ['*'],
    admin: [
      'view_users',
      'edit_users',
      'delete_users',
      'view_paystubs',
      'delete_paystubs',
      'view_orders',
      'manage_orders',
      'view_reports',
      'view_logs',
      'manage_support'
    ],
    moderator: [
      'view_users',
      'view_paystubs',
      'view_orders',
      'view_reports',
      'manage_support'
    ]
  }

  const adminPermissions = permissions[role] || []
  return adminPermissions.includes('*') || adminPermissions.includes(permission)
}

// Log admin action
export async function logAdminAction(
  adminId: number,
  action: string,
  tableName: string,
  recordId: number,
  oldValues?: any,
  newValues?: any
): Promise<void> {
  try {
    await insert(
      'INSERT INTO admin_audit_log (admin_id, action, table_name, record_id, old_values, new_values) VALUES (?, ?, ?, ?, ?, ?)',
      [
        adminId,
        action,
        tableName,
        recordId,
        oldValues ? JSON.stringify(oldValues) : null,
        newValues ? JSON.stringify(newValues) : null
      ]
    )
  } catch (error) {
    console.error('Log admin action error:', error)
  }
}

// Log user activity
export async function logUserActivity(
  userId: number,
  action: string,
  actionType: string = 'read',
  details?: any
): Promise<void> {
  try {
    await insert(
      'INSERT INTO activity_logs (user_id, action, action_type, details) VALUES (?, ?, ?, ?)',
      [userId, action, actionType, details ? JSON.stringify(details) : null]
    )
  } catch (error) {
    console.error('Log user activity error:', error)
  }
}
