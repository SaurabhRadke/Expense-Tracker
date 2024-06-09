"use client"
import { useSession } from "next-auth/react"
export default function ChectNextauth(){
    const { data, status } = useSession();
    return {data,session}
}