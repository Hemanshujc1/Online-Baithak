import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import React, { ReactNode } from "react";
import { Metadata } from 'next';
import Footer from "@/components/Footer/Footer";


export const metadata: Metadata = {
  title: "OnlineBaithak",
  description: "An Indian online video confercing app",
  icons:{
    icon:'/icons/logo.svg'
  }
};
const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
        <Navbar/>
      <div className="flex flex-row-reverse">
        <Sidebar/>
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full ">{children}</div>
        </section>
      </div>
      <Footer/>
    </main>
  );
};

export default HomeLayout;
