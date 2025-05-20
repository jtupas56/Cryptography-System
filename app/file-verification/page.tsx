"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function FileVerificationPage() {
  const [fileName, setFileName] = useState("No File Chosen")

  return (
    <div className="container mx-auto py-8">
      <Card className="mx-auto max-w-3xl border border-gray-200 p-8 shadow-sm">
        <h1 className="mb-8 text-3xl font-bold">File Verification</h1>

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
          <div id="hash-value" className="h-16 rounded-md border border-gray-300 bg-white p-4 text-black"></div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-black text-white hover:bg-gray-800">Check File</Button>
        </div>
      </Card>

      {/* Hash Records Section */}
      <Card className="mx-auto mt-8 max-w-3xl border border-gray-200 p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">Hash Records</h2>

        <div className="mb-6 rounded-md border border-gray-200">
          <div className="overflow-hidden rounded-t-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="w-1/4 font-bold">Time</TableHead>
                  <TableHead className="w-1/3 font-bold">File</TableHead>
                  <TableHead className="font-bold">Hash</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </div>
          <div className="max-h-60 overflow-y-auto">
            <Table>
              <TableBody>
                {Array.from({ length: 15 }).map((_, index) => (
                  <TableRow
                    key={index}
                    className={`border-t border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <TableCell className="text-gray-500">2023-05-{String(index + 1).padStart(2, "0")} 14:30</TableCell>
                    <TableCell className="text-gray-500">document-{index + 1}.pdf</TableCell>
                    <TableCell className="text-gray-500">8a7b9c6d5e4f3g2h1i0j{index}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
