import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  buttonText: string
}

export default function FeatureCard({ icon, title, description, href, buttonText }: FeatureCardProps) {
  return (
    <Card className="border border-gray-200 p-6 shadow-sm">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">{icon}</div>
      <h2 className="mb-2 text-xl font-bold">{title}</h2>
      <p className="mb-4 text-gray-600">{description}</p>
      <Link href={href}>
        <Button variant="outline" className="w-full justify-between border-gray-200">
          {buttonText} <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </Card>
  )
}
