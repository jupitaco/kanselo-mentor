"use client";
import React from "react";
import Sidebar from "./sidebar";
import { useModalContext } from "@/context/modalContext";

export default function RenderSidebar() {
  const { toggle } = useModalContext();
  return (
    <>
      <aside className="border-grey-100 hidden h-screen w-[19%] border-r bg-white lg:flex">
        <Sidebar />
      </aside>
      <aside className={toggle ? "openSidebar" : "closeSidebar"}>
        <Sidebar />
      </aside>
    </>
  );
}
