"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createUser, authenticateUser, getUserFromToken, logout } from './auth'
import { query, queryOne, insert } from './db/mysql'

// Get current user from cookie
async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value
  
  if (!token) {
    return null
  }
  
  return getUserFromToken(token)
}

// Sign In
export async function signIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  console.log("Attempting login for:", email)
  
  try {
    const result = await authenticateUser(email.toString(), password.toString())
    
    if (!result) {
      console.log("Authentication failed for:", email)
      return { error: "Invalid email or password" }
    }
    
    console.log("Authentication successful for:", email)
    console.log("Token to be set:", result.token.substring(0, 20) + "...")
    
    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set('auth_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })
    
    console.log("Cookie set successfully")
    
    // Return success and let client handle redirect
    return { success: true, redirectTo: '/dashboard' }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An error occurred during login. Please try again." }
  }
}

// Sign Up
export async function signUp(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")
  const fullName = formData.get("fullName")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  // Check if user already exists
  const existing = await queryOne('SELECT id FROM users WHERE email = ?', [email.toString()])
  
  if (existing) {
    return { error: "Email already registered" }
  }
  
  // Create user
  const user = await createUser(
    email.toString(),
    password.toString(),
    fullName?.toString() || email.toString().split("@")[0]
  )
  
  // Authenticate to get token
  const result = await authenticateUser(email.toString(), password.toString())
  
  if (!result) {
    return { error: "Account created but login failed. Please try logging in." }
  }
  
  // Set cookie for auto-login
  const cookieStore = await cookies()
  cookieStore.set('auth_token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  })
  
  // Return success and let client handle redirect
  return { success: true, redirectTo: '/dashboard' }
}

// Sign Out
export async function signOut() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value
  
  if (token) {
    await logout(token)
  }
  
  cookieStore.delete('auth_token')
  redirect("/login")
}

// Save Paystub
export async function savePaystub(paystubData: any) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { error: "User not authenticated" }
    }

    const id = await insert(
      `INSERT INTO paystubs (
        user_id, employee_name, employee_address, employee_ssn,
        employer_name, employer_address, employer_ein,
        pay_period_start, pay_period_end, pay_date, pay_frequency,
        hourly_rate, hours_worked, overtime_hours, overtime_rate,
        salary, bonus, commission, gross_pay,
        federal_tax, state_tax, social_security, medicare,
        health_insurance, dental_insurance, retirement_401k, other_deductions,
        total_deductions, net_pay
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.id,
        paystubData.employee_name,
        paystubData.employee_address,
        paystubData.employee_ssn,
        paystubData.employer_name,
        paystubData.employer_address,
        paystubData.employer_ein,
        paystubData.pay_period_start,
        paystubData.pay_period_end,
        paystubData.pay_date,
        paystubData.pay_frequency,
        paystubData.hourly_rate,
        paystubData.hours_worked,
        paystubData.overtime_hours,
        paystubData.overtime_rate,
        paystubData.salary,
        paystubData.bonus,
        paystubData.commission,
        paystubData.gross_pay,
        paystubData.federal_tax,
        paystubData.state_tax,
        paystubData.social_security,
        paystubData.medicare,
        paystubData.health_insurance,
        paystubData.dental_insurance,
        paystubData.retirement_401k,
        paystubData.other_deductions,
        paystubData.total_deductions,
        paystubData.net_pay
      ]
    )

    return { success: true, data: { id } }
  } catch (error) {
    console.error("Save paystub error:", error)
    return { error: "Failed to save paystub" }
  }
}

// Get User Paystubs
export async function getUserPaystubs() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { error: "User not authenticated" }
    }

    const data = await query(
      'SELECT * FROM paystubs WHERE user_id = ? ORDER BY created_at DESC',
      [user.id]
    )

    return { success: true, data }
  } catch (error) {
    console.error("Get paystubs error:", error)
    return { error: "Failed to fetch paystubs" }
  }
}

// Create Order
export async function createOrder(orderData: {
  packageType: string
  amount: number
  paystubId?: string
  paymentMethod: string
}) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { error: "User not authenticated" }
    }

    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const id = await insert(
      `INSERT INTO orders (user_id, paystub_id, package_type, amount, status, payment_method, transaction_id)
       VALUES (?, ?, ?, ?, 'completed', ?, ?)`,
      [user.id, orderData.paystubId || null, orderData.packageType, orderData.amount, orderData.paymentMethod, transactionId]
    )

    return { success: true, data: { id, transaction_id: transactionId } }
  } catch (error) {
    console.error("Create order error:", error)
    return { error: "Failed to create order" }
  }
}

// Get User Orders
export async function getUserOrders() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { error: "User not authenticated" }
    }

    const data = await query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [user.id]
    )

    return { success: true, data }
  } catch (error) {
    console.error("Get orders error:", error)
    return { error: "Failed to fetch orders" }
  }
}

// Save Tax Return
export async function saveTaxReturn(taxReturnData: {
  tax_year: number
  filing_status: string
  total_income: number
  taxable_income: number
  tax_owed: number
  refund_amount: number
  form_data: any
}) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { error: "User not authenticated" }
    }

    const id = await insert(
      `INSERT INTO tax_returns (user_id, tax_year, filing_status, total_income, taxable_income, tax_owed, refund_amount, form_data)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.id,
        taxReturnData.tax_year,
        taxReturnData.filing_status,
        taxReturnData.total_income,
        taxReturnData.taxable_income,
        taxReturnData.tax_owed,
        taxReturnData.refund_amount,
        JSON.stringify(taxReturnData.form_data)
      ]
    )

    return { success: true, data: { id } }
  } catch (error) {
    console.error("Save tax return error:", error)
    return { error: "Failed to save tax return" }
  }
}

// Get User Tax Returns
export async function getUserTaxReturns() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { error: "User not authenticated" }
    }

    const data = await query(
      'SELECT * FROM tax_returns WHERE user_id = ? ORDER BY created_at DESC',
      [user.id]
    )

    return { success: true, data }
  } catch (error) {
    console.error("Get tax returns error:", error)
    return { error: "Failed to fetch tax returns" }
  }
}

// Save W2 Form
export async function saveW2Form(w2Data: any) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { error: "User not authenticated" }
    }

    const id = await insert(
      `INSERT INTO w2_forms (
        user_id, tax_year, employer_name, employer_ein, employee_name, employee_ssn,
        wages_and_tips, federal_income_tax, social_security_wages, social_security_tax,
        medicare_wages, medicare_tax, state_wages, state_income_tax, form_data
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.id, w2Data.tax_year, w2Data.employer_name, w2Data.employer_ein,
        w2Data.employee_name, w2Data.employee_ssn, w2Data.wages_and_tips,
        w2Data.federal_income_tax, w2Data.social_security_wages, w2Data.social_security_tax,
        w2Data.medicare_wages, w2Data.medicare_tax, w2Data.state_wages,
        w2Data.state_income_tax, JSON.stringify(w2Data)
      ]
    )

    return { success: true, data: { id } }
  } catch (error) {
    console.error("Save W2 error:", error)
    return { error: "Failed to save W2 form" }
  }
}

// Get User W2 Forms
export async function getUserW2Forms() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { error: "User not authenticated" }
    }

    const data = await query(
      'SELECT * FROM w2_forms WHERE user_id = ? ORDER BY created_at DESC',
      [user.id]
    )

    return { success: true, data }
  } catch (error) {
    console.error("Get W2 forms error:", error)
    return { error: "Failed to fetch W2 forms" }
  }
}

// Save 1099 Form
export async function save1099Form(form1099Data: any) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { error: "User not authenticated" }
    }

    const id = await insert(
      `INSERT INTO form_1099 (
        user_id, tax_year, payer_name, payer_tin, recipient_name, recipient_tin,
        nonemployee_compensation, federal_income_tax, state_income_tax, form_data
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.id, form1099Data.tax_year, form1099Data.payer_name, form1099Data.payer_tin,
        form1099Data.recipient_name, form1099Data.recipient_tin,
        form1099Data.nonemployee_compensation, form1099Data.federal_income_tax,
        form1099Data.state_income_tax, JSON.stringify(form1099Data)
      ]
    )

    return { success: true, data: { id } }
  } catch (error) {
    console.error("Save 1099 error:", error)
    return { error: "Failed to save 1099 form" }
  }
}

// Get User 1099 Forms
export async function getUser1099Forms() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { error: "User not authenticated" }
    }

    const data = await query(
      'SELECT * FROM form_1099 WHERE user_id = ? ORDER BY created_at DESC',
      [user.id]
    )

    return { success: true, data }
  } catch (error) {
    console.error("Get 1099 forms error:", error)
    return { error: "Failed to fetch 1099 forms" }
  }
}

// Delete Paystub
export async function deletePaystub(paystubId: string) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "User not authenticated" }
    }

    await query(
      'DELETE FROM paystubs WHERE id = ? AND user_id = ?',
      [paystubId, user.id]
    )

    return { success: true }
  } catch (error) {
    console.error("Delete paystub error:", error)
    return { error: "Failed to delete paystub" }
  }
}

// Get Order by ID
export async function getOrder(orderId: number) {
  try {
    const order = await queryOne(
      'SELECT * FROM orders WHERE id = ?',
      [orderId]
    )
    return order
  } catch (error) {
    console.error("Get order error:", error)
    return null
  }
}
