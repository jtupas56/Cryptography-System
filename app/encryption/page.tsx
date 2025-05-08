import { Navbar } from "@/app/components/navbar"

export default function EncryptionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-bold">Encryption Services</h1>
        <p className="mt-2 text-muted-foreground">Learn about our state-of-the-art encryption technologies.</p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-xl font-semibold">End-to-End Encryption</h2>
            <p className="mt-2 text-muted-foreground">
              Our platform uses end-to-end encryption to ensure that your data remains private and secure. Only you and
              the intended recipients can access the information.
            </p>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-xl font-semibold">AES-256 Encryption</h2>
            <p className="mt-2 text-muted-foreground">
              We implement AES-256, one of the strongest encryption algorithms available today, to protect your
              sensitive information from unauthorized access.
            </p>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-xl font-semibold">Zero-Knowledge Architecture</h2>
            <p className="mt-2 text-muted-foreground">
              Our zero-knowledge architecture ensures that even we cannot access your encrypted data. Your encryption
              keys never leave your device.
            </p>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-xl font-semibold">Secure Key Management</h2>
            <p className="mt-2 text-muted-foreground">
              We provide robust key management solutions to help you generate, store, and rotate encryption keys
              securely.
            </p>
          </div>
        </div>
      </main>
      <footer className="py-6 border-t">
        <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} NextAuth. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
