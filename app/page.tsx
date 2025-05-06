import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 mx-auto">
          <h1 className="text-xl font-bold">NextAuth</h1>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-24 text-center">
          <div className="container px-4 mx-auto">
            <h1 className="text-5xl font-bold tracking-tight">Secure Authentication</h1>
            <p className="max-w-lg mx-auto mt-4 text-xl text-muted-foreground">
              A complete authentication system with login, registration, and protected routes.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <Link href="/register">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-20 bg-muted/50">
          <div className="container px-4 mx-auto">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Secure Authentication</h3>
                <p className="mt-2 text-muted-foreground">
                  Industry-standard security practices to keep your data safe.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">User Dashboard</h3>
                <p className="mt-2 text-muted-foreground">Access your personal dashboard after authentication.</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">Protected Routes</h3>
                <p className="mt-2 text-muted-foreground">Secure routes that only authenticated users can access.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 border-t">
        <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} NextAuth. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
