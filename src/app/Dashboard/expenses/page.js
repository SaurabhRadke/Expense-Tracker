"use client"
import Image from "next/image";
import imag1 from "@/app/assets/Secexp.png"
import { useEffect, useState } from "react";
export default function Expenses(){
    const [ExpData,SetExpData]=useState([])
    const [getExpense,setGetExpense]=useState(false)
    useEffect(()=>{
        async function ExpenseData(){
            setGetExpense(true)
            const user=localStorage.getItem("user_email")
            const Expense=await fetch(`/api/getExpenses/demo1@gmail.com`)
            if(Expense.status===201){
                const ExpenseData=await Expense.json()
                SetExpData(ExpenseData)
               
            }
            setGetExpense(false)
           
        }
        ExpenseData()
    },[])
    return(
        <div className=" w-full h-full  p-6 flex flex-col gap-6 items-center text-white dark:text-black">
            <h1 className=" text-3xl tracking-widest">Expenses List</h1>
            <div className=" w-full h-full flex flex-col gap-3 p-3">
                {ExpData.length > 0 && !getExpense ?ExpData.slice().reverse().map((data,index)=>{return(
                    <div key={index} className=" w-full h-16 rounded-lg flex justify-between px-6 tracking-widest text-xl items-center bg-[#865ead]">
                    <Image src={imag1} alt="Image" priority className=" w-[3rem] h-[3rem]  rounded-full object-cover"/>
                    <h1 >{data.ExpenseName}</h1>
                    <p >{data.CreatedAt.slice(0,10)}</p>
                    <div >Edit</div>
                </div>
                )}):getExpense?<div className=" w-full h-full flex justify-center text-2xl text-white  tracking-widest">Fetching Expenses ...</div>:<div className=" w-full h-full flex justify-center text-2xl text-white tracking-widest">Expenses List is Empty
                
            </div>}
                
            </div>
        </div>
    )
}