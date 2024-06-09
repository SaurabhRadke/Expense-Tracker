"use client"
import {SessionProvider}  from "next-auth/react"

export const NextAuthWrapper=({children})=>{
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}