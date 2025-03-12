"use client"

import PrevPage from "@/components/PrevPage";
import { ReactNode } from "react";


export default function ReviewLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PrevPage text="평가 목록" />
      {children}
    </>
  )
}