import { ExpenseDetailsContext } from "@/app/store/ExpenseTrackerContext";
import { useContext } from "react";
import { MdDelete } from "react-icons/md";

export default function EachExpenseControllerDash({data,budgetIID}){
    const ExpenseContext=useContext(ExpenseDetailsContext)

    return(
        <div className=" hover:bg-zinc-500 dark:bg-zinc-100 dark:text-black  duration-300 cursor-pointer w-full grid grid-cols-4 grid-rows-1 tracking-widest   border-green text-white  px-4 py-2 bg-zinc-700">
            <div className=" col-span-1">{data.ExpenseName}</div>
            <div>$ {data.ExpenseAmount}</div>
            <div>{data.CreatedAt.slice(0,10)}</div>
            <div className=" text-2xl cursor-pointer text-rose-600" onClick={()=>ExpenseContext.DeleteExpense(data._id,budgetIID)}><MdDelete/></div>
        </div>
    )
}