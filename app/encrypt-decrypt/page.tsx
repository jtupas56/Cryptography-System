"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EncryptDecryptPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Encryption Section */}
        <div className="rounded-lg bg-gray-100 p-8">
          <h2 className="mb-6 text-4xl font-bold">Encryption</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="encrypt-input">Enter a string:</Label>
              <Input id="encrypt-input" className="bg-white" placeholder="Text to encrypt" />
            </div>
            <Button className="w-full bg-black text-white hover:bg-gray-800">ENCRYPT</Button>
          </div>
        </div>

        {/* Decryption Section */}
        <div className="rounded-lg bg-gray-100 p-8">
          <h2 className="mb-6 text-4xl font-bold">Decryption</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="decrypt-file">Choose a file to decrypt:</Label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="bg-white"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  Choose File
                </Button>
                <span className="text-gray-500">No file chosen</span>
                <input id="file-upload" type="file" className="hidden" />
              </div>
            </div>
            <Button className="w-full bg-black text-white hover:bg-gray-800">DECRYPT</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
