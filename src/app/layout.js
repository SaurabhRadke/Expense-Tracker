
import "./globals.css";
import { Jost } from 'next/font/google'
import { NextAuthWrapper } from "./NextAuthWrapper/AuthWrapper";
import { UserDetailsContext } from "./store/userDetailsStore";
const jost = Jost({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})
export const metadata = {
  title: "Expense-Tracker",
  description: "Generated by Saurabh Radke",
};

export default function RootLayout({ children }) {
  const Sigggg=()=>{
    console.log(donnnne)
  }
  return (
    <html lang="en">
      <NextAuthWrapper>
      <body className={jost.className}>{children}</body>
      </NextAuthWrapper>
    </html>
  );
}
