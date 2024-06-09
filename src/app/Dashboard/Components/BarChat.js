"use client"
import { BarChart, Legend, Tooltip, XAxis, YAxis,Bar } from "recharts"
export default function BarChartGraph({data}){
    return(
        <div className=" w-full h-full">
            <BarChart width={600} height={300} data={data} margin={{
                top:5,
                right:5,
                left:5,
                bottom:5
            }}>
                <XAxis dataKey="BudgetName"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="TotalSpend" stackId="a" fill="#4845d2" stroke="#8884d8"/>
                <Bar dataKey="Amount" stackId="a" fill="#C3C2ff" />
            </BarChart>
        </div>
    )
}