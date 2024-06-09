import mongoose from "mongoose"
export const connectDb=async()=>{
    try {
        const {connection}=await mongoose.connect(process.env.MONGODB_URL,{
            dbName:"Expense-Tracker"
        })
        console.log("DB Connected Succesfullly ")
    } catch (error) {
        console.log(error)
        console.log("Some error occured in Connecting with DB",error)
    }
}