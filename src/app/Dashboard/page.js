"use client"
import { useContext, useEffect, useState } from "react";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { RiDiscountPercentFill } from "react-icons/ri";
import BarChartGraph from "./Components/BarChat";
import { useToast } from "@/components/ui/use-toast"
import DashBudgetlayout from "./Components/DashBudgetLayout";
import EachExpenseStructure from "./expenses/EachExpenseStructure";
import EachExpensesDash from "./Components/EachExpenseLayout";
import { useSession } from "next-auth/react";
import { ExpenseDetailsContext } from "../store/ExpenseTrackerContext";
import { useRouter } from "next/navigation";
import ValidateToken from "@/lib/ValidateToken";


export default function Dashboard(){
    const { toast } = useToast()
    const ExpenseContext=useContext(ExpenseDetailsContext)
    const allBudgets=ExpenseContext.BudgetList
    const emptyList=ExpenseContext.EmptyBudget

    return(
        <div className=" w-full h-full p-2 flex flex-col px-4 py-2 gap-3 overflow-x-hidden">
            <div className=" w-full text-xl text-white tracking-widest  flex flex-col dark:text-black "><h1>Hi, Saurabh Radke <span className=" text-2xl">✌</span></h1><p className=" text-sm text-zinc-200 dark:text-zinc-700">Here is what happening with your Money</p></div>
            {allBudgets.length > 0 ? (
    <div className="w-full grid md:grid-cols-3 grid-col-1 gap-6 px-5 pt-2">
        <div className="w-full col-span-1 h-28 cursor-pointer hover:scale-105 duration-500 rounded-xl bg-[#865ead] flex items-center justify-between px-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-white tracking-widest">Total Budget</h1>
                <p className="text-xl text-zinc-200 tracking-wider">$ {ExpenseContext.TotalBudget}</p>
            </div>
            <div className="w-16 h-16 rounded-full dark:bg-white dark:text-[#261E35] bg-[#261E35] grid place-items-center text-3xl text-white">
                <BsFillPiggyBankFill />
            </div>
        </div>
        <div className="w-full col-span-1 h-28 cursor-pointer hover:scale-105 duration-500 rounded-xl bg-[#865ead] flex items-center justify-between px-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-white tracking-widest">Total Spend</h1>
                <p className="text-xl text-zinc-200 tracking-wider">$ {ExpenseContext.TotalSpend}</p>
            </div>
            <div className="w-16 h-16 rounded-full dark:bg-white dark:text-[#261E35] bg-[#261E35] grid place-items-center text-3xl text-white">
                <CgNotes />
            </div>
        </div>
        <div className="w-full col-span-1 h-28 cursor-pointer hover:scale-105 duration-500 rounded-xl bg-[#865ead] flex items-center justify-between px-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-white tracking-widest">No. of Budget</h1>
                <p className="text-xl text-zinc-200 tracking-wider">{allBudgets.length}</p>
            </div>
            <div className="w-16 h-16 rounded-full dark:bg-white dark:text-[#261E35] bg-[#261E35] grid place-items-center text-3xl text-white">
                <RiDiscountPercentFill />
            </div>
        </div>
    </div>
) : allBudgets.length === 0 && emptyList ? (
    <div className="w-full grid md:grid-cols-3 grid-col-1 gap-6 px-5 pt-2">
        <div className="w-full col-span-1 h-28 rounded-xl bg-[#c491f7]  flex items-center justify-between px-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-white tracking-widest">Total Budget</h1>
                <p className="text-xl text-zinc-200 tracking-wider">$0</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-[#7e61b6] grid place-items-center text-3xl text-white">
                <BsFillPiggyBankFill />
            </div>
        </div>
        <div className="w-full col-span-1 h-28 rounded-xl bg-[#865ead]  flex items-center justify-between px-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-white tracking-widest">Total Spend</h1>
                <p className="text-xl text-zinc-200 tracking-wider">$0</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-[#261E35] grid place-items-center text-3xl text-white">
                <CgNotes />
            </div>
        </div>
        <div className="w-full col-span-1 h-28 rounded-xl bg-[#865ead]  flex items-center justify-between px-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-white tracking-widest">No. of Budgets</h1>
                <p className="text-xl text-zinc-200 tracking-wider">0</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-[#261E35] grid place-items-center text-3xl text-white">
                <RiDiscountPercentFill />
            </div>
        </div>
    </div>
) : (
    <div className="w-full grid md:grid-cols-3 grid-col-1 gap-6 px-5 pt-2">
        <div className="w-full col-span-1 h-28 rounded-xl bg-[#c491f7] animate-pulse flex items-center justify-between px-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-white tracking-widest"></h1>
                <p className="text-xl text-zinc-200 tracking-wider"></p>
            </div>
            <div className="w-16 h-16 rounded-full bg-[#7e61b6] grid place-items-center text-3xl text-white">
                <BsFillPiggyBankFill />
            </div>
        </div>
        <div className="w-full col-span-1 h-28 rounded-xl bg-[#865ead] animate-pulse flex items-center justify-between px-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-white tracking-widest"></h1>
                <p className="text-xl text-zinc-200 tracking-wider"></p>
            </div>
            <div className="w-16 h-16 rounded-full bg-[#261E35] grid place-items-center text-3xl text-white">
                <CgNotes />
            </div>
        </div>
        <div className="w-full col-span-1 h-28 rounded-xl bg-[#865ead] animate-pulse flex items-center justify-between px-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-white tracking-widest"></h1>
                <p className="text-xl text-zinc-200 tracking-wider"></p>
            </div>
            <div className="w-16 h-16 rounded-full bg-[#261E35] grid place-items-center text-3xl text-white">
                <RiDiscountPercentFill />
            </div>
        </div>
    </div>
)}

            <div className=" w-full  grid lg:grid-cols-3 mt-2 gap-3 ">
                <div className=" col-span-2 px-5 flex flex-col gap-5 ">
                    <div className=" rounded-xl dark:border-2 dark:border-[#865ead] bg-slate-100 text-white p-3 overflow-x-scroll flex flex-col gap-2 ">
                        <h1 className=" text-xl tracking-widest  text-black ml-10 font-semibold">Activity</h1>
                        <BarChartGraph data={allBudgets}/>
                    </div>
                    <div className=" text-white w-full  flex flex-col gap-4">
                        <h1 className=" text-2xl  dark:text-[#261E35] text-white font-semibold tracking-widest">Latest Expenses</h1>
                        <div className=" w-full h-full flex flex-col ">
                            <EachExpenseStructure/>
                            {allBudgets.length>0 && allBudgets.slice().reverse().map((exp,ind)=>{return <EachExpensesDash exp={exp} key={ind}/>})}
            </div>
                    </div>
                </div>
                <div className="  lg:w-full">
                    <div className=" w-full   flex flex-col px-3 py-4 gap-4 min-h-full bg-[#865ead] rounded-xl">
                        <h1 className="  text-[#261E35] pl-4 font-semibold tracking-widest text-2xl">Latest Budgets</h1>
                        {allBudgets.length>0?<div className=" flex flex-col gap-3 w-full items-center">{allBudgets.length>0 && allBudgets.slice().reverse().map((exp,ind)=>{return <DashBudgetlayout key={ind} EachBudgetData={exp} />})}</div>:allBudgets.length===0 && emptyList ?<div className=" w-full flex justify-center"><h1 className="text-2xl text-white ">Empty Budgets</h1></div>:<div className=" w-full flex justify-center text-2xl text-white">Getting Budgets ...</div>}
                    </div>
                </div>
                
            </div>
        </div>
    )
}