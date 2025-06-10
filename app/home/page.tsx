import Link from "next/link"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import { FileCheck, Lock, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to SecureTools</h1>
        <p className="mt-2 text-gray-600">Your dashboard for security tools and file management.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={<FileCheck className="h-6 w-6 text-gray-900" />}
          title="File Verification"
          description="Verify the integrity of your files with SHA-256 hashing."
          href="/file-verification"
          buttonText="Verify Files"
        />

        <FeatureCard
          icon={<Lock className="h-6 w-6 text-gray-900" />}
          title="Encrypt & Decrypt"
          description="Secure your sensitive data with strong encryption algorithms."
          href="/encrypt-decrypt"
          buttonText="Encrypt Data"
        />

        <FeatureCard
          icon={<Shield className="h-6 w-6 text-gray-900" />}
          title="Account Security"
          description="Manage your account settings and security preferences."
          href="/login"
          buttonText="Manage Account"
        />
      </div>

      <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-bold">Need help with our tools?</h2>
            <p className="text-gray-600">Contact our support team for assistance with any of our security tools.</p>
          </div>
          <Link href="/contact">
            <Button className="bg-black text-white hover:bg-gray-800">Contact Support</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
