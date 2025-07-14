import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import Link from "next/link"
import { 
  Shield, 
  Lock, 
  FileText, 
  Users, 
  Zap, 
  Globe, 
  Award, 
  CheckCircle,
  ArrowRight,
  Key,
  Fingerprint,
  Database
} from "lucide-react"

export default async function HomePage() {
  const user = await currentUser()

  const features = [
    {
      icon: Lock,
      title: "Advanced Encryption",
      description: "State-of-the-art encryption algorithms including AES-256, RSA, and ChaCha20 for maximum security.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: FileText,
      title: "File Verification",
      description: "Verify file integrity with SHA-256 hashing and digital signature validation.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Users,
      title: "User Management",
      description: "Secure user authentication and role-based access control for enterprise environments.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Optimized cryptographic operations with minimal latency and maximum throughput.",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: Globe,
      title: "Global Compliance",
      description: "Meet international security standards including FIPS, NIST, and GDPR requirements.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: Award,
      title: "Certified Security",
      description: "Industry-certified security protocols with regular audits and penetration testing.",
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ]

  const stats = [
    { label: "Active Users", value: "10,000+", icon: Users },
    { label: "Files Secured", value: "1M+", icon: FileText },
    { label: "Uptime", value: "99.9%", icon: Shield },
    { label: "Security Score", value: "A+", icon: Award }
  ]

  const algorithms = [
    { name: "AES-256-GCM", description: "Authenticated encryption with Galois/Counter Mode" },
    { name: "RSA-4096", description: "Asymmetric encryption with 4096-bit keys" },
    { name: "ChaCha20-Poly1305", description: "High-performance authenticated encryption" },
    { name: "SHA-256", description: "Secure Hash Algorithm for integrity verification" },
    { name: "Ed25519", description: "Elliptic curve digital signature algorithm" },
    { name: "Argon2", description: "Memory-hard password hashing function" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SignedOut>
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                    <Shield className="w-4 h-4" />
                    Enterprise-Grade Cryptography
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                    Secure Your Data with
                    <span className="text-blue-600"> Advanced Cryptography</span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Protect your sensitive information with state-of-the-art encryption, file verification, 
                    and digital signatures. Trusted by enterprises worldwide.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <SignInButton>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </SignInButton>
                  <Link href="/encrypt-decrypt">
                    <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                      Try Demo
                    </button>
                  </Link>
                </div>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                    Welcome back, <span className="text-blue-600">{user?.firstName || "User"}</span>!
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Your cryptography dashboard is ready. Access all your security tools and manage your encrypted data.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <Link href="/encrypt-decrypt">
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                      <Lock className="w-8 h-8 text-blue-600 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Encrypt & Decrypt</h3>
                      <p className="text-gray-600 text-sm">Secure your data with advanced encryption algorithms</p>
                    </div>
                  </Link>
                  <Link href="/file-verification">
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                      <FileText className="w-8 h-8 text-green-600 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">File Verification</h3>
                      <p className="text-gray-600 text-sm">Verify file integrity and digital signatures</p>
                    </div>
                  </Link>
                  <Link href="/contact">
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                      <Users className="w-8 h-8 text-purple-600 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Support</h3>
                      <p className="text-gray-600 text-sm">Get help from our cryptography experts</p>
                    </div>
                  </Link>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Cryptography System?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with enterprise-grade security in mind, our platform provides comprehensive 
              cryptographic solutions for modern businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.bgColor} rounded-lg mb-6`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithms Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Supported Algorithms</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform supports industry-standard cryptographic algorithms 
              that meet the highest security requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {algorithms.map((algorithm, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Key className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">{algorithm.name}</h3>
                </div>
                <p className="text-gray-600 text-sm">{algorithm.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Secure Your Data?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of organizations that trust our cryptography platform 
              to protect their most sensitive information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedOut>
                <SignInButton>
                  <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                    Start Free Trial
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/encrypt-decrypt">
                  <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                    Access Dashboard
                  </button>
                </Link>
              </SignedIn>
              <Link href="/contact">
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                  Contact Sales
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Cryptography System</h3>
              <p className="text-gray-400 text-sm">
                Enterprise-grade cryptographic solutions for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/encrypt-decrypt" className="hover:text-white transition-colors">Encryption</Link></li>
                <li><Link href="/file-verification" className="hover:text-white transition-colors">File Verification</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Security</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Cryptography System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
