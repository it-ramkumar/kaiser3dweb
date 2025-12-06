import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 1. Check if the user is trying to access the /admin route
  if (req.nextUrl.pathname.startsWith('/admin')) {
    
    // 2. Get the Authorization header
    const basicAuth = req.headers.get('authorization');
    const url = req.nextUrl;

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // 3. CHECK CREDENTIALS HERE
      // Replace 'admin' and 'password123' with your desired login
      // Ideally, put these in your .env file: process.env.ADMIN_USER, process.env.ADMIN_PASS
      if (user === 'admin' && pwd === 'kaiser3d2025') {
        return NextResponse.next();
      }
    }

    // 4. If invalid, prompt the browser login popup
    url.pathname = '/api/auth';
    return new NextResponse('Auth Required.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};