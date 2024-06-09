import mongoose,{Schema} from "mongoose";

const ExpenseSchema=new Schema({
    ExpenseName:{
        type:String,
        required:true
    },
    ExpenseAmount:{
        type:String,
        required:true
    },
    CreatedAt:{
        type: Date,
        default:Date.now()
    },
    CreatedBy:{
        type:String,
        required:true
    }
})

let ExpenseModel
try {
    ExpenseModel=mongoose.model("Expense-Model")
} catch (error) {
    ExpenseModel=mongoose.model("Expense-Model",ExpenseSchema)
}

export { ExpenseModel }