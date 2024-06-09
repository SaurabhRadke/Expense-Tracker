"use client"
import { createContext, useEffect, useState } from "react";
export const ExpenseDetailsContext=createContext()

export const ExpenseTrackerContextProvider=({children})=>{
    const [allBudgets,setAllBudgets]=useState([])
    const [currentWindowName,setCurrentWindowName]=useState("Home")
    const [dark,setdark]=useState(false)
    const [searchData,setSearchData]=useState([])
    const [sidebar,setSidebar]=useState(false)
    const [totalBudget,setTotalBudget]=useState(0)
    const [totalSpend,setTotalSpend]=useState(0)
    const [emptyList,setEmptyList]=useState(false)
    const [userEmail,setUserEmail]=useState("")
    useEffect(()=>{
        // setBudgetListLoader(true)
        // console.log("Dashhh",data)
        setEmptyList(false)
        const user=localStorage.getItem('user_email')
        async function getBudgets(){
            const budgets=await fetch(`/api/getBudgets/demo1@gmail.com`)
            const budgetData=await budgets.json()
            if(budgets.status===201){
                if(budgetData===0){
                    router.push("/Dashboard/budgets")
                    setCurrentWindowName("Budgets")
                    setEmptyList(true)
                }else{
                    setAllBudgets(budgetData)
                    SearchMethod(budgetData)
                    setEmptyList(false)
                    // SearchMethod(budgetData)
                }
            }
            // setBudgetListLoader(false)
        }
        getBudgets()
        
    },[])
    useEffect(()=>{
        MakeAllCalculations()
    },[allBudgets])
    const DeleteExpense=async(exp_id,budget_id)=>{
        const DeleteExpense=await fetch(`/api/getBudgets/singleExpense/${budget_id}`,{
            method:"DELETE",
            body:JSON.stringify({ExpenseId:exp_id}),
            headers:{
                'Content-Type': 'application/json',
            }
        })
        if(DeleteExpense.status===201){
            const Updated=await DeleteExpense.json()
            setAllBudgets(Updated)
        }
    }

    function SearchMethod(data){
        const temp=[]
        for(let budget of data){
            temp.push([budget.BudgetName,budget._id])
            for (let exp of budget.Expenses){
                temp.push([exp.ExpenseName,budget._id])
            }

        }
        setSearchData(temp)
    }
    const HandelSidebarWidth=()=>{
        setSidebar(!sidebar)
    }
    function MakeAllCalculations(){
        let total=0
        let totalSpend=0
        // console.log("allll",allBudgets)
        allBudgets.forEach((budget)=>{
            console.log("bbbbb",budget)
            total+=Number(budget.Amount)
            totalSpend+=(budget.TotalSpend)
        })
        setTotalBudget(total)
        setTotalSpend(totalSpend)
    }
    return(
        <ExpenseDetailsContext.Provider value={{
            BudgetList:allBudgets,
            ChangedBudgetList:setAllBudgets,
            currentWindow:currentWindowName,
            setCurrentWindow:setCurrentWindowName,
            DeleteExpense:DeleteExpense,
            SearchNavData:searchData,
            Dark:dark,
            SetDark:setdark,
            Sidebar:sidebar,
            HandelSidebarWidth:HandelSidebarWidth,
            TotalBudget:totalBudget,
            TotalSpend:totalSpend,
            EmptyBudget:emptyList,
            User:userEmail,
            ChangeUser:setUserEmail
        
        }}>
            {children}
        </ExpenseDetailsContext.Provider>
    )
    
}