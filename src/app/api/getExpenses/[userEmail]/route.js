import { connectDb } from "@/app/ConnectDb/ConnectMongo"
import { ExpenseModel } from "@/app/dbSchema/ExpenseSchema"
import { NextResponse } from "next/server"


connectDb()

export async function GET(request,{params}){
    try {
        const user_email=params.userEmail
        const Allexpense=await ExpenseModel.find({CreatedBy:"demo1@gmail.com"})

        return NextResponse.json(Allexpense,{status:201,statusText:"Expense Get Succesfully"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Error getting Expenses"},{status:401,statusText:"Expense Get failed"})

    }
    
}