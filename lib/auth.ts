import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { query, queryOne, insert } from './db/mysql'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export interface User {
  id: number
  email: string
  full_name: string | null
  created_at: Date
}

export interface Session {
  id: number
  user_id: number
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

// Generate JWT token
export function generateToken(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

// Verify JWT token
export function verifyToken(token: string): { userId: number } | null {
  try {
    console.log("verifyToken: JWT_SECRET length:", JWT_SECRET.length)
    console.log("verifyToken: Token length:", token.length)
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
    console.log("verifyToken: Token decoded successfully, userId:", decoded.userId)
    return decoded
  } catch (error) {
    console.error("verifyToken: Verification failed:", error instanceof Error ? error.message : String(error))
    console.error("verifyToken: Token:", token.substring(0, 50) + "...")
    return null
  }
}

// Create user
export async function createUser(email: string, password: string, fullName?: string): Promise<User> {
  const hashedPassword = await hashPassword(password)
  
  const userId = await insert(
    'INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)',
    [email, hashedPassword, fullName || null]
  )
  
  const user = await queryOne('SELECT id, email, full_name, created_at FROM users WHERE id = ?', [userId])
  return user as User
}

// Find user by email
export async function findUserByEmail(email: string): Promise<(User & { password: string }) | null> {
  const user = await queryOne('SELECT * FROM users WHERE email = ?', [email])
  return user as (User & { password: string }) | null
}

// Find user by ID
export async function findUserById(id: number): Promise<User | null> {
  const user = await queryOne('SELECT id, email, full_name, created_at FROM users WHERE id = ?', [id])
  return user as User | null
}

// Authenticate user
export async function authenticateUser(email: string, password: string): Promise<{ user: User; token: string } | null> {
  try {
    console.log("Auth: Finding user by email:", email)
    const user = await findUserByEmail(email)
    
    if (!user) {
      console.log("Auth: User not found")
      return null
    }
    
    console.log("Auth: User found, verifying password")
    console.log("Auth: Stored hash:", user.password.substring(0, 30) + "...")
    
    const isValid = await verifyPassword(password, user.password)
    console.log("Auth: Password verification result:", isValid)
    
    if (!isValid) {
      console.log("Auth: Password invalid")
      return null
    }
    
    console.log("Auth: Password valid, generating token")
    const token = generateToken(user.id)
    
    // Save session
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days
    
    console.log("Auth: Saving session to database")
    await insert(
      'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
      [user.id, token, expiresAt]
    )
    
    console.log("Auth: Session saved successfully")
    
    return {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        created_at: user.created_at
      },
      token
    }
  } catch (error) {
    console.error("Auth: Error in authenticateUser:", error instanceof Error ? error.message : String(error))
    return null
  }
}

// Get user from token
export async function getUserFromToken(token: string): Promise<User | null> {
  try {
    console.log("getUserFromToken: Verifying token")
    const payload = verifyToken(token)
    
    if (!payload) {
      console.log("getUserFromToken: Token verification failed")
      return null
    }
    
    console.log("getUserFromToken: Token valid, userId:", payload.userId)
    
    // Check if session exists and is valid
    console.log("getUserFromToken: Checking session in database")
    const session = await queryOne(
      'SELECT * FROM sessions WHERE token = ? AND expires_at > NOW()',
      [token]
    )
    
    if (!session) {
      console.log("getUserFromToken: Session not found or expired")
      return null
    }
    
    console.log("getUserFromToken: Session found, fetching user")
    const user = await findUserById(payload.userId)
    console.log("getUserFromToken: User fetched:", user ? user.email : 'null')
    
    return user
  } catch (error) {
    console.error("getUserFromToken: Error:", error)
    return null
  }
}

// Logout (delete session)
export async function logout(token: string): Promise<void> {
  await query('DELETE FROM sessions WHERE token = ?', [token])
}

// Clean expired sessions
export async function cleanExpiredSessions(): Promise<void> {
  await query('DELETE FROM sessions WHERE expires_at < NOW()')
}
