import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileCheck, Lock, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Secure your data with <span className="text-black">confidence</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-gray-600">
                Our suite of security tools helps you verify file integrity, encrypt sensitive data, and protect your
                information with modern cryptographic methods.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link href="/register">
                  <Button className="bg-black px-6 py-6 text-white hover:bg-gray-800">Get started</Button>
                </Link>
                <Link href="#features" className="flex items-center text-sm font-semibold text-gray-900">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2">
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 p-8">
                <div className="h-full w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="space-y-4">
                    <div className="h-2 w-3/4 rounded bg-gray-200"></div>
                    <div className="h-2 w-1/2 rounded bg-gray-200"></div>
                    <div className="h-10 rounded bg-gray-200"></div>
                    <div className="flex justify-end">
                      <div className="h-8 w-24 rounded bg-black"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Security tools for everyone</h2>
            <p className="mt-4 text-lg text-gray-600">
              Simple, powerful, and secure tools to protect your data and verify file integrity.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                <FileCheck className="h-6 w-6 text-gray-900" />
              </div>
              <h3 className="mb-3 text-xl font-bold">File Verification</h3>
              <p className="text-gray-600">
                Verify the integrity of your files with SHA-256 hashing and maintain a record of previous verifications.
              </p>
              <Link href="/file-verification" className="mt-6 inline-flex items-center text-sm font-medium text-black">
                Verify files <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                <Lock className="h-6 w-6 text-gray-900" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Encryption & Decryption</h3>
              <p className="text-gray-600">
                Secure your sensitive data with strong encryption algorithms and decrypt it when needed.
              </p>
              <Link href="/encrypt-decrypt" className="mt-6 inline-flex items-center text-sm font-medium text-black">
                Encrypt data <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                <Shield className="h-6 w-6 text-gray-900" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Secure Account</h3>
              <p className="text-gray-600">
                Create a secure account to save your encryption keys and file verification history.
              </p>
              <Link href="/register" className="mt-6 inline-flex items-center text-sm font-medium text-black">
                Create account <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gray-50 px-6 py-16 sm:p-16">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Ready to secure your data?</h2>
              <p className="mt-4 text-lg text-gray-600">
                Get started with our security tools today and take control of your data security.
              </p>
              <div className="mt-10">
                <Link href="/register">
                  <Button className="bg-black px-8 py-6 text-white hover:bg-gray-800">Create free account</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
