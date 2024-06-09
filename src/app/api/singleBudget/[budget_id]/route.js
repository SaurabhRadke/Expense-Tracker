import { connectDb } from "@/app/ConnectDb/ConnectMongo"
import { BudgetModel } from "@/app/dbSchema/BudgetSchema"
import { NextResponse } from "next/server"


connectDb()
export async function DELETE(request,{params}){
    try {
        const {budget_id}=params
        const Delting_budget=await BudgetModel.deleteOne({_id:budget_id})
        // console.log(Delting_budget)
        if(Delting_budget.acknowledged){
            const allBudgets=await BudgetModel.find()
            console.log(true)
            return NextResponse.json(allBudgets,{status:201,statusText:"Budget Deleted Successfully"})
        }
        return NextResponse.json("Cannot delete Budget",{status:201,statusText:"Budget Deleted Successfully"})

    } catch (error) {
        console.log(error)
        return NextResponse.json("Budget deleting Error",{status:201,statusText:"Cannot delete Budget"})

    }
    
}


export async function PUT(request,{params}){
    try {
        const {budget_id}=params
        const editingData=await request.json()
        const Delting_budget=await BudgetModel.findOne({_id:budget_id})
        // console.log(Delting_budget)
        Delting_budget.BudgetName=editingData.BudgetName
        Delting_budget.Amount=editingData.BudgetAmount
        Delting_budget.Icon=editingData.icon
        const saveChanges=await Delting_budget.save()
        const AllBudget=await BudgetModel.find()
        console.log(AllBudget)
        return NextResponse.json(AllBudget,{status:201,statusText:"Budget Deleted Successfully"})

    } catch (error) {
        console.log(error)
        return NextResponse.json("Budget deleting Error",{status:201,statusText:"Cannot delete Budget"})

    }
    
}