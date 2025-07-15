"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
                <button className="w-full px-4 py-2 bg-black text-white rounded">Sign In</button>
              </SignInButton>
            </div>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Encryption & Decryption</h1>
            <p className="text-muted-foreground">Secure your data with AES-CBC encryption</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Encryption Section */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Encryption
                </CardTitle>
                <CardDescription>Enter text to encrypt and download the encrypted file</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="encrypt-input">Enter text to encrypt</Label>
                  <Input
                    id="encrypt-input"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message here..."
                  />
                </div>

                <Button onClick={handleEncrypt} className="w-full">
                  Encrypt Text
                </Button>

                {downloadUrl && (
                  <Button asChild variant="outline" className="w-full">
                    <a href={downloadUrl} download="encrypted_data.json">
                      Download Encrypted File
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Decryption Section */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Decryption
                </CardTitle>
                <CardDescription>Upload an encrypted file to decrypt its contents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="decrypt-file">Choose encrypted file</Label>
                  <Input
                    id="decrypt-file"
                    type="file"
                    accept=".json"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                </div>

                <Button onClick={handleDecrypt} className="w-full">
                  Decrypt File
                </Button>

                {decryptedText && (
                  <div className="p-4 bg-muted rounded-lg">
                    <Label>Decrypted Text:</Label>
                    <p className="mt-2 font-mono text-sm break-all">{decryptedText}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </SignedIn>
    </>
  )
}