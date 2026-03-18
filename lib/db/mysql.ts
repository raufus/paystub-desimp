import mysql from 'mysql2/promise'

// MySQL Connection Configuration
const dbConfig: mysql.PoolOptions = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'paystub_generator',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  connectTimeout: 10000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
}

// Create connection pool
let pool: mysql.Pool | null = null

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(dbConfig)

    // Handle connection errors - reset pool so it reconnects
    pool.on('connection', (connection) => {
      connection.on('error', (err) => {
        console.error('DB connection error:', err.code)
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
          pool = null // Force pool recreation on next query
        }
      })
    })
  }
  return pool
}

// Execute query helper with auto-retry
export async function query(sql: string, params?: any[]): Promise<any> {
  try {
    const [results] = await getPool().execute(sql, params)
    return results
  } catch (error: any) {
    // If connection was lost, reset pool and retry once
    if (
      error.code === 'PROTOCOL_CONNECTION_LOST' ||
      error.code === 'ECONNRESET' ||
      error.code === 'ECONNREFUSED' ||
      error.code === 'ETIMEDOUT'
    ) {
      console.log('DB connection lost, resetting pool and retrying...')
      pool = null // Force new pool
      try {
        const [results] = await getPool().execute(sql, params)
        return results
      } catch (retryError) {
        console.error('Query retry failed:', retryError)
        throw retryError
      }
    }
    console.error('Query Error:', error)
    throw error
  }
}

// Get single row
export async function queryOne(sql: string, params?: any[]) {
  const results = await query(sql, params) as any[]
  return results[0] || null
}

// Insert and get ID
export async function insert(sql: string, params?: any[]) {
  const result = await query(sql, params) as any
  return result.insertId
}

// Test connection
export async function testConnection(): Promise<boolean> {
  try {
    const connection = await getPool().getConnection()
    console.log('✅ MySQL Connected Successfully!')
    connection.release()
    return true
  } catch (error) {
    console.error('❌ MySQL Connection Failed:', error)
    return false
  }
}
