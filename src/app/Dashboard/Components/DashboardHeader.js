import dashlogo from "@/app/assets/logo.svg"
import Image from "next/image"
import { MdDashboard } from "react-icons/md";

import { MdBrowserUpdated } from "react-icons/md";
import { RiMapPinUserFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useContext } from "react";
import { ExpenseDetailsContext } from "@/app/store/ExpenseTrackerContext";
import { signOut } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import HandelLogoutFuncnality from "@/lib/SigoutFunctionality";
import { useRouter } from "next/navigation";


export default function DashboardHeader(){
    const { toast } = useToast()
    const router=useRouter()
    const ExpenseContext=useContext(ExpenseDetailsContext)
    const sidebar=ExpenseContext.Sidebar
    const current=ExpenseContext.currentWindow
    const HandelLogoutF=()=>{
        HandelLogoutFuncnality()
    }
    return(
        <div className="  fixed z-20 left-0 top-0 h-screen bg-[#261E35]  flex flex-col justify-between items-center   border-r-[1px] border-zinc-500 py-10 px-3 duration-500">
            <div><Image src={dashlogo} alt="logo" priority/></div>
            <div className="relative flex flex-col items-center text-zinc-100 w-full gap-[1.7vw] py-3 duration-300  ">
                <Link href="/Dashboard" className=" w-full"><div className={`h-auto  rounded-md ${current==="Home" && "bg-[#4c3d5e]"}  w-full flex gap-4 ${sidebar && "pr-2"} items-center duration-300  cursor-pointer hover:bg-[#4c3d5e] `} onClick={()=>ExpenseContext.setCurrentWindow("Home")}><MdDashboard className=" text-[1.5rem] m-3"/>{sidebar&&<h1 className=" text-[1.2rem] text-nowrap tracking-widest ">Dashboard</h1>}</div></Link>
                <Link href="/Dashboard/budgets" className=" w-full"><div className= {`h-auto rounded-md ${current==="Budgets" && "bg-[#4c3d5e]"} w-full  flex gap-4 items-center duration-300 ${sidebar && "pr-2"} cursor-pointer hover:bg-[#4c3d5e]`} onClick={()=>ExpenseContext.setCurrentWindow("Budgets")}><BsFillPiggyBankFill className=" text-[1.5rem] m-3"/>{sidebar&&<h1 className=" text-[1.2rem]text-nowrap tracking-widest">Budgets</h1>}</div></Link>
                <Link href="/Dashboard/expenses" className=" w-full"><div className={` h-auto rounded-md ${current==="Add Expenses" && "bg-[#4c3d5e]"} w-full ${sidebar && "pr-2"}  flex gap-4 items-center duration-300 cursor-pointer hover:bg-[#4c3d5e] `}onClick={()=>ExpenseContext.setCurrentWindow("Add Expenses")}><CgNotes className=" text-[1.5rem] m-3 "/>{sidebar&&<h1 className=" text-[1.2rem] text-nowrap tracking-widest">Add Expenses</h1>}</div></Link>
                <Link href="/Dashboard/upgrade" className=" w-full"><div className= {`h-auto rounded-md w-full ${current==="Upgrade" && "bg-[#4c3d5e]"} flex gap-4 items-center duration-300 ${sidebar && "pr-2"} cursor-pointer hover:bg-[#4c3d5e]`} onClick={()=>ExpenseContext.setCurrentWindow("Upgrade")}><MdBrowserUpdated className=" text-[1.5rem] m-3"/>{sidebar&&<h1 className=" text-[1.2rem] text-nowrap tracking-widest">Upgrade</h1>}</div></Link>
                <Link href="/Dashboard/profile" className=" w-full"><div className= {`h-auto rounded-md w-full ${current==="Profile" && "bg-[#4c3d5e]"} flex gap-4 items-center duration-300 ${sidebar && "pr-2"} cursor-pointer hover:bg-[#4c3d5e]`}onClick={()=>ExpenseContext.setCurrentWindow("Profile")}><RiMapPinUserFill className=" text-[1.5rem] m-3"/>{sidebar&&<h1 className=" text-[1.2rem] text-nowrap tracking-widest">Add Profile</h1>}</div></Link>
            </div>
            <div className= {`h-auto rounded-md w-full text-white  flex gap-4 items-center duration-300 ${sidebar && "pr-2"} cursor-pointer hover:bg-[#4c3d5e]`} onClick={()=>{HandelLogoutF();toast({
                title: "Logout Successfully"});router.push("/")}}><IoLogOut className=" text-[1.5rem] m-3"/>{sidebar&&<h1 className=" text-[1.2rem] text-nowrap tracking-widest">Logout</h1>}</div>
            <div className={` absolute  ${sidebar ?"left-[5.5rem]":"left-[3.5rem]"} top-4 text-xl rounded-full text-zinc-400 cursor-pointer bg-[#3f334e] flex h-[2.6rem] w-[2.6rem] items-center justify-center ${sidebar && " translate-x-[8rem] duration-100"}`} onClick={()=>ExpenseContext.HandelSidebarWidth()}>{sidebar?<IoIosArrowBack className=""/>:<IoIosArrowForward className=""/>}</div>
        </div>
    )
}