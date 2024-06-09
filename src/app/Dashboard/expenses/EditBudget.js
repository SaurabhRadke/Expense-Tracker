"use client"
import Image from "next/image";
import { MdMovieEdit } from "react-icons/md";

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useContext, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { ExpenseDetailsContext } from "@/app/store/ExpenseTrackerContext";
  
export default function EditBudgets({budgetIID,previousBudget}){
    const [selectEmoji,setSelectEmoji]=useState(false)
    const [selctedEmoji,setSelctedEmoji]=useState(previousBudget.Icon)
    const { toast } = useToast()
    const router=useRouter()
    const ExpenseContext=useContext(ExpenseDetailsContext)

    const [editBudgetName,setEditBudgetName]=useState(previousBudget.BudgetName)
    const [editBudgetAmount,setEditBudgetAmount]=useState(previousBudget.Amount)
    const HandelBudgetEdit=async()=>{
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1; // Months are zero-indexed
        const year = now.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;
        const editedBudget={
            BudgetName:editBudgetName,
            BudgetAmount:editBudgetAmount,
            created:formattedDate,
            icon:selctedEmoji,
        }
        const editBudgetRequest=await fetch(`/api/singleBudget/${budgetIID}`,{
            method:"PUT",
            body:JSON.stringify(editedBudget),
            headers:{
                'Content-Type':"application/json"
            }
        })
        if(editBudgetRequest.status===201){
            const data=await editBudgetRequest.json()
            ExpenseContext.ChangedBudgetList(data)
            router.push("/Dashboard/budgets")
            toast({
                title: "Budget Edited Successfully",
                description: formattedDate,
              })
        }
    }
    return(
        <>
        <div className=" flex flex-wrap gap-6">
            
        <AlertDialog>
            <AlertDialogTrigger>
                <button className="px-3 hover:bg-teal-500 duration-300  rounded-md bg-teal-600 text-white text-sm tracking-wide font-medium py-2 flex gap-2 items-center" >
                        <MdMovieEdit className=" text-xl"/>Edit Budget
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Edit Existing Budget</AlertDialogTitle>
                    <button className=" px-3 py-1 w-[5vw] text-2xl " onClick={(e)=>setSelectEmoji(!selectEmoji)}>{selctedEmoji}</button>
                    <AlertDialogDescription>
                        { selectEmoji &&<div className=" absolute"><Picker data={data} onEmojiSelect={(e)=>{setSelectEmoji(false);setSelctedEmoji(e.native)}} /></div>}
                    </AlertDialogDescription>
                    <div className=" w-full my-2 px-4 flex flex-col gap-6  justify-center  ">
                        <div className=" w-full flex flex-col gap-2">
                            <h1>Budget Name</h1>
                            <input type="text" value={editBudgetName}  placeholder="Budget Name" className=" tracking-wider border-[1px] rounded-sm border-black px-4 py-1" onChange={(e)=>setEditBudgetName(e.target.value)}/>
                        </div> 
                        <div className=" w-full flex flex-col gap-2">
                            <h1>Budget Amount</h1>
                            <input type="text" value={editBudgetAmount} placeholder="$5000" className=" tracking-wider border-[1px] rounded-sm border-black px-4 py-1" onChange={(e)=>setEditBudgetAmount(e.target.value)}/>
                        </div> 
                    </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={(e)=>{HandelBudgetEdit()}}>Edit</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>            
        </div>
    </>
    )
}