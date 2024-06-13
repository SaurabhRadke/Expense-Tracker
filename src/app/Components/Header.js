"use client";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import logName from "@/app/assets/penny.png";
import Button from "./ButtonStyle";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useContext } from "react";
import { ExpenseDetailsContext } from "../store/ExpenseTrackerContext";
import HandelLogoutFuncnality from "@/lib/SigoutFunctionality";
import { useSession } from "next-auth/react";
export default function Headers({ HandelLogin, authenticated, HandelLogout }) {
  const { data, status } = useSession();
//   console.log("auu",authenticated)
  return (
    <header className=" relative w-screen h-[14%] flex items-center border-b-zinc-400 px-10 justify-between">
      <div id="logo" className=" flex gap-3">
        <Image src={logo} width={30} alt="logo" priority />
        <Image src={logName} width={200} alt="Penny" priority />
      </div>
      <div className="flex gap-[1.5vw] items-center">
        <div id="Getstart" className=" sm:block hidden">
          <Link href= "/Dashboard">
            <button className="  tracking-wider bg-black border-[1px] border-black px-4 py-2 text-white rounded-md hover:bg-white hover:text-black duration-700">
              Get Started
            </button>
          </Link>
        </div>
        {authenticated ? (
          <div id="signOut" onClick={() => HandelLogout()}>
            <Button text="Sign Out" />
          </div>
        ) :!data ? (
          <div id="sign" onClick={() => HandelLogin()}>
            <Button text="Sign In" />
          </div>
        ):<div id="signOut" onClick={() => HandelLogout()}>
        <Button text="Sign Out" />
      </div>}
      </div>
      <div
        id="head-border"
        className=" absolute w-full h-0 border-[0.2px] border-zinc-600 bottom-0 left-0 "
      ></div>
    </header>
  );
}
