"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import HashRecordsTable from "@/components/hash-records-table"

export default function FileVerificationPage() {
  const [fileName, setFileName] = useState("No File Chosen")

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">File Verification</h1>
        <p className="mt-2 text-gray-600">Verify the integrity of your files with SHA-256 hashing.</p>
      </div>

      <Card className="mb-8 border border-gray-200 p-6 shadow-sm">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="border-gray-300 bg-white hover:bg-gray-50"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              Choose File
            </Button>
            <span className="text-gray-500">{fileName}</span>
            <input
              id="file-input"
              type="file"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFileName(e.target.files[0].name)
                }
              }}
            />
          </div>

          <Button variant="outline" className="border-gray-300 bg-white hover:bg-gray-50">
            SHA-256
          </Button>
        </div>

        <div className="mb-8 space-y-2">
          <Label htmlFor="hash-value">Hash Value</Label>
          <div id="hash-value" className="h-16 rounded-md border border-gray-200 bg-white p-4 text-black"></div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-black text-white hover:bg-gray-800">Check File</Button>
        </div>
      </Card>

      {/* Hash Records Section */}
      <Card className="border border-gray-200 p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">Hash Records</h2>

        <div className="mb-6">
          <HashRecordsTable />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="search-file" className="whitespace-nowrap">
              Search File Name:
            </Label>
            <Input id="search-file" className="w-64" />
          </div>
          <Button className="bg-black text-white hover:bg-gray-800">Search</Button>
        </div>
      </Card>
    </div>
  )
}
