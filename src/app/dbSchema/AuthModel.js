import mongoose, { Schema } from "mongoose";

const NotesSchema = new Schema({
    Username: {
      type: String,
      required: true
    },
    Password:{
      type:String,
      required:true,
    },
    Email: {
      type: String,
      default: '',
      required:true
    },
    Budgets:{
      type:Array,
      default:[]
    }
  });
  
  let AuthModel;
  try {
      // Check if the model already exists
      AuthModel = mongoose.model("Authentication");
  } catch (e) {
      // If the model doesn't exist, create it
      AuthModel = mongoose.model("Authentication", NotesSchema);
  }
  
  export { AuthModel };