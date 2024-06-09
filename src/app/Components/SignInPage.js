"use client"

import { useEffect, useState } from "react"
import { FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { signIn,signOut,useSession } from "next-auth/react";
import RegisterField from "./RegisterFields";
import LoginFields from "./LoginFileds";

export default  function SignInPage(){
    // const { data, status } = useSession();
    const [signInWindow,setSignInWindow]=useState(true)
//   useEffect(()=>{
//     function SetUserdetails(){
//         if(data){
//             localStorage.setItem('Penny-ouAth',true);
//         }
//         else{
//             localStorage.setItem('Penny-ouAth',false);
//         }
//     }
//     SetUserdetails()
//   },[data])
    const HandelSignInPage=()=>{
      setSignInWindow(!signInWindow)
    }
    return(
        <div id="signn" className=" flex flex-col items-center overflow-hidden">
        <div className="mx-auto max-w-screen-xl px-4 py-6 sm:py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

             <p className="mt-4 text-gray-500 text-xl">
                Welcome to <span className=" text-blue-900 tracking-widest font-semibold">PennyPilot</span> . Enter your details to get started 
            </p>
        </div>
        {signInWindow?<LoginFields HandelPage={HandelSignInPage}/>:<RegisterField HandelPage={HandelSignInPage}/>}
  
</div>
<div className=" flex flex-col gap-6 sm:w-[40vw] items-center">
    <div className=" w-[60%] flex items-center "><div className=" w-full h-1 bg-black"></div><h1 className=" mx-3">OR</h1><div className=" w-full h-1 bg-black"></div></div>
    <div className=" flex gap-5 items-center flex-col">
        <button  className=" bg-black rounded-md px-6 py-3 text-white tracking-widest flex gap-6 items-center hover:scale-105 hover:shadow-md hover:shadow-zinc-600 duration-200" onClick={()=>signIn("github")}><FaGithub className=" text-xl"/>Sign in with Github</button>
        {/* <button  className=" bg-black rounded-md px-6 py-3 text-white tracking-widest flex gap-6 items-center hover:scale-105 hover:shadow-md hover:shadow-zinc-600 duration-200" onClick={()=>signOut()}><FaGithub className=" text-xl"/> Github</button> */}

        <button  className=" bg-rose-600 rounded-md px-6 py-3 text-white tracking-widest flex gap-6 items-center hover:scale-105 hover:shadow-md hover:shadow-zinc-600 duration-200" onClick={()=>signIn("google")} ><FaGoogle className=" text-xl"/>Sign in with Google</button>
    </div>
    
</div>
</div>
    )
}