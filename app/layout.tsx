import type React from "react"
import type { Metadata } from "next"
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"
import { Shield } from "lucide-react"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Cryptography System - Secure Your Data",
  description: "Enterprise-grade cryptography system for encryption, file verification, and digital signatures",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="flex justify-between items-center p-4 border-b bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Shield className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Cryptography System</h1>
              </Link>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Home
              </Link>
              <Link href="/encrypt-decrypt" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Encrypt/Decrypt
              </Link>
              <Link href="/file-verification" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                File Verification
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contact
              </Link>
              <div className="flex items-center gap-4 ml-4">
                <SignedOut>
                  <SignInButton>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium text-sm px-4 py-2 transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm px-4 py-2 transition-colors">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </nav>
          </header>
          <main className="min-h-screen">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
