"use client";
import { useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <span className="font-bold text-lg">
              Cryptography
            </span>
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link href="/encrypt-decrypt" className="text-gray-700 hover:text-blue-600 font-medium">Encrypt/Decrypt</Link>
            <Link href="/file-verification" className="text-gray-700 hover:text-blue-600 font-medium">File Verification</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</Link>
            <div className="flex items-center gap-2 ml-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline" size="sm">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">Sign Up</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
          {/* Mobile Hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Open main menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-4">
          <div className="flex flex-col gap-2 mt-2">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/encrypt-decrypt" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Encrypt/Decrypt</Link>
            <Link href="/file-verification" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>File Verification</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <div className="flex items-center gap-2 mt-2">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm" className="w-full">Sign Up</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
