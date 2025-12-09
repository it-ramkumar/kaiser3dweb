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
      // Using environment variables for credentials
      if (user === process.env.ADMIN_USER && pwd === process.env.ADMIN_PASS) {
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
 matcher: ['/admin', '/admin/:path*'],
};