import Image from "next/image";
import img1 from "@/app/assets/heroimage.svg"
import img2 from "@/app/assets/moneybank.svg"
import img3 from "@/app/assets/hero2.svg"
import SignInPage from "./SignInPage";
import { RxCross2 } from "react-icons/rx";
export default function HeroSection({login,HandelLogin}){
    
    return(
        <div className=" w-full h-full  flex gap-4 justify-center items-center">
            <div className=" relative w-[80%] sm:w-[60%] h-full gap-10  text-4xl sm:text-6xl overflow-hidden tracking-wider px-4 font-semibold flex justify-center items-center text-center flex-col"><div className=" flex flex-col gap-2"><h1 className=" relative"><span id="text1-wrap" className=" absolute  w-full h-[110%] right-0 top-0 bg-white "></span>Oversee your <span className=" text-blue-600">Expenses</span>,</h1><h1 className=" relative"><span id="text2-wrap" className=" absolute  w-0 h-[110%] right-0 top-0 bg-white "></span> Master your Budget</h1></div><h2 id="small-text" className=" leading-7 sm:leading-none text-[1rem] sm:text-[1.2rem] font-medium w-[80%] sm:w-[60%]">Supervise your expenses, own your money</h2>
            <button id="button-hero" className=" bg-black    overflow-hidden text-nowrap px-5 py-3 text-white font-medium rounded-md text-sm sm:text-xl">Get started Now</button></div>

            <div id="right-img" className="hidden sm:block relative w-[40%] h-[90%] px-6"><Image src={img1} alt="heroImg" priority /><Image src={img3} alt="hero2" className=" absolute bottom-0 right-0 " width={300} priority/> <Image src={img2} alt="money" width={400} className=" absolute -left-10 top-2"/></div>
            <div className={` absolute ${login?"w-screen":"w-0"} min-h-screen  duration-700 top-0 right-0 bg-blue-200`}><SignInPage/><RxCross2 className={`absolute ${!login && "hidden"} right-4 top-4 text-4xl text-red-600 hover:scale-110 cursor-pointer duration-500`} onClick={()=>HandelLogin()}/></div>
        </div>
    )
}