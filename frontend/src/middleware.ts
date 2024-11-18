import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {

  const token: string | null = req.cookies.get('token')?.value ?? null;
  // console.log(token)
  // console.log("dddddddddddddddddddddddddddddsdsfdfhdsfhjdsjhjhhhjdhdihaskdhaskdhkasj")

  //protected paths
  const protectedPaths = ['/home', '/'];
  const requestedPath = req.nextUrl.pathname;


  if (protectedPaths.includes(requestedPath) && !token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/'], 
};
