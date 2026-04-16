"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const isChatPage = pathname === "/chat-with-rajesh-ai";

  if (isChatPage) return null;

  return (
    <>
      <Navbar />
    </>
  );
}
