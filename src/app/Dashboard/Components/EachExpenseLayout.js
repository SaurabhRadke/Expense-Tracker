"use client"

import EachExpenseControllerDash from "./EachExpenseConstrollerDash"

export default function EachExpensesDash({exp}){
    
    return(
        <div className=" flex flex-col w-full dark:border-2 dark:border-[#865ead]">{exp.Expenses.slice().reverse().map((eachExp,ind)=>{return <EachExpenseControllerDash data={eachExp} key={ind}  budgetIID={exp._id}/>})}</div>
    )
}