"use client"
import DashboardHeader from "./Components/DashboardHeader";
import TopHeadbar from "./Components/Topheader";
import { Toaster } from "@/components/ui/toaster"
import { NextAuthWrapper } from "../NextAuthWrapper/AuthWrapper";
import {  ExpenseTrackerContextProvider } from "../store/ExpenseTrackerContext";

export default function Layout({children}){
    return(
        <NextAuthWrapper>
            <ExpenseTrackerContextProvider>
            <Toaster />
            <div className={` `}>
            {/* <div className={`${ExpenseContext.Dark && "dark"} `}> */}

            <div className={`relative flex items-center w-screen h-screen dark:bg-zinc-100 bg-[#261E35] gap-[1vw]`}>
            <DashboardHeader/>
            <div className=" w-full h-screen  flex flex-col gap-[1vw] px-[1vw] py-[2vw] pl-[4.8rem]  ">
                <TopHeadbar />
                {children}
            </div>
            
        </div>
            </div>
        </ExpenseTrackerContextProvider>
        </NextAuthWrapper>
        
    )
}