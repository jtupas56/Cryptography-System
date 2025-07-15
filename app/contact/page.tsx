"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Clock, Globe } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="grid md:grid-cols-2 gap-8 p-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <p className="text-muted-foreground">
              We're here to help with any questions or issues you might have regarding the Cryptography System.
              Feel free to reach out through any of the following channels:
            </p>
            <div className="space-y-3 mt-6">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-sm text-muted-foreground">support@cryptosystem.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Office Hours</h4>
                  <p className="text-sm text-muted-foreground">Monday - Friday: 9am - 5pm EST</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Website</h4>
                  <p className="text-sm text-muted-foreground">cryptosystem.com</p>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Send us a Message</h3>
            <form
              className="space-y-4"
              method="POST"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" placeholder="Enter your full name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" name="email" type="email" placeholder="Enter your email address" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea id="message" name="message" placeholder="How can we help you?" rows={6} required />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
