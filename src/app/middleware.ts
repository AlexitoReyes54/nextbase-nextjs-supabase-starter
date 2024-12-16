import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for /migrate
  if (request.nextUrl.pathname === '/migrate') {
    // Redirect to /home
    return NextResponse.redirect(new URL('/home', request.url));
  }
  console.log('middleware');
  // Allow all other requests to proceed
  return NextResponse.redirect(new URL('/home', request.url));
}

// Apply middleware to specific paths
export const config = {
  matcher: '/migrate/:path*',
};
