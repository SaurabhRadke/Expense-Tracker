import GitHubProvider from "next-auth/providers/github";
import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const authOption=nextAuth({
  session:{
    strategy:"jwt"
  },
    providers: [
        GitHubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
          authorization:{
            params:{
              prompt:"consent",
              access_type:"offline",
              response_type:"code"
            },
          }
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
          name: "Credentials",

          async authorize(credentials){
            // console.log("Login Initisateddd")
            // console.log("CCCCC",credentials)
            const Register_Response=await fetch('http://localhost:3000/api/manualauth/login',{
              method:"POST",
              headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials.userDetails)
              
          })

              if(Register_Response.status===201){
                // console.log("Login Succesfull with Nextauhth")
                return credentials
              }
              else{
                throw new Error("USER DOENOT EXIST ")
              }
          }
        })
      ]
})

export {authOption as GET ,authOption as POST}