import Link from "next/link"
import { RegisterForm } from "@/app/components/register-form"

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container flex items-center justify-between h-16 mx-auto">
        <Link href="/" className="text-xl font-bold">
          NextAuth
        </Link>
      </div>
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-8 py-12 bg-card rounded-lg shadow-sm border">
          <h1 className="text-3xl font-bold text-center">Register</h1>
          <p className="mt-2 text-center text-muted-foreground">Create an account to get started</p>
          <RegisterForm />
          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
