import { MdDelete } from "react-icons/md";

export default function EachExpenseRecord({data,DeleteExpense}){
    return(
        <div className=" hover:bg-zinc-500 duration-300 cursor-pointer w-full grid grid-cols-4 grid-rows-1 tracking-widest   border-green text-white  px-4 py-2 bg-zinc-700">
            <div className=" col-span-1">{data.ExpenseName}</div>
            <div>$ {data.ExpenseAmount}</div>
            <div>{data.CreatedAt.slice(0,10)}</div>
            <div className=" text-2xl cursor-pointer text-rose-600" onClick={()=>DeleteExpense(data._id)}><MdDelete/></div>
        </div>
    )
}