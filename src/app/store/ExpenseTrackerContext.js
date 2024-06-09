"use client"
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
export const ExpenseDetailsContext=createContext()

export const ExpenseTrackerContextProvider=({children})=>{
    const router = useRouter()
    const [allBudgets,setAllBudgets]=useState([])
    const [currentWindowName,setCurrentWindowName]=useState("Home")
    const [dark,setdark]=useState(false)
    const [searchData,setSearchData]=useState([])
    const [sidebar,setSidebar]=useState(false)
    const [totalBudget,setTotalBudget]=useState(0)
    const [totalSpend,setTotalSpend]=useState(0)
    const [emptyList,setEmptyList]=useState(false)
    const [userEmail,setUserEmail]=useState("")
    const [login,setLogin]=useState(false)
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
    const DeleteExpense = async (exp_id, budget_id) => {
        try {
            const response = await fetch(`/api/getBudgets/singleExpense/${budget_id}`, {
                method: "DELETE",
                body: JSON.stringify({ ExpenseId: exp_id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
    
            const Updated = await response.json();
            setAllBudgets(Updated);
        } catch (error) {
            console.error("Failed to delete expense:", error);
        }
    };
    

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
            total+=Number(budget.Amount)
            totalSpend+=(budget.TotalSpend)
        })
        setTotalBudget(total)
        setTotalSpend(totalSpend)
    }
    const HandelLogin = async (email,password) => {
        setLogin(true);
        const userDetails = { Email: email, Password: password };
      
        if (email === "" || password=== "") {
          toast.error("Login Fields are Missing");
          setLogin(false);
          return null;
        }
      
        const loginResponse = await fetch('/api/manualauth/login', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails)
        });
        if (loginResponse.status === 201) {
          toast.success('Login Successfully');
          setUserEmail(email)
          localStorage.setItem('user_email', email);
          router.push('/Dashboard');
        } else {
          const errorData = await loginResponse.json();
          toast.error(errorData.error || 'Login failed');
        }
      
        setLogin(false);
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
            ChangeUser:setUserEmail,
            LoginHandler:HandelLogin,
            Login:login,
            StatusLogin:setLogin
        }}>
            {children}
        </ExpenseDetailsContext.Provider>
    )
    
}