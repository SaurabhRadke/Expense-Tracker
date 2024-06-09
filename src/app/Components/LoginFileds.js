"use client"
import { FaLightbulb } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

import { useContext, useRef, useState } from "react"
import { ExpenseDetailsContext } from "../store/ExpenseTrackerContext";
export default function LoginFields({HandelPage}){
  const expenseContext=useContext(ExpenseDetailsContext)
    
    const email=useRef()
    const password=useRef()
    const [seePass,setSeePass]=useState(false)
    const HandelLogin = async () => {
      expenseContext.StatusLogin(true)
      expenseContext.LoginHandler(email.current.value,password.current.value)    
      expenseContext.StatusLogin(false);
    }
    
    return(
        <>
            <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={(e)=>{e.preventDefault();HandelLogin()}}>
    <div>
      <label htmlFor="email" className="sr-only">Email</label>

      <div className="relative">
        <input
          type="email"
          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-lg shadow-sm tracking-widest"
          placeholder="Enter email"
          ref={email}
        />

        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
        </span>
      </div>
    </div>

    <div>
      <label htmlFor="password" className="sr-only">Password</label>

      <div className="relative">
        <input
          type={seePass?"text":"password"}
          className="w-full rounded-lg border-gray-200 p-4 tracking-widest pe-12 text-lg font-semibold placeholder:font-medium shadow-sm"
          placeholder="Enter password"
          ref={password}
        />

        <span className="absolute inset-y-0 end-0 grid place-content-center px-4" onClick={()=>setSeePass(!seePass)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </span>
      </div>
    </div>

    <div className="flex items-center justify-between text-lg">
      <p className=" text-gray-500 flex items-center">
        No account?
        <a className="underline text-blue-800" href="#" onClick={()=>HandelPage()}>Sign up</a>
        <FaLightbulb className=" text-xl  ml-2 m-2 text-black cursor-pointer" onClick={()=>{email.current.value="demo1@gmail.com";password.current.value="demo1@123"}}/>
      </p>
      
      <button
        type="submit"
        className="inline-block rounded-lg bg-black group px-6 border-[1px] border-black hover:bg-white  hover:text-black duration-500 py-2 text-lg font-medium text-white"
      >
        {expenseContext.Login ? <div className=" w-4 h-4 border-l-2 border-b-2  rounded-full border-white group-hover:border-black animate-spin mx-4 my-2"></div>:"Sign In"}
        

      </button>
    </div>
  </form>
        </>
    )
}