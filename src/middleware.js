"use server";

import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';
import { getToken } from 'next-auth/jwt';

export default async function middleware(request) {
  const nextAuthToken = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const jwtToken = request.cookies.get('Token');

  console.log("NextAuth Token", nextAuthToken);
  console.log("JWT Token", jwtToken);

  const jwtSecret = process.env.JWT_SECRET_KEY;

  if (nextAuthToken) {
    // If the NextAuth token is present and valid, allow access
    request.user = nextAuthToken;
    return NextResponse.next();
  } else if (jwtToken) {
    try {
      const encoder = new TextEncoder();
      const secretKeyUint8Array = encoder.encode(jwtSecret);
      const { payload } = await jwtVerify(jwtToken.value, secretKeyUint8Array);
      
      request.user = payload; // Attach user data to the request
      return NextResponse.next();
    } catch (err) {
      console.error('JWT validation error:', err);
    }
  }

  // Redirect if neither token is valid
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/Dashboard/:path*'], // Apply middleware to the /dashboard route
};



























// "use server";
// import { NextResponse } from "next/server";
// import { jwtVerify } from 'jose';
// import { getToken }from 'next-auth/jwt';

// export default async function Middleware(request) {
//   const token = request.cookies.get('Token');
//   const token_next_auth = await getToken({ req:request, secret: process.env.NEXTAUTH_SECRET });
//   console.log("NextAuth Token",token_next_auth)
//   console.log("TOken",token)
//   const JwtSecraet=process.env.JWT_SECRET_KEY
//   if (token===undefined) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }
//   else{
//     try {
//       const encoder = new TextEncoder();
//       const secretKeyUint8Array = encoder.encode(JwtSecraet);
//       const { payload } = await jwtVerify(token.value, secretKeyUint8Array);
//       request.user = payload; // Attach user data to the request
//       return NextResponse.next();
//     } catch (err) {
//       console.error('JWT validation error:', err);
//       return NextResponse.redirect(new URL('/', request.url));
//     }
//   }
  
// }

// export const config = {
//   matcher: ['/Dashboard/:path*'], // Apply middleware to the /dashboard route
// };
