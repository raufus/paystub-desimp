import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const adminToken = request.cookies.get('admin_token')?.value
  const { pathname } = request.nextUrl
  
  console.log(`Middleware: ${pathname}, Token: ${token ? token.substring(0, 20) + '...' : 'Missing'}, AdminToken: ${adminToken ? adminToken.substring(0, 20) + '...' : 'Missing'}`)
  
  // Admin login page - ALWAYS allow, never redirect
  if (pathname === '/admin-login') {
    console.log(`Middleware: Allowing access to /admin-login (no auth required)`)
    return NextResponse.next()
  }
  
  // Redirect old admin/login to new admin-login (permanent redirect)
  if (pathname === '/admin/login') {
    console.log(`Middleware: Redirecting /admin/login to /admin-login`)
    return NextResponse.redirect(new URL('/admin-login', request.url), { status: 308 })
  }
  
  // Other admin routes - require admin token
  if (pathname.startsWith('/admin')) {
    if (!adminToken) {
      console.log(`Middleware: No admin token, redirecting to /admin-login`)
      return NextResponse.redirect(new URL('/admin-login', request.url))
    }
    console.log(`Middleware: Admin token found, allowing access`)
    return NextResponse.next()
  }
  
  // Public routes
  const publicRoutes = ['/', '/login', '/signup', '/blogs', '/contact']
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith('/api'))
  
  // If no token and trying to access protected route
  if (!token && !isPublicRoute) {
    console.log(`Middleware: No token, redirecting to login`)
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // If has token and trying to access login/signup, redirect to dashboard
  if (token && (pathname === '/login' || pathname === '/signup')) {
    console.log(`Middleware: Has token on login page, redirecting to dashboard`)
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
