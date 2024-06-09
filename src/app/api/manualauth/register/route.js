
import { NextRequest,NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDb } from "@/app/ConnectDb/ConnectMongo"
import { AuthModel } from "@/app/dbSchema/AuthModel"

connectDb()
export async function POST(request){
    try{
        const reqBody=await request.json()
        // catch if user already exist
        const user = await AuthModel.findOne({Email:reqBody.Email})
        if(user){
            return NextResponse.json({message:"User already exists"},{status:400})
        }
        // hash password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(reqBody.Password,salt)
        const newUser =new AuthModel({Username:reqBody.Username,Email:reqBody.Email,Password:hashedPassword})
        const savedUser = await newUser.save()
        return NextResponse.json({message:"User Created succesfully",success:true},{status:201})
    }
    catch(error){
        console.log(error)
        return NextResponse.json({message:"Server Problem"},
        {status:500}
        )

    }
}