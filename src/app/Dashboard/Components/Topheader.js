"use client"
import { HiOutlineSearch } from "react-icons/hi";
import { MdSunny } from "react-icons/md";
import Image from "next/image";
import user from "@/app/assets/userAvatar.png"
import { useContext, useState } from "react";
import Link from "next/link";
import { ExpenseDetailsContext } from "@/app/store/ExpenseTrackerContext";
import { signOut } from "next-auth/react";
export default function TopHeadbar() {
    const ExpenseContext=useContext(ExpenseDetailsContext)
    const seachData=ExpenseContext.SearchNavData
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [filteredArray, setFilteredArray] = useState(seachData.slice(0, 2));

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = seachData.filter(item => item[0].toLowerCase().includes(value));
        setFilteredArray(filtered);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 100);
    };

    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    return (
        <div className="w-full dark:border-2 dark:shadow-sm dark:shadow-[#865ead] dark:rounded-lg dark:py-2 h-[3rem] sm:h-[6vw] lg:h-[4vw] text-zinc-200 border-white flex justify-between px-6 items-center">
            <div></div>
            <h1 className="tracking-widest text-2xl dark:text-[#261E35]">{ExpenseContext.currentWindow}</h1>
            <div className="h-full rounded-md flex gap-4 items-center">
                <div className="h-[70%] relative flex items-center sm:scale-100 scale-0">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        onFocus={handleFocus} 
                        onBlur={handleBlur} 
                        value={searchTerm} 
                        onChange={handleSearch}
                        className="pl-3 pr-8 py-1 outline-none rounded-md bg-transparent border-[1px] border-zinc-400"
                    />
                    <HiOutlineSearch className="absolute right-2 text-xl" />
                    {isFocused && (
                        <div className="z-30 text-black absolute w-full max-h-32 overflow-y-scroll rounded-lg border-green-500 top-full left-0 bg-[#D8B9F8] flex flex-col">
                            <ul className="m-2 z-30" onMouseDown={handleMouseDown}>
                                {filteredArray.map((item, index) => (
                                    <Link key={index} href={`/Dashboard/expenses/${item[1]}`} onClick={()=>ExpenseContext.setCurrentWindow("Budgets")}>
                                        <li>
                                            <div className="w-full text-sm tracking-widest py-1 px-3 rounded-sm hover:bg-white duration-500 cursor-pointer mt-[1px]">
                                                {item[0]}
                                            </div>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="w-[2.6rem] cursor-pointer dark:text-black h-[2.6rem] border-[1px] border-zinc-400 rounded-full grid place-items-center" onClick={()=>ExpenseContext.SetDark(!ExpenseContext.Dark)}>
                    <MdSunny className="text-xl m-auto" />
                </div>
                <div className="w-[2.6rem] group relative cursor-pointer h-[2.6rem] border-[1px] border-zinc-400 rounded-full grid place-items-center bg-zinc-200 overflow-hidden">
                    <Image src={user} alt="user" priority width={20} />
                </div>
                {/* <button className=" px-4 py-1 tracking-wider bg-rose-600 text-white" onClick={()=>signOut()}>Logout</button> */}
            </div>
        </div>
    );
}
