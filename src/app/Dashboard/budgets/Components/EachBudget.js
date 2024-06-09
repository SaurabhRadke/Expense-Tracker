"use client"

import Image from "next/image"

import BudgetIcon from  "@/app/assets/moneyIcon.png"
export default function EachBudgets({Name,Amount,expense,spend,rem,icon,limitReached}){
    return(
        <div className="  w-[20rem] h-[12rem] bg-[#865ead] shadow-md shadow-zinc-800 cursor-pointer hover: duration-300  rounded-lg flex flex-col justify-between p-4 pb-6">
            <div className=" w-full h-[3.4rem] flex justify-between items-center  ">
                <div className="  flex items-center gap-3 ">
                    <div className=" w-[3.4rem] h-[3.4rem] rounded-full overflow-hidden bg-slate-800 flex gap-4">
                        <Image src={BudgetIcon} alt="Money" priority />
                    </div>
                    <div className=" flex flex-col ">
                        <h1 className=" text-white font-semibold text-[1rem] tracking-widest">{Name}</h1>
                        <h1 className=" text-sm">{`${expense} Expenses`}</h1>
                    </div>
                </div>
                <h1 className=" text-xl text-green-300 font-medium tracking-widest">{`$ ${Amount}`}</h1>
            </div>
            <div className=" flex gap-3 items-center ">
                <div className=" w-[19%] h-[45px]  rounded-full text-3xl">{icon}</div>
                <div className="w-full h-full flex flex-col gap-1">
                    <div className=" w-full flex justify-between text-sm ">
                        <h1>{`$${spend}`} Spend</h1>
                        <h1>{`$${rem}`} Remaining</h1>
                    </div>
                    <div className=" w-full h-2 bg-white rounded-full overflow-hidden">
                        <div style={{ width: `${limitReached}%` }} className={` h-full bg-green-500`}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}