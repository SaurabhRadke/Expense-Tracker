"use client"
import Image from "next/image";
import budgetImg from "@/app/assets/budgett.jpg"
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useContext } from "react";
import { useToast } from "@/components/ui/use-toast"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useRef, useState } from "react";
import { UserDetailsContext } from "@/app/store/userDetailsStore";
import EachBudgets from "./Components/EachBudget";
import Loadder from "./Components/Loader";
import Link from "next/link";
import { Bug } from "lucide-react";
import { ExpenseModel } from "@/app/dbSchema/ExpenseSchema";
import { ExpenseDetailsContext } from "@/app/store/ExpenseTrackerContext";
  
export default function Budgets(){
    const [selectEmoji,setSelectEmoji]=useState(false)
    const [selctedEmoji,setSelctedEmoji]=useState(`😊`)
    const { toast } = useToast()
    const ExpenseContext=useContext(ExpenseDetailsContext)
    const budgetName=useRef()
    const budgetAmount=useRef()
    const HandelBudgetAdd=async()=>{
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1; // Months are zero-indexed
        const year = now.getFullYear();
        const userEmail=localStorage.getItem('user_email')
        const formattedDate = `${month}/${day}/${year}`;
        const newBudget={
            BudgetName:budgetName.current.value,
            BudgetAmount:budgetAmount.current.value,
            created:formattedDate,
            icon:selctedEmoji,
        }
        const response=await fetch(`/api/getBudgets/demo1@gmail.com`,
            {
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(newBudget)
            }
        )
        if(response.status===201){
            const data=await response.json()
            const Allbudgets=ExpenseContext.BudgetList
            ExpenseContext.ChangedBudgetList([...Allbudgets,data])
            toast({
                title:"Budget Added Successfully",
                description: formattedDate,
              })
        }
    }
    return(
        <>
        {false?<div className=" w-full h-full flex items-center justify-center"><Loadder/></div>:
        <div className=" relative w-full h-full p-4 flex flex-col  gap-4 overflow-hidden">
        <h1 className=" text-2xl font-semibold tracking-wider text-zinc-100 mb-4">My Budgets</h1>
        <div className=" flex flex-wrap gap-6">
            
        <AlertDialog>
            <AlertDialogTrigger><div className=" relative w-[20rem] h-[12rem] rounded-lg overflow-hidden bg-[#8D9FC3] shadow-lg shadow-zinc-500 cursor-pointer hover:scale-105 duration-300">
                <div className=" w-full h-[70%]"><Image src={budgetImg} className=" object-cover h-full " alt="budget" priority/></div>
                    <div className=" absolute bottom-2 w-full flex justify-center gap-3 text-[1.2vw] items-center tracking-widest font-semibold "><div className=" border-2 border-zinc-200 rounded-full"><BsFillBookmarkPlusFill className=" text-xl m-2"/></div>Create New Budget</div>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Add a New Budget</AlertDialogTitle>
                    <button className=" px-3 py-1 w-[5vw] text-2xl " onClick={(e)=>setSelectEmoji(!selectEmoji)}>{selctedEmoji}</button>
                    <AlertDialogDescription>
                        { selectEmoji &&<div className=" absolute"><Picker data={data} onEmojiSelect={(e)=>{setSelectEmoji(false);setSelctedEmoji(e.native)}} /></div>}
                    </AlertDialogDescription>
                    <div className=" w-full my-2 px-4 flex flex-col gap-6  justify-center  ">
                        <div className=" w-full flex flex-col gap-2">
                            <h1>Budget Name</h1>
                            <input type="text" ref={budgetName} placeholder="Budget Name" className=" tracking-wider border-[1px] rounded-sm border-black px-4 py-1"/>
                        </div> 
                        <div className=" w-full flex flex-col gap-2">
                            <h1>Budget Amount</h1>
                            <input type="text" ref={budgetAmount} placeholder="$5000" className=" tracking-wider border-[1px] rounded-sm border-black px-4 py-1"/>
                        </div> 
                    </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={(e)=>{HandelBudgetAdd()}}>Add</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        {ExpenseContext.BudgetList.slice().reverse().map((each, ind) => {
            let spend = 0;
    
            each.Expenses.forEach(expense => {
                spend += Number(expense.ExpenseAmount);});
                let amount = Number(each.Amount);
                let limitReached = (spend / amount) * 100;


            return (
                <Link key={ind} href={`/Dashboard/expenses/${each._id}`} onClick={()=>ExpenseContext.setCurrentWindow("Add Expenses")}>
                    <EachBudgets 
                        Name={each.BudgetName} 
                        Amount={amount} 
                        expense={each.Expenses.length} 
                        spend={spend} 
                        rem={amount - spend} 
                        icon={each.Icon} 
                        limitReached={limitReached} 
                    />
                </Link>
            );
        })}

            
        </div>
    </div>
        }
    </>
    )
}