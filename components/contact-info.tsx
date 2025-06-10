import { Card } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactInfo() {
  return (
    <Card className="border border-gray-200 p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">Contact Information</h2>

      <div className="space-y-6">
        <div className="flex items-start">
          <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <Mail className="h-5 w-5 text-gray-900" />
          </div>
          <div>
            <p className="font-medium">Email</p>
            <p className="mt-1 text-gray-600">support@securetools.com</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <Phone className="h-5 w-5 text-gray-900" />
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p className="mt-1 text-gray-600">+1 (555) 123-4567</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <MapPin className="h-5 w-5 text-gray-900" />
          </div>
          <div>
            <p className="font-medium">Office</p>
            <p className="mt-1 text-gray-600">123 Security Street</p>
            <p className="text-gray-600">San Francisco, CA 94103</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-gray-50 p-4">
        <p className="text-sm text-gray-600">Our support team is available Monday through Friday from 9am to 5pm PT.</p>
      </div>
    </Card>
  )
}
