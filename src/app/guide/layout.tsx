"use client"

import {ReactNode} from "react";
import NavBar from "@/components/Navbar";


export default function GuideLayout({ children }: { children: ReactNode }) {
  return (
    <div>
        {children}
        <NavBar />
    </div>
  )
}
