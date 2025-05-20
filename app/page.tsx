import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <h1 className="mb-6 text-4xl font-bold">Welcome to Auth UI</h1>
      <p className="mb-8 text-center text-gray-600">A simple black and white authentication interface</p>
      <div className="flex space-x-4">
        <Link
          href="/login"
          className="rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          Register
        </Link>
      </div>
    </div>
  )
}
