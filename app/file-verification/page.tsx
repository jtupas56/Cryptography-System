"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { Trash2 } from "lucide-react"

function bytesToHex(buffer: ArrayBuffer) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x: number) => ("00" + x.toString(16)).slice(-2))
    .join("")
}

function getCurrentTimestamp() {
  const now = new Date()
  const pad = (n: number) => n.toString().padStart(2, "0")
  return `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}

// localStorage functions
const saveRecordsToStorage = (records: Array<{ time: string; file: string; hash: string }>) => {
  try {
    localStorage.setItem('hashRecords', JSON.stringify(records))
  } catch (error) {
    console.error('Error saving records:', error)
  }
}

const loadRecordsFromStorage = (): Array<{ time: string; file: string; hash: string }> => {
  try {
    const stored = localStorage.getItem('hashRecords')
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading records:', error)
    return []
  }
}

export default function FileVerificationPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [hashValue, setHashValue] = useState("")
  const [records, setRecords] = useState<Array<{ time: string; file: string; hash: string }>>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load existing records on component mount
  useEffect(() => {
    const loadedRecords = loadRecordsFromStorage()
    setRecords(loadedRecords)
  }, [])

  const handleChooseFile = (e: any) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)
    setFileName(file ? file.name : "")
    setHashValue("")
    setHighlightedIndex(null)
  }

  const handleHashFile = async () => {
    if (!selectedFile) {
      toast({ title: "Error", description: "Please select a file", variant: "destructive" })
      return
    }
    try {
      const arrayBuffer = await selectedFile.arrayBuffer()
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", arrayBuffer)
      setHashValue(bytesToHex(hashBuffer))
      // Reset file input so it shows 'No file chosen'
      if (fileInputRef.current) fileInputRef.current.value = ""
    } catch {
      toast({ title: "Error", description: "Failed to hash file", variant: "destructive" })
    }
  }

  const handleVerifyFile = async () => {
    if (!selectedFile) {
      toast({ title: "Error", description: "Please select a file", variant: "destructive" })
      return
    }
    if (!hashValue) {
      toast({ title: "Error", description: "Please provide a hash first", variant: "destructive" })
      return
    }
    try {
      const arrayBuffer = await selectedFile.arrayBuffer()
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", arrayBuffer)
      const currentHash = bytesToHex(hashBuffer)
      const now = new Date()
      const timestamp = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
      if (records.some(r => r.hash === currentHash)) {
        toast({ title: "Info", description: "This hash has already been verified!" })
        return
      }
      if (hashValue === currentHash) {
        const newRecord = { time: timestamp, file: selectedFile.name, hash: currentHash }
        const updatedRecords = [...records, newRecord]
        setRecords(updatedRecords)
        // Save to localStorage
        saveRecordsToStorage(updatedRecords)
        toast({ title: "Success", description: "The File verification successful" })
      } else {
        toast({ title: "Failed", description: "The File verification failed", variant: "destructive" })
      }
    } catch {
      toast({ title: "Error", description: "Failed to verify file", variant: "destructive" })
    }
  }

  const handleDeleteRecord = (index: number) => {
    const updatedRecords = records.filter((_, i) => i !== index)
    setRecords(updatedRecords)
    saveRecordsToStorage(updatedRecords)
    setHighlightedIndex(null)
    toast({ title: "Success", description: "Record deleted successfully" })
  }

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast({ title: "Error", description: "Please enter a file name to search", variant: "destructive" })
      return
    }
    const idx = records.findIndex(r => r.file.toLowerCase() === searchTerm.trim().toLowerCase())
    if (idx !== -1) setHighlightedIndex(idx)
    else {
      setHighlightedIndex(null)
      toast({ title: "Not found", description: "No record found for that file name" })
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

          <div className="flex flex-col items-center w-full min-h-screen py-12 relative z-10">
            <div className="w-full max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent mb-6">File Verification</h1>
              </div>

              <div className="flex flex-col md:flex-row gap-12 justify-center items-stretch mb-16">
                <div className="flex-1 flex flex-col">
                  <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                      <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg flex items-center justify-center">
                          📁
                        </div>
                        Choose File
                      </CardTitle>
                      <CardDescription className="text-gray-600 text-lg">Select a file to verify</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6 justify-end flex-1 p-8">
                      {/* Move file input and button to the bottom */}
                      <div className="flex flex-col gap-6 mt-auto">
                        <div className="space-y-3">
                          <Label htmlFor="file-upload" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Choose file</Label>
                          <Input
                            id="file-upload"
                            type="file"
                            onChange={handleChooseFile}
                            ref={fileInputRef}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                        <button onClick={handleHashFile} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl px-8 py-6 text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/20">Hash File (SHA-256)</button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex-1 flex flex-col">
                  <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                      <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-lg flex items-center justify-center">
                          🔍
                        </div>
                        Hash Value
                      </CardTitle>
                      <CardDescription className="text-gray-600 text-lg">SHA-256 hash of the selected file</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6 p-8">
                      <div className="space-y-3">
                        <Label htmlFor="hash-value" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Hash Value</Label>
                        <Input
                          id="hash-value"
                          value={hashValue}
                          readOnly
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background font-mono placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Hash will appear here..."
                        />
                      </div>
                      <button onClick={handleVerifyFile} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl px-8 py-6 text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/20">Verify File</button>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="mb-12">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                  <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-lg flex items-center justify-center">
                        📋
                      </div>
                      Hash Records
                    </CardTitle>
                    {/* Search input and button at top right */}
                    <div className="flex flex-row items-center gap-3 ml-auto">
                      <Label htmlFor="search-file" className="sr-only">Search File Name:</Label>
                      <Input
                        id="search-file"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="max-w-xs flex-1 border-2 border-gray-200 focus:border-purple-500 focus:ring-0 rounded-xl"
                        placeholder="Search File Name"
                      />
                      <button onClick={handleSearch} className="bg-white text-purple-700 font-semibold rounded-xl px-6 py-3 border-2 border-purple-200 transition-all duration-300 hover:bg-purple-50 hover:shadow-lg focus:outline-none whitespace-nowrap">Search</button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-80 overflow-y-auto border border-gray-200 rounded-b-2xl bg-white">
                      <Table>
                        <TableHeader className="bg-gray-50/80 sticky top-0 z-10">
                          <TableRow className="border-b border-gray-200">
                            <TableHead className="font-bold text-gray-900 py-4 px-4 w-32">Time</TableHead>
                            <TableHead className="font-bold text-gray-900 py-4 px-4 w-48">File</TableHead>
                            <TableHead className="font-bold text-gray-900 py-4 px-4 w-96">Hash</TableHead>
                            <TableHead className="font-bold text-gray-900 py-4 px-4 w-20">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {records.map((rec, idx) => (
                            <TableRow key={idx} className={`${highlightedIndex === idx ? "bg-blue-100/50" : "hover:bg-gray-50"} transition-colors border-b border-gray-100`}>
                              <TableCell className="py-3 px-4 text-gray-700 text-sm w-32">{rec.time}</TableCell>
                              <TableCell className="py-3 px-4 text-gray-900 font-medium text-sm w-48 truncate" title={rec.file}>{rec.file}</TableCell>
                              <TableCell className="font-mono text-xs py-3 px-4 text-gray-600 w-96 break-all">{rec.hash}</TableCell>
                              <TableCell className="py-3 px-4 w-20">
                                <button
                                  onClick={() => handleDeleteRecord(idx)}
                                  className="h-8 w-8 p-0 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-110 focus:outline-none flex items-center justify-center group"
                                >
                                  <Trash2 className="h-3 w-3 group-hover:scale-110 transition-transform" />
                                </button>
                              </TableCell>
                            </TableRow>
                          ))}
                          {records.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={4} className="py-8 text-center text-gray-500">
                                No hash records found. Verify a file to create your first record.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  )
} 