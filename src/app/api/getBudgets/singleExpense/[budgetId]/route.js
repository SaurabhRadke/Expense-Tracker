import { connectDb } from "@/app/ConnectDb/ConnectMongo"
import { BudgetModel } from "@/app/dbSchema/BudgetSchema"
import { ExpenseModel } from "@/app/dbSchema/ExpenseSchema"
import { NextResponse } from "next/server"


connectDb()
export async function GET(request,{params}){
    try {
        const {budgetId}=params
        const budget=await BudgetModel.findOne({_id:budgetId})
        return NextResponse.json(budget,{status:201,statusText:"Budget Got  sussefully"})
    } catch (error) {
        console.log(error)
        return NextResponse.json(budget,{status:401,statusText:"Error getting Budget"})
    }
}

export async function POST(request,{params}){
    try {
        const {budgetId}=params
        const data=await request.json()
        const budget=await BudgetModel.findOne({_id:budgetId})
        const Expe_Model=new ExpenseModel(data)
        await Expe_Model.save()
        budget.Expenses.push(Expe_Model)
        budget.TotalItem+=1
        budget.TotalSpend+=Number(data.ExpenseAmount)
        const UpdatedBudget=await budget.save()
        const AllBudgetChange=await BudgetModel.find()
        return NextResponse.json({NewCurrBudget:UpdatedBudget,AllBudgets:AllBudgetChange},{status:201,statusText:"Expense Added successfully"})
    } catch (error) {
        console.log(error)
        return NextResponse.json(budget,{status:401,statusText:"Error Adding Expenses"})
    }
}

export async function DELETE(request,{params}){
    try {
        const {budgetId}=params
        const DeleteExpense=await request.json()
        const budget=await BudgetModel.findOne({_id:budgetId})
        var deltedAmount
        const deltedData=budget.Expenses.filter((expense)=>{
            if(expense._id.toString() !== DeleteExpense.ExpenseId.toString()){
                return true
            }
            else{
                deltedAmount=Number(expense.ExpenseAmount)
                return false
            }
        })
        budget.Expenses=deltedData
        budget.TotalSpend-=deltedAmount
        budget.TotalItem-=1
        const Dele=await ExpenseModel.deleteOne({_id:DeleteExpense.ExpenseId})
        const dataUpdated=await budget.save()
        const allbudgets=await BudgetModel.find()
        // console.log(budget)
        return NextResponse.json(allbudgets,{status:201,statusText:"Expense Deleted  successfully"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Some error occured"},{status:401,statusText:"Error in deleting Expenses"})
    }
}