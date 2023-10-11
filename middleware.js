import { NextResponse } from 'next/server'

export function middleware(request) {
  const userToken = request.cookies.get('token')?.value;

  if(!userToken) {
     return NextResponse.redirect(new URL('/login',request.url))
  }

  else {
    const response = NextResponse.next()
    return response
  }
}

export const config = {
  matcher: '/messages',
}