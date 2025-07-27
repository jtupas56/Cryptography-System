"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col justify-end relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:20px_20px] opacity-30"></div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="w-full text-center px-4 pt-16 pb-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent mb-8 leading-tight">Cryptography</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
              Professional-grade AES-CBC encryption and file verification system. Protect your sensitive information with military-level security that's simple to use.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link href="/encrypt-decrypt" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-black text-white font-semibold rounded-full px-10 py-5 text-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black/20 shadow-xl">Start Encrypting</button>
              </Link>
              <Link href="/file-verification" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-white text-black font-semibold rounded-full px-10 py-5 text-lg border-2 border-black hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-black/20 shadow-lg">Verify Files</button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-white/80 backdrop-blur-sm py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16">Why Choose Our System?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 flex flex-col items-center border border-blue-200/50 shadow-xl">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center mb-8 text-3xl font-bold shadow-lg">🔐</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">AES-CBC Encryption</h3>
                <p className="text-gray-700 leading-relaxed text-center">Industry-standard Advanced Encryption Standard with Cipher Block Chaining mode ensures your data remains completely secure and unreadable to unauthorized users.</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 flex flex-col items-center border border-green-200/50 shadow-xl">
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl flex items-center justify-center mb-8 text-3xl font-bold shadow-lg">⚡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Fast & Reliable</h3>
                <p className="text-gray-700 leading-relaxed text-center">Lightning-fast encryption and decryption processes with reliable file verification. Process large files quickly without compromising security.</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 flex flex-col items-center border border-orange-200/50 shadow-xl">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-2xl flex items-center justify-center mb-8 text-3xl font-bold shadow-lg">🛡️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">File Integrity</h3>
                <p className="text-gray-700 leading-relaxed text-center">SHA-256 hashing ensures file integrity verification. Detect any unauthorized changes or corruption with our comprehensive hash record system.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:30px_30px] opacity-20"></div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
            <div className="text-white">
              <h3 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">256-bit</h3>
              <p className="text-xl text-gray-300 font-medium">Encryption Strength</p>
            </div>
            <div className="text-white">
              <h3 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">100%</h3>
              <p className="text-xl text-gray-300 font-medium">Secure</p>
            </div>
            <div className="text-white">
              <h3 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">24/7</h3>
              <p className="text-xl text-gray-300 font-medium">Available</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
