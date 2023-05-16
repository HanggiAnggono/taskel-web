import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const cookie = request.cookies
  const token = cookie.get('token')
  console.log(request.nextUrl.pathname)

  if (!token && !request.nextUrl.pathname.startsWith('/auth/login')) {
    console.log({ token })
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/((?!/auth/login|api|_next/static|_next/image|favicon.ico).*)',
  ],
}
