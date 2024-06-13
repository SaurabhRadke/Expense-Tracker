"use server"

import { cookies } from "next/headers"
import { jwtVerify } from 'jose';
export default async function ValidateToken(){
    const cokki=cookies()
    const tokendata=cokki.get('Token')
    const JwtSecraet=process.env.JWT_SECRET_KEY
    if(tokendata){
      try {
        const encoder = new TextEncoder();
        const secretKeyUint8Array = encoder.encode(JwtSecraet);
        const { payload } = await jwtVerify(tokendata.value, secretKeyUint8Array); 
        return true;
      } catch (err) {
        console.log(err)
        return false;
      }
    }
   
}