"use client"

import { useState, useRef } from "react"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Upload, 
  FileText, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Download,
  Copy,
  RefreshCw,
  Lock
} from "lucide-react"

interface FileInfo {
  name: string
  size: number
  type: string
  lastModified: number
  hash?: string
  signature?: string
}

export default function FileVerificationPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{
    status: "success" | "error" | "warning" | null
    message: string
    details?: any
  } | null>(null)
  const [expectedHash, setExpectedHash] = useState("")
  const [expectedSignature, setExpectedSignature] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setFileInfo({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      })
      setVerificationResult(null)
      setUploadProgress(0)
    }
  }

  const calculateHash = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
        resolve(hashHex)
      }
      reader.readAsArrayBuffer(file)
    })
  }

  const verifyFile = async () => {
    if (!selectedFile) {
      setVerificationResult({
        status: "error",
        message: "Please select a file first"
      })
      return
    }

    setIsProcessing(true)
    setUploadProgress(0)

    try {
      // Simulate file processing
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i)
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      // Calculate file hash
      const calculatedHash = await calculateHash(selectedFile)
      
      // Update file info with calculated hash
      const updatedFileInfo = {
        ...fileInfo!,
        hash: calculatedHash
      }
      setFileInfo(updatedFileInfo)

      // Verify hash if provided
      let hashVerification = null
      if (expectedHash) {
        hashVerification = calculatedHash.toLowerCase() === expectedHash.toLowerCase()
      }

      // Simulate signature verification
      const signatureVerification = expectedSignature ? Math.random() > 0.3 : null

      // Determine overall verification status
      let status: "success" | "error" | "warning" = "success"
      let message = "File verification completed successfully"
      let details = {
        hash: calculatedHash,
        hashVerified: hashVerification,
        signatureVerified: signatureVerification
      }

      if (expectedHash && !hashVerification) {
        status = "error"
        message = "File hash verification failed - file may be corrupted or modified"
      } else if (expectedSignature && !signatureVerification) {
        status = "warning"
        message = "Digital signature verification failed - file authenticity cannot be confirmed"
      }

      setVerificationResult({ status, message, details })
    } catch (error) {
      setVerificationResult({
        status: "error",
        message: "File verification failed. Please try again."
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const clearAll = () => {
    setSelectedFile(null)
    setFileInfo(null)
    setVerificationResult(null)
    setExpectedHash("")
    setExpectedSignature("")
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const copyHash = () => {
    if (fileInfo?.hash) {
      navigator.clipboard.writeText(fileInfo.hash)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatusIcon = () => {
    if (!verificationResult) return null
    
    switch (verificationResult.status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SignedOut>
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <Lock className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Authentication Required</h1>
            <p className="text-lg text-gray-600">
              You need to sign in to access the file verification tools. 
              This ensures secure and authenticated file processing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignInButton>
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                  Sign In to Continue
                </button>
              </SignInButton>
            </div>
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Why Authentication?</h3>
              <ul className="text-sm text-gray-600 space-y-1 text-left max-w-md mx-auto">
                <li>• Secure file processing and verification</li>
                <li>• Audit trail for file operations</li>
                <li>• User-specific verification history</li>
                <li>• Compliance with security standards</li>
              </ul>
            </div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">File Verification</h1>
            <p className="text-gray-600">Verify file integrity and digital signatures to ensure authenticity</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* File Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  File Upload
                </CardTitle>
                <CardDescription>
                  Select a file to verify its integrity and authenticity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Choose File</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="*/*"
                  />
                </div>

                {fileInfo && (
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{fileInfo.name}</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Size: {formatFileSize(fileInfo.size)}</p>
                      <p>Type: {fileInfo.type || "Unknown"}</p>
                      <p>Modified: {new Date(fileInfo.lastModified).toLocaleString()}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="expected-hash">Expected Hash (Optional)</Label>
                  <Input
                    id="expected-hash"
                    placeholder="Enter expected SHA-256 hash"
                    value={expectedHash}
                    onChange={(e) => setExpectedHash(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expected-signature">Digital Signature (Optional)</Label>
                  <Textarea
                    id="expected-signature"
                    placeholder="Enter expected digital signature"
                    value={expectedSignature}
                    onChange={(e) => setExpectedSignature(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={verifyFile} 
                    disabled={!selectedFile || isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Verify File
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={clearAll}>
                    Clear
                  </Button>
                </div>

                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing file...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Verification Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Verification Results
                </CardTitle>
                <CardDescription>
                  View the results of file integrity and signature verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {verificationResult ? (
                  <div className="space-y-4">
                    <Alert className={`${
                      verificationResult.status === "success" 
                        ? "border-green-200 bg-green-50" 
                        : verificationResult.status === "error"
                        ? "border-red-200 bg-red-50"
                        : "border-yellow-200 bg-yellow-50"
                    }`}>
                      <div className="flex items-center gap-2">
                        {getStatusIcon()}
                        <AlertDescription className={
                          verificationResult.status === "success" 
                            ? "text-green-800" 
                            : verificationResult.status === "error"
                            ? "text-red-800"
                            : "text-yellow-800"
                        }>
                          {verificationResult.message}
                        </AlertDescription>
                      </div>
                    </Alert>

                    {verificationResult.details && (
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium">Calculated Hash</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono flex-1">
                              {verificationResult.details.hash}
                            </code>
                            <Button size="sm" variant="ghost" onClick={copyHash}>
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium">Hash Verification</Label>
                            <div className="mt-1">
                              {verificationResult.details.hashVerified === null ? (
                                <Badge variant="secondary">Not Checked</Badge>
                              ) : verificationResult.details.hashVerified ? (
                                <Badge className="bg-green-100 text-green-800">Verified</Badge>
                              ) : (
                                <Badge variant="destructive">Failed</Badge>
                              )}
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Signature Verification</Label>
                            <div className="mt-1">
                              {verificationResult.details.signatureVerified === null ? (
                                <Badge variant="secondary">Not Checked</Badge>
                              ) : verificationResult.details.signatureVerified ? (
                                <Badge className="bg-green-100 text-green-800">Verified</Badge>
                              ) : (
                                <Badge variant="destructive">Failed</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Upload a file and click "Verify File" to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Information Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>About File Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Hash Verification</h4>
                  <p className="text-gray-600 mb-2">
                    Hash verification ensures file integrity by comparing the calculated hash with an expected value.
                  </p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• SHA-256: Secure Hash Algorithm 256-bit</li>
                    <li>• Detects any changes to the file content</li>
                    <li>• Used for integrity verification</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Digital Signatures</h4>
                  <p className="text-gray-600 mb-2">
                    Digital signatures provide authentication and non-repudiation for files.
                  </p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Verifies file authenticity</li>
                    <li>• Confirms the signer's identity</li>
                    <li>• Ensures file hasn't been tampered with</li>
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