"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Lock, Unlock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"

export default function EncryptDecryptPage() {
  const [inputText, setInputText] = useState("")
  const [decryptedText, setDecryptedText] = useState("")
  const [downloadUrl, setDownloadUrl] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const generateKey = async () => {
    return await window.crypto.subtle.generateKey({ name: "AES-CBC", length: 128 }, true, ["encrypt", "decrypt"])
  }

  const encryptString = async (str: string, key: CryptoKey, iv: Uint8Array) => {
    const encodedString = new TextEncoder().encode(str)
    const encryptedData = await window.crypto.subtle.encrypt({ name: "AES-CBC", iv: iv }, key, encodedString)
    return Array.prototype.map.call(new Uint8Array(encryptedData), (x) => ("00" + x.toString(16)).slice(-2)).join("")
  }

  const handleEncrypt = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to encrypt",
        variant: "destructive",
      })
      return
    }

    try {
      const key = await generateKey()
      const iv = window.crypto.getRandomValues(new Uint8Array(16))
      const encryptedHex = await encryptString(inputText, key, iv)

      const exportedKey = await window.crypto.subtle.exportKey("jwk", key)

      const blob = new Blob([
        JSON.stringify({
          encryptedData: encryptedHex,
          iv: Array.from(iv),
          key: exportedKey,
        }),
      ], { type: "application/json" })

      const url = window.URL.createObjectURL(blob)
      setDownloadUrl(url)

      toast({
        title: "Success",
        description: "Text encrypted successfully! Download link is ready.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encrypt text",
        variant: "destructive",
      })
    }
  }

  const handleDecrypt = async () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a file to decrypt",
        variant: "destructive",
      })
      return
    }

    try {
      const fileContent = await selectedFile.text()
      const data = JSON.parse(fileContent)

      const key = await window.crypto.subtle.importKey(
        "jwk",
        data.key,
        { name: "AES-CBC", length: 128 },
        true,
        ["encrypt", "decrypt"]
      )

      const iv = new Uint8Array(data.iv)
      const encryptedData = new Uint8Array(
        data.encryptedData.match(/.{1,2}/g).map((byte: string) => Number.parseInt(byte, 16))
      )

      const decryptedData = await window.crypto.subtle.decrypt(
        { name: "AES-CBC", iv: iv },
        key,
        encryptedData
      )

      const decryptedString = new TextDecoder().decode(decryptedData)
      setDecryptedText(decryptedString)

      toast({
        title: "Success",
        description: "File decrypted successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decrypt file. Please check the file format.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <SignedOut>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-sm">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">Sign In Required</h1>
              <p className="text-muted-foreground mb-4">Please sign in to access this feature.</p>
              <SignInButton mode="modal">
                <button className="w-full bg-black text-white font-semibold rounded-full px-8 py-4 text-lg transition-colors hover:bg-gray-800 focus:outline-none">Sign In</button>
              </SignInButton>
            </div>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:20px_20px] opacity-30"></div>

          <div className="container mx-auto px-4 py-12 relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent mb-6">Encryption & Decryption</h1>

            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Encryption Section */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                    Encryption
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">Enter text to encrypt and download the encrypted file</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <div className="space-y-3">
                    <Label htmlFor="encrypt-input" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Enter text to encrypt</Label>
                    <Input
                      id="encrypt-input"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type your message here..."
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <button onClick={handleEncrypt} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl px-8 py-6 text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/20 flex items-center justify-center gap-3">
                    <Lock className="w-5 h-5" />
                    Encrypt Text
                  </button>

                  {downloadUrl && (
                    <a href={downloadUrl} download="encrypted_data.json" className="w-full bg-white text-black font-semibold rounded-2xl px-8 py-6 text-lg border-2 border-gray-300 transition-all duration-300 hover:bg-gray-50 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300/20 inline-flex items-center justify-center gap-3">
                      <Download className="w-5 h-5" />
                      Download Encrypted File
                    </a>
                  )}
                </CardContent>
              </Card>

              {/* Decryption Section */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-lg flex items-center justify-center">
                      <Unlock className="w-4 h-4" />
                    </div>
                    Decryption
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">Upload an encrypted file to decrypt its contents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <div className="space-y-3">
                    <Label htmlFor="decrypt-file" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Choose encrypted file</Label>
                    <Input
                      id="decrypt-file"
                      type="file"
                      accept=".json"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <button onClick={handleDecrypt} className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-2xl px-8 py-6 text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500/20 flex items-center justify-center gap-3">
                    <Unlock className="w-5 h-5" />
                    Decrypt File
                  </button>

                  {decryptedText && (
                    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-inner">
                      <Label className="text-green-800 font-bold text-lg">Decrypted Text:</Label>
                      <p className="mt-3 font-mono text-sm break-all text-green-900 bg-white/50 p-4 rounded-xl border border-green-200">{decryptedText}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  )
}