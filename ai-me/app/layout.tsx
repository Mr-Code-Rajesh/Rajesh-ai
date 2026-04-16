import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import CursorGlow from "@/components/CursorGlow";
import StructuredData from "@/components/StructuredData";
import Preloader from "@/components/Preloader";
import SystemFeed from "@/components/SystemFeed";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rajesh-ai.vercel.app"), // Replace with your actual domain when ready
  title: "Rajesh P | Senior Product Engineer & AI Architect",
  description: "Ultra-premium personal portfolio of Rajesh P, featuring an interactive AI assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-brand-purple/30`}>
        <Preloader />
        <StructuredData />
        <SystemFeed />
        <CursorGlow />
        <ConditionalNavbar />
        <main className="min-h-screen">
          {children}
        </main>
        <ConditionalFooter />
      </body>
    </html>
  );
}









