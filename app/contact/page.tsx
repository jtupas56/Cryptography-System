"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Clock, Globe } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:20px_20px] opacity-30"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent mb-6">Contact Us</h1>
        </div>

        <Card className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="grid md:grid-cols-2 gap-12 p-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We're here to help with any questions or issues you might have regarding the Cryptography System.
                  Feel free to reach out through any of the following channels:
                </p>
              </div>

              <div className="space-y-6 mt-8">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Email</h4>
                    <p className="text-gray-700 font-medium">support@cryptosystem.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Phone</h4>
                    <p className="text-gray-700 font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Office Hours</h4>
                    <p className="text-gray-700 font-medium">Monday - Friday: 9am - 5pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-amber-600 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Website</h4>
                    <p className="text-gray-700 font-medium">cryptosystem.com</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form className="space-y-6" method="POST">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-gray-700 font-semibold text-lg">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    required
                    className="border-2 border-gray-200 focus:border-blue-500 focus:ring-0 rounded-xl p-4 text-lg"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-gray-700 font-semibold text-lg">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    className="border-2 border-gray-200 focus:border-blue-500 focus:ring-0 rounded-xl p-4 text-lg"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="message" className="text-gray-700 font-semibold text-lg">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    rows={6}
                    required
                    className="border-2 border-gray-200 focus:border-blue-500 focus:ring-0 rounded-xl p-4 text-lg resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gray-900 to-black text-white font-semibold rounded-2xl px-8 py-6 text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-black/20"
                >
                  Send Message
                </button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
