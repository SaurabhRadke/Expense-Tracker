

import {  NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDb } from "@/app/ConnectDb/ConnectMongo";
import { AuthModel } from "@/app/dbSchema/AuthModel";
import { cookies } from 'next/headers'

connectDb() //Every time we need to connect with DB beacause Nextjs is an Edge framework

export async function POST(request) {
  try {
    const cokk=cookies()
    const reqCredentials = await request.json();

    const client = await AuthModel.findOne({Email:reqCredentials.Email });
    if (!client) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    // Check password is correct
    const clientPassword = await bcrypt.compare(reqCredentials.Password, client.Password);

    if (!clientPassword) {
      return NextResponse.json(
        { error: "Password did not Matched" },
        { status: 400 }
      );
    }
    // console.log("User Exist")

     // As we verfied that all input fields are correct then we need to generate token --->It is create by
     //      JSON WebToken we encrypt that token and we send it to user cookies not on user local storage because then it can be manipulated
        const tokenData={
            id:client._id,
            username:client.Username,
            email:client.Password
        }
        // Create Token 
        const token=await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
        cokk.set("Token",token)
        return NextResponse.json("Login Succesfull",{status:201,statusText:"Login Succesfully"})

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
