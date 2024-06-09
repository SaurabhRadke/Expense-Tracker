"use client"
import { MdDeleteForever } from "react-icons/md";
import { MdMovieEdit } from "react-icons/md";

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
import EditBudgets from "./EditBudget";
export default function BudgetUpdate({DeleteBudgetfromID,budgetIID,previousBudget}){
    return(
        <>
            <div className=" w-full px-4 text-white  text-2xl font-semibold tracking-widest flex justify-between items-center">
                <h1>Add Expense</h1>
                <div className=" flex gap-3">
                    <EditBudgets budgetIID={budgetIID} previousBudget={previousBudget}/>


                            <AlertDialog>
                    <AlertDialogTrigger>
                        <button className="px-3 hover:bg-rose-500 duration-300  rounded-md bg-rose-600 text-white text-sm tracking-wide font-medium py-2 flex gap-2 items-center" >
                            <MdDeleteForever className=" text-xl"/>Delete Budget</button>
                    </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undo. This will permanently delete your <span className=" font-semibold tracking-wider text-black">Budget</span> and  <span className=" font-semibold tracking-wider text-black">Expenses</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={()=>DeleteBudgetfromID()}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
                </div>
                

                
            </div>

        </>
    )
}