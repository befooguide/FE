"use client"

import {ReactNode} from "react";
import NavBar from "@/components/Navbar";


export default function MapLayout({ children }: { children: ReactNode }) {
  return (
    <div>
        {children}
        <NavBar />
    </div>
  )
}
