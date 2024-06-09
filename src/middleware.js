"use server";
import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

export default async function Middleware(request) {
  const token = request.cookies.get('Token');
  const JwtSecraet=process.env.JWT_SECRET_KEY
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const encoder = new TextEncoder();
    const secretKeyUint8Array = encoder.encode(JwtSecraet);
    const { payload } = await jwtVerify(token.value, secretKeyUint8Array);
    request.user = payload; // Attach user data to the request
    return NextResponse.next();
  } catch (err) {
    console.error('JWT validation error:', err);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/Dashboard/:path*'], // Apply middleware to the /dashboard route
};
