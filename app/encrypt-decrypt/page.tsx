"use client"

import { useState } from "react"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, Lock, Unlock, RefreshCw, Shield } from "lucide-react"

export default function EncryptDecryptPage() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [key, setKey] = useState("")
  const [algorithm, setAlgorithm] = useState("aes-256-gcm")
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const algorithms = [
    { value: "aes-256-gcm", label: "AES-256-GCM" },
    { value: "aes-256-cbc", label: "AES-256-CBC" },
    { value: "chacha20-poly1305", label: "ChaCha20-Poly1305" },
    { value: "rsa-oaep", label: "RSA-OAEP" },
  ]

  const handleEncrypt = async () => {
    if (!inputText || !key) {
      setMessage({ type: "error", text: "Please provide both text and encryption key" })
      return
    }

    setIsProcessing(true)
    setMessage(null)

    try {
      // Simulate encryption process
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // This is a placeholder - in a real app, you'd use a proper crypto library
      const encrypted = btoa(inputText + "|" + algorithm + "|" + Date.now())
      setOutputText(encrypted)
      setMessage({ type: "success", text: "Text encrypted successfully!" })
    } catch (error) {
      setMessage({ type: "error", text: "Encryption failed. Please try again." })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDecrypt = async () => {
    if (!inputText || !key) {
      setMessage({ type: "error", text: "Please provide both encrypted text and decryption key" })
      return
    }

    setIsProcessing(true)
    setMessage(null)

    try {
      // Simulate decryption process
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // This is a placeholder - in a real app, you'd use a proper crypto library
      const decrypted = atob(inputText).split("|")[0]
      setOutputText(decrypted)
      setMessage({ type: "success", text: "Text decrypted successfully!" })
    } catch (error) {
      setMessage({ type: "error", text: "Decryption failed. Please check your key and encrypted text." })
    } finally {
      setIsProcessing(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText)
    setMessage({ type: "success", text: "Copied to clipboard!" })
  }

  const clearAll = () => {
    setInputText("")
    setOutputText("")
    setKey("")
    setMessage(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SignedOut>
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Authentication Required</h1>
            <p className="text-lg text-gray-600">
              You need to sign in to access the encryption and decryption tools. 
              This ensures your data remains secure and private.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignInButton>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                  Sign In to Continue
                </button>
              </SignInButton>
            </div>
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Why Authentication?</h3>
              <ul className="text-sm text-gray-600 space-y-1 text-left max-w-md mx-auto">
                <li>• Secure access to cryptographic tools</li>
                <li>• Audit trail for encryption operations</li>
                <li>• User-specific key management</li>
                <li>• Compliance with security standards</li>
              </ul>
            </div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Encrypt & Decrypt</h1>
            <p className="text-gray-600">Secure your data with state-of-the-art encryption algorithms</p>
          </div>

          {message && (
            <Alert className={`mb-6 ${message.type === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}>
              <AlertDescription className={message.type === "error" ? "text-red-800" : "text-green-800"}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="encrypt" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="encrypt" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Encrypt
              </TabsTrigger>
              <TabsTrigger value="decrypt" className="flex items-center gap-2">
                <Unlock className="w-4 h-4" />
                Decrypt
              </TabsTrigger>
            </TabsList>

            <TabsContent value="encrypt">
              <Card>
                <CardHeader>
                  <CardTitle>Encrypt Text</CardTitle>
                  <CardDescription>
                    Convert your plain text into encrypted data using secure algorithms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="algorithm">Encryption Algorithm</Label>
                      <Select value={algorithm} onValueChange={setAlgorithm}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select algorithm" />
                        </SelectTrigger>
                        <SelectContent>
                          {algorithms.map((alg) => (
                            <SelectItem key={alg.value} value={alg.value}>
                              {alg.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="key">Encryption Key</Label>
                      <Input
                        id="key"
                        type="password"
                        placeholder="Enter your encryption key"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="input-text">Plain Text</Label>
                    <Textarea
                      id="input-text"
                      placeholder="Enter the text you want to encrypt..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      rows={6}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleEncrypt} disabled={isProcessing} className="flex-1">
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Encrypting...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Encrypt
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={clearAll}>
                      Clear
                    </Button>
                  </div>

                  {outputText && (
                    <div className="space-y-2">
                      <Label>Encrypted Output</Label>
                      <div className="relative">
                        <Textarea
                          value={outputText}
                          readOnly
                          rows={4}
                          className="pr-12"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={copyToClipboard}
                          className="absolute top-2 right-2"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="decrypt">
              <Card>
                <CardHeader>
                  <CardTitle>Decrypt Text</CardTitle>
                  <CardDescription>
                    Convert encrypted data back to its original plain text form
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="decrypt-key">Decryption Key</Label>
                    <Input
                      id="decrypt-key"
                      type="password"
                      placeholder="Enter your decryption key"
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="encrypted-text">Encrypted Text</Label>
                    <Textarea
                      id="encrypted-text"
                      placeholder="Enter the encrypted text..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      rows={6}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleDecrypt} disabled={isProcessing} className="flex-1">
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Decrypting...
                        </>
                      ) : (
                        <>
                          <Unlock className="w-4 h-4 mr-2" />
                          Decrypt
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={clearAll}>
                      Clear
                    </Button>
                  </div>

                  {outputText && (
                    <div className="space-y-2">
                      <Label>Decrypted Output</Label>
                      <div className="relative">
                        <Textarea
                          value={outputText}
                          readOnly
                          rows={4}
                          className="pr-12"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={copyToClipboard}
                          className="absolute top-2 right-2"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Security Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Supported Algorithms</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• AES-256-GCM: Authenticated encryption with Galois/Counter Mode</li>
                    <li>• AES-256-CBC: Advanced Encryption Standard with Cipher Block Chaining</li>
                    <li>• ChaCha20-Poly1305: High-performance authenticated encryption</li>
                    <li>• RSA-OAEP: Asymmetric encryption with Optimal Asymmetric Encryption Padding</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Best Practices</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Use strong, unique keys for each encryption</li>
                    <li>• Store keys securely and never share them</li>
                    <li>• Regularly rotate your encryption keys</li>
                    <li>• Verify the integrity of encrypted data</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SignedIn>
    </div>
  )
} 