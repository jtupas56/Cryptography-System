import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cryptography System - Secure Your Data",
  description: "Enterprise-grade cryptography system for encryption, file verification, and digital signatures",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_bWFnbmV0aWMtZ29waGVyLTk4LmNsZXJrLmFjY291bnRzLmRldiQ";

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider publishableKey={publishableKey}>
          <Navbar />
          <main>{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
