"use client"

import { useEffect, useRef, useState } from "react"
import BudgetIcon from  "@/app/assets/moneyIcon.png"
import Image from "next/image"
import EachExpenseStructure from "../EachExpenseStructure"
import EachExpenseRecord from "../EachExpenseRecord"
import Loadder from "../../budgets/Components/Loader"
import { useToast } from "@/components/ui/use-toast"
import BudgetUpdate from "../DeleteBudget"
import { useRouter } from "next/navigation"
import { UserDetailsContext } from "@/app/store/userDetailsStore";
import { useContext } from "react";
import { ExpenseDetailsContext } from "@/app/store/ExpenseTrackerContext"
export default function EachExpense({params}){
    const router=useRouter()
    const {budgetid}=params
    const { toast } = useToast()
    const [currBudget,setCurrBudget]=useState({})
    const ExpenseContext=useContext(ExpenseDetailsContext)
    const [gotData,setGotdata]=useState(false)
    const Expense_Name=useRef()
    const Expense_Amount=useRef()
    const [spend,setSpend]=useState(0)
    const [addingExp,SetAddingExp]=useState(false)
    useEffect(()=>{
        async function GetBudgetDetails(){
            const budgetDetails=await fetch(`/api/getBudgets/singleExpense/${budgetid}`)
            const budgetdata=await budgetDetails.json()
            var Eachspend=spend
            budgetdata.Expenses.forEach(expense => {
                Eachspend += Number(expense.ExpenseAmount);});
                console.log(Eachspend)
                setSpend(Eachspend)
            setCurrBudget(budgetdata)
            setGotdata(true)
            
        }
        GetBudgetDetails()
    },[])
    const DeleteExpense=async(exp_id)=>{
        const DELExpense=await fetch(`/api/getBudgets/singleExpense/${budgetid}`,{
            method:"DELETE",
            body:JSON.stringify({ExpenseId:exp_id}),
            headers:{
                'Content-Type': 'application/json',
            }
        })
        if(DELExpense.status===201){
            const Updated=await DELExpense.json()
            Updated.forEach((each)=>{
                if(each._id.toString()===budgetid){
                    setCurrBudget(each) 
                }
            })
            ExpenseContext.ChangedBudgetList(Updated)
              
        }
        toast({
            title: "Expense Deleted Successfully",
        })
    }
    const addExpenses=async()=>{
        SetAddingExp(true)
        const Exp_Amount=Expense_Amount.current.value
        const Exp_Name=Expense_Name.current.value
        const UserEmail=localStorage.getItem('user_email')
        if(Exp_Name===""){
            toast({
                title:"Expense Name is Missing" ,
            })
            SetAddingExp(false)
            return
        }
        else if(Exp_Amount===""){
            toast({
                title:"Expense Amount is Missing" ,
            })
            SetAddingExp(false)
            return 
        }
        const AddExpense=await fetch(`/api/getBudgets/singleExpense/${budgetid}`,{
            method:"POST",
            body:JSON.stringify({ExpenseAmount:Exp_Amount,ExpenseName:Exp_Name,CreatedBy:UserEmail}),
            headers:{
                'Content-Type': 'application/json',
            }
        })
        if(AddExpense.status===201){
            const Updated=await AddExpense.json()
            setCurrBudget(Updated.NewCurrBudget)
            ExpenseContext.ChangedBudgetList(Updated.AllBudgets)
            Expense_Amount.current.value=""
            Expense_Name.current.value=""   
        }
        toast({
            title: "Expenses Added Succesfully",
        })
        SetAddingExp(false)
        
    }
    const DeleteBudgetOnClick=async()=>{
        const response=await fetch(`/api/singleBudget/${budgetid}`,{
            method:"DELETE"
        })
        if(response.status===201){
            const remainingBudgets=await response.json()
            ExpenseContext.ChangedBudgetList(remainingBudgets)
            router.push("/Dashboard/budgets")
            ExpenseContext.setCurrentWindow("Budgets")
            // console.log("Found To delete")
        }
    }
    return(
        <>
        {gotData?<div className=" w-full h-full  border-teal-500 p-4 flex flex-col gap-6 overflow-x-hidden  ">
            <BudgetUpdate DeleteBudgetfromID={DeleteBudgetOnClick} budgetIID={budgetid} previousBudget={currBudget} />
            <div className=" w-full  flex md:flex-nowrap flex-wrap gap-5  ">
            <div className="md:w-[50%] w-full h-[11rem]  rounded-xl bg-[#865ead] shadow-md shadow-zinc-800 cursor-pointer hover: duration-300   flex flex-col justify-between p-[1vw] pb-6">
            <div className=" w-full h-[3.4rem] flex justify-between items-center  ">
                <div className="  flex items-center gap-3 ">
                    <div className=" w-[4rem] h-[4rem] rounded-full overflow-hidden bg-slate-800 flex gap-4">
                        <Image src={BudgetIcon} alt="Money" priority />
                    </div>
                    <div className=" flex flex-col ">
                        <h1 className=" text-white font-semibold text-[1.4rem] tracking-widest">{currBudget.BudgetName}</h1>
                        <h1 className=" text-lg">{`${currBudget.TotalItem} Expenses`}</h1>
                    </div>
                </div>
                <h1 className=" text-2xl text-green-300 font-medium tracking-widest">{`$ ${currBudget.Amount}`}</h1>
            </div>
            <div className=" flex gap-3 items-center  justify-around">
                <div className="  rounded-full text-3xl">{currBudget.Icon}</div>
                <div className="w-full h-full flex flex-col gap-1">
                    <div className=" w-full flex justify-between text-md ">
                        <h1>{`$ ${currBudget.TotalSpend}`} Spend</h1>
                        <h1>{`$${Number(currBudget.Amount)-currBudget.TotalSpend}`} Remaining</h1>
                    </div>
                    <div className=" w-full h-2 bg-white rounded-full overflow-hidden">
                        <div style={{ width: `${(currBudget.TotalSpend/Number(currBudget.Amount))*100}%` }} className=" w-[30%] h-full bg-green-500"></div>
                    </div>
                </div>
            </div>
            </div>
            <div className="w-full  md:w-[50%] relative h-[17rem]  rounded-xl bg-[#43355c] flex flex-col gap-2 items-center py-[2vw] ">
                <h1 className=" text-2xl text-zinc-100 ">Add New Expenses</h1>
                <div className=" w-[80%]  p-2 flex flex-col gap-2">
                    <h1 className=" text-lg text-teal-300 tracking-widest">Expense Name</h1>
                    <input type="text" ref={Expense_Name} className="px-4 py-2 rounded-md w-full bg-[#655188] outline-none border-slate-800 placeholder:text-slate-100 text-slate-100 placeholder:tracking-widest" placeholder="Expense Name"/>
                </div>
                <div className=" w-[80%]  p-2 flex flex-col gap-2">
                    <h1 className=" text-lg text-teal-300 tracking-widest">Expense Amount</h1>
                    <input type="text" ref={Expense_Amount} className="px-4 py-2 rounded-md w-full bg-[#655188] outline-none border-slate-800 placeholder:text-slate-100 text-slate-100 placeholder:tracking-widest" placeholder="Expense Amount"/>
                </div>
                <button className=" flex justify-center items-center absolute right-4 top-4  rounded-md w-[5rem] h-[2.5rem] text-[1rem] tracking-widest bg-green-600 text-white" onClick={()=>addExpenses()}>{addingExp?<div className=" w-4 h-4 border-r-[2px] border-t-[2px] border-white rounded-full animate-spin"></div>:"Add"}</button>
            </div>
            </div>
            
        <div className=" w-full  rounded-xl flex flex-col gap-2 px-4">
            <h1 className=" text-2xl text-white tracking-widest">Recent Expenses</h1>
            <div className=" w-full h-full flex flex-col ">
                <EachExpenseStructure/>
                { currBudget.Expenses.length===0?<div className=" text-white text-xl border-b-[1px] border-l-[1px] border-r-[1px] w-full h-16 flex items-center justify-center">No Expenses in This Budget</div>:<div className=" flex flex-col">{currBudget.Expenses.slice().reverse().map((each,ind)=>{
                    return(<EachExpenseRecord data={each} key={ind} DeleteExpense={DeleteExpense}/>)
                })}</div>}
            </div>
        </div>
            
        </div>:<div className=" w-full h-full flex justify-center items-center"><Loadder/></div>}
        </>
    )
}