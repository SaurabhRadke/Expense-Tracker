"use server"

import { cookies } from "next/headers"

export default async function HandelLogoutFuncnality(){
    try {
        const cokk=cookies()
    cokk.delete('Token')
    return true
    } catch (error) {
        console.log(error)
        return false
    }
    
}