"use client"

import Headers from "./Components/Header";

import HeroSection from "./Components/HeroSection";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import ValidateToken from "@/lib/ValidateToken";
import { ExpenseTrackerContextProvider } from "./store/ExpenseTrackerContext";
import HandelLogoutFuncnality from "@/lib/SigoutFunctionality";
export default function Home() {
  const [loginPage,setLoginPage]=useState(false)
  const [userLoginDetails,setUserLoginDetails]=useState("")
  const [authenticated,setAuthenticated]=useState(false)
  useEffect(()=>{
    async function getValiadtion(){
      const Validated= await ValidateToken()
      setAuthenticated(Validated)
    }
    getValiadtion()
  },[])
  const HandelLogout=()=>{
    const response=HandelLogoutFuncnality()
    if(response){
      setAuthenticated(false)
      toast.success('Logout Successfully');
    }
  }
  useGSAP(
    () => {
        const headtl=gsap.timeline()
        headtl.from("#logo",{
            y:-50,
            duration:0.3,
            opacity:0
        })
        headtl.from("#Getstart",{
            y:-50,
            duration:0.3,
            opacity:0
        })
        headtl.from("#sign",{
            y:-50,
            duration:0.3,
            opacity:0
        })
        headtl.from("#head-border",{
            width:0,
            duration:0.3
        })
        headtl.to('#text1-wrap',{
          width:0,
          duration:2
        })
        headtl.from('#text2-wrap',{
          width:"100%",
          duration:2
        })
        headtl.from("#small-text",{
        scale:0,
        duration:0.5
        })
        headtl.from(['#button-hero ','#right-img'],{
          scale:0,
          duration:1,
        })
    }
);
  const handelLoginpage=()=>{
    setLoginPage(!loginPage)
  }
  return (
    <ExpenseTrackerContextProvider>
      <main className=" relative flex h-screen w-screen flex-col overflow-hidden ">
      <Toaster />
      <Headers HandelLogin={handelLoginpage} authenticated={authenticated} HandelLogout={HandelLogout}/> 
      <HeroSection login={loginPage} HandelLogin={handelLoginpage} authenticated={authenticated} />
    </main>
    </ExpenseTrackerContextProvider>
    
  );
}
