"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function HashRecordsTable() {
  return (
    <div className="rounded-md border border-gray-200">
      <div className="overflow-hidden rounded-t-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-1/4 font-medium">Time</TableHead>
              <TableHead className="w-1/3 font-medium">File</TableHead>
              <TableHead className="font-medium">Hash</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
      <div className="max-h-80 overflow-y-auto">
        <Table>
          <TableBody>
            {Array.from({ length: 15 }).map((_, index) => (
              <TableRow
                key={index}
                className={`border-t border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <TableCell className="text-gray-600">2023-05-{String(index + 1).padStart(2, "0")} 14:30</TableCell>
                <TableCell className="text-gray-600">document-{index + 1}.pdf</TableCell>
                <TableCell className="font-mono text-sm text-gray-600">8a7b9c6d5e4f3g2h1i0j{index}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
