"use client";
import Image from "next/image";
import imag1 from "@/app/assets/Secexp.png";
import { useContext, useEffect, useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { ExpenseDetailsContext } from "@/app/store/ExpenseTrackerContext";
import { trusted } from "mongoose";

export default function Expenses() {
  const [ExpData, SetExpData] = useState([]);
  const [getExpense, setGetExpense] = useState(true);
  const ExpenseContext=useContext(ExpenseDetailsContext)
  useEffect(() => {
    
    function convertBudgetData(budgets) {
        const result=[]
        budgets.forEach(budget => {
            budget.Expenses.forEach(expense => {
                result.push({
                    BudgetName: budget.BudgetName,
                    BudgetId: budget._id,
                    ExpenseName: expense.ExpenseName,
                    ExpenseAmount: expense.ExpenseAmount,
                    CreatedAt: expense.CreatedAt,
                    ExpenseId: expense._id
                });
            });
        });
        return result
    }
    const Expense=convertBudgetData(ExpenseContext.BudgetList)
    SetExpData(Expense)
    setGetExpense(false)

    // Example usage:
    
  }, [ExpenseContext.BudgetList]);
  return (
    <div className="   p-6 flex flex-col gap-6 items-center text-white dark:text-black overflow-x-hidden">
      <h1 className=" text-3xl tracking-widest">Expenses List</h1>
      <div className=" w-full h-auto flex flex-col gap-3 p-3 items-center">
        {ExpData.length > 0 && !getExpense ? (
          ExpData.slice()
            .reverse()
            .map((data, index) => {
              return (
                <div
                  key={index}
                  className=" relative cursor-pointer group hover:shadow-lg hover:shadow-[#433252] duration-500 w-full sm:w-[90%] h-14 rounded-lg flex justify-between px-6 tracking-widest text-lg items-center bg-[#865ead]"
                >
                  <Image
                    src={imag1}
                    alt="Image"
                    priority
                    className=" w-[3rem] h-[3rem]  rounded-full object-cover"
                  />
                  <h1>{data.ExpenseName}</h1>
                  <div className=" absolute -top-1 text-zinc-900 text-sm bg-slate-200 rounded-lg px-4 py-1 group-hover:block hidden duration-500 ">{data.BudgetName}</div>
                  <p>{data.CreatedAt.slice(0, 10)}</p>
                  <div className=" flex gap-5 items-center text-3xl"><MdDeleteForever className=" hover:text-rose-600 duration-500"/><MdOutlineEditNote className=" duration-500  hover:text-[#2b193b]"/></div>
                </div>
              );
            })
        ) : getExpense ? ([...Array(10).keys()].map((each,ind)=>{return(
            <div
                  key={ind}
                  className=" relative w-full sm:w-[90%] h-14   rounded-lg animate-pulse items-center bg-[#7b5f94]"
                >


                </div>
        )})
        ) : (
          ExpData.length===0 &&<div className=" w-full h-full flex justify-center text-2xl text-white tracking-widest">
            Expenses List is Empty
          </div>
        )}
      </div>
    </div>
  );
}
