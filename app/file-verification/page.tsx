"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

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

export default function FileVerificationPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [hashValue, setHashValue] = useState("")
  const [records, setRecords] = useState<Array<{ time: string; file: string; hash: string }>>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      const timestamp = `${now.getDate().toString().padStart(2,"0")}/${(now.getMonth()+1).toString().padStart(2,"0")}/${now.getFullYear()} ${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}:${now.getSeconds().toString().padStart(2,"0")}`
      if (records.some(r => r.hash === currentHash)) {
        toast({ title: "Info", description: "This hash has already been verified!" })
        return
      }
      if (hashValue === currentHash) {
        setRecords([...records, { time: timestamp, file: selectedFile.name, hash: currentHash }])
        toast({ title: "Success", description: "The File verification successful" })
      } else {
        toast({ title: "Failed", description: "The File verification failed", variant: "destructive" })
      }
    } catch {
      toast({ title: "Error", description: "Failed to verify file", variant: "destructive" })
    }
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
    <div className="flex flex-col items-center w-full min-h-screen py-8">
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">File Verification</h1>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mb-10">
          <div className="flex-1 flex flex-col">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Choose File</CardTitle>
                <CardDescription>Select a file to verify</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 justify-end flex-1">
                {/* Move file input and button to the bottom */}
                <div className="flex flex-col gap-4 mt-auto">

                  <Input id="file-upload" type="file" onChange={handleChooseFile} ref={fileInputRef} />
                  <Button onClick={handleHashFile} className="w-full">Hash File (SHA-256)</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1 flex flex-col">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Hash Value</CardTitle>
                <CardDescription>SHA-256 hash of the selected file</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Input id="hash-value" value={hashValue} readOnly className="font-mono" />
                <Button onClick={handleVerifyFile} className="w-full">Verify File</Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mb-8">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Hash Records</CardTitle>
              {/* Search input and button at top right */}
              <div className="flex flex-row items-center gap-2 ml-auto">
                <Label htmlFor="search-file" className="sr-only">Search File Name:</Label>
                <Input
                  id="search-file"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="max-w-xs flex-1"
                  placeholder="Search File Name"
                />
                <Button onClick={handleSearch}>Search</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>File</TableHead>
                    <TableHead>Hash</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((rec, idx) => (
                    <TableRow key={idx} className={highlightedIndex === idx ? "bg-blue-100" : ""}>
                      <TableCell>{rec.time}</TableCell>
                      <TableCell>{rec.file}</TableCell>
                      <TableCell className="font-mono text-xs break-all">{rec.hash}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 