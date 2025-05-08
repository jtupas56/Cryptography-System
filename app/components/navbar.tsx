"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import type { getSession } from "@/app/lib/auth"
import { logout } from "@/app/actions/auth"

interface NavbarProps {
  session?: Awaited<ReturnType<typeof getSession>>
}

export function Navbar({ session }: NavbarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-16 mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold">
            NextAuth
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm ${isActive("/") ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              Home
            </Link>
            <Link
              href="/encryption"
              className={`text-sm ${isActive("/encryption") ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              Encryption
            </Link>
            <Link
              href="/file-verification"
              className={`text-sm ${isActive("/file-verification") ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              File Verification
            </Link>
            <Link
              href="/contact"
              className={`text-sm ${isActive("/contact") ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <form action={logout}>
                <Button variant="ghost" size="sm" type="submit">
                  Logout
                </Button>
              </form>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
