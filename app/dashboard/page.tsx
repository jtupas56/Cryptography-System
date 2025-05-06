import { redirect } from "next/navigation"
import { getSession } from "@/app/lib/auth"
import { Button } from "@/components/ui/button"
import { logout } from "@/app/actions/auth"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 mx-auto">
          <h1 className="text-xl font-bold">Cryptography</h1>
          <form action={logout}>
            <Button variant="ghost" type="submit">
              Logout
            </Button>
          </form>
        </div>
      </header>
      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Welcome back, {session.user.name}!</p>

        <div className="mt-8 p-6 border rounded-lg bg-card">
          <h2 className="text-xl font-semibold">Your Profile</h2>
          <div className="mt-4 space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-muted-foreground">Name</div>
              <div>{session.user.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-muted-foreground">Email</div>
              <div>{session.user.email}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-muted-foreground">Member since</div>
              <div>{new Date(session.user.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
