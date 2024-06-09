import { connectDb } from "@/app/ConnectDb/ConnectMongo";
import { AuthModel } from "@/app/dbSchema/AuthModel";
import { BudgetModel } from "@/app/dbSchema/BudgetSchema";
import { NextResponse } from "next/server";



connectDb()

export async function GET(request,{params}){
   try {
    const {userEmail}=params
    const userDetil=await BudgetModel.find({CreatedBy:userEmail})
    return NextResponse.json(userDetil,{status:201,statusText:"Budgets Got succesfully"})
   } catch (error) {
    console.log(error)
    return NextResponse.json("Problem in Fetching Budgets",{status:400,statusText:"BudgetNot found"})
   }
}
export async function POST(request, { params }) {
   try {
       const { userEmail } = params;
       const dataBudget = await request.json();
         const NewBudget=new BudgetModel({
         CreatedBy:userEmail,
         Amount:dataBudget.BudgetAmount,
         Icon:dataBudget.icon,
         BudgetName:dataBudget.BudgetName
         })
      const savedBudget=await NewBudget.save()
       return NextResponse.json(savedBudget, { status: 201, statusText: "Budget Added Successfully" });
   } catch (error) {
       console.log(error);
       return NextResponse.json("Problem in Adding Budgets", { status: 400, statusText: "Budget Not Added" });
   }
}
