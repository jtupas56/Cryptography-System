import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Auth UI
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/encrypt-decrypt"
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Encrypt/Decrypt
          </Link>
          <Link
            href="/file-verification"
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            File Verification
          </Link>
          <Link href="/login" className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  )
}
