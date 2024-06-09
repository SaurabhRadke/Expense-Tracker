import mongoose,{Schema} from "mongoose";

const BudgetSchema=new Schema({
    CreatedBy:{
        type:String,
        required:true
    },
    Amount:{
        type:String,
        required:true
    },
    Icon:{
        type:String,
    },
    BudgetName:{
        type:String,
        required:true
    },
    TotalItem:{
        type:Number,
        default:0
    },
    TotalSpend:{
        type:Number,
        default:0
    },
    Expenses:{
        type:Array,
        default:[]
    }

})
let BudgetModel
try {
    BudgetModel=mongoose.model("Budget-Model")
} catch (error) {
    BudgetModel=mongoose.model("Budget-Model",BudgetSchema)
}

export { BudgetModel }