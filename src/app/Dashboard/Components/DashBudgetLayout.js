"use client"

import Image from "next/image"

import BudgetIcon from  "@/app/assets/moneyIcon.png"
import Link from "next/link"
import { UserDetailsContext } from "@/app/store/userDetailsStore"
import { useContext } from "react"
import { ExpenseDetailsContext } from "@/app/store/ExpenseTrackerContext"
export default function DashBudgetlayout({EachBudgetData}){
    const ExpenseContext=useContext(ExpenseDetailsContext)
    return(
        <Link href={`/Dashboard/expenses/${EachBudgetData._id}`} className=" w-[95%]" onClick={()=>ExpenseContext.setCurrentWindow("Budgets")}>
            <div className="gap-5 bg-[#d8b9f8] shadow-md shadow-zinc-800 cursor-pointer hover:duration-300  rounded-lg flex flex-col justify-between p-2 pb-3">
            <div className=" w-full h-[3.4rem] flex justify-between items-center  ">
                <div className="  flex items-center gap-3 ">
                    <div className=" w-[3rem] h-[3rem] rounded-full overflow-hidden bg-slate-800 flex gap-4">
                        <Image src={BudgetIcon} alt="Money" priority />
                    </div>
                    <div className=" flex flex-col ">
                        <h1 className="  font-semibold text-[1rem] tracking-widest text-zinc-800">{EachBudgetData.BudgetName}</h1>
                        <h1 className=" text-sm">{`${EachBudgetData.Expenses.length} Expenses`}</h1>
                    </div>
                </div>
                <h1 className=" text-xl text-orange-600 font-medium tracking-widest">{`$ ${EachBudgetData.Amount}`}</h1>
            </div>
            <div className=" flex gap-3 items-center w-full ">
                <div className=" w-[19%] h-[45px]  rounded-full text-2xl px-2">{EachBudgetData.Icon}</div>
                <div className="w-full h-full flex flex-col gap-1">
                    <div className=" w-full flex justify-between text-sm ">
                        <h1>{`$ ${EachBudgetData.TotalSpend}`} Spend</h1>
                        <h1>{`$ ${Number(EachBudgetData.Amount)-EachBudgetData.TotalSpend}`} Remaining</h1>
                    </div>
                    <div className=" w-full h-2 bg-white rounded-full overflow-hidden">
                        <div style={{ width: `${(EachBudgetData.TotalSpend/Number(EachBudgetData.Amount))*100}%` }} className={` h-full bg-green-500`}></div>
                    </div>
                </div>
            </div>
        </div>
        </Link>
        
    )
}