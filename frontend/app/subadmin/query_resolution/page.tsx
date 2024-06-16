"use client"

import { useState, ChangeEvent } from "react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface QueryData {
  userId: string
  email: string
  sku: string[]
  quantityAssigned: number
  approved: string
}

type ApprovalStatus = Record<string, string>
type SkuOptions = Record<string, string>
type QuantityOptions = Record<string, string>

export default function Component() {
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>({})
  const [skuOptions, setSkuOptions] = useState<SkuOptions>({})
  const [quantityOptions, setQuantityOptions] = useState<QuantityOptions>({})

  const handleApprovalChange = (userId: string, value: string) => {
    setApprovalStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: value,
    }))
  }

  const handleSkuChange = (userId: string, value: string) => {
    setSkuOptions((prevOptions) => ({
      ...prevOptions,
      [userId]: value,
    }))
  }

  const handleQuantityChange = (userId: string, value: string) => {
    setQuantityOptions((prevOptions) => ({
      ...prevOptions,
      [userId]: value,
    }))
  }

  const queryData: QueryData[] = [
    { userId: "U001", email: "john@example.com", sku: ["SKU001", "SKU002"], quantityAssigned: 10, approved: "No" },
    { userId: "U002", email: "jane@example.com", sku: ["SKU002"], quantityAssigned: 5, approved: "Yes" },
    {
      userId: "U003",
      email: "bob@example.com",
      sku: ["SKU003", "SKU004", "SKU005"],
      quantityAssigned: 15,
      approved: "No",
    },
    { userId: "U004", email: "sarah@example.com", sku: ["SKU004"], quantityAssigned: 8, approved: "Yes" },
    { userId: "U005", email: "tom@example.com", sku: ["SKU005"], quantityAssigned: 12, approved: "No" },
  ]

  return (
    <div className="container mx-auto py-8 font-sans">
      <div className="bg-blue-100 rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-blue-800">Query Resolution</h1>
      </div>
      <div className="border rounded-lg overflow-hidden bg-white p-6">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-800 px-4 font-family[Roboto] text-2xl font-bold text-left">UserId</TableHead>
              <TableHead className="text-blue-800 px-4 font-family[Roboto] text-2xl font-bold text-left">Email</TableHead>
              <TableHead className="text-blue-800 px-4 font-family[Roboto] text-2xl font-bold text-left">SKU</TableHead>
              <TableHead className="text-blue-800 px-4 font-family[Roboto] text-2xl font-bold text-left">Quantity Assigned</TableHead>
              <TableHead className="text-blue-800 px-4 font-family[Roboto] text-2xl font-bold text-left">Approved</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queryData.map((query) => (
              <TableRow key={query.userId} className="text-center font-family[Roboto] text-2xl">
                <TableCell className="px-4 text-left">{query.userId}</TableCell>
                <TableCell className="px-4 text-left">
                  <a href="#" className="text-blue-500 hover:underline">
                    {query.email}
                  </a>
                </TableCell>
                <TableCell className="px-4 text-left">
                  <Select
                    value={skuOptions[query.userId] || query.sku[0]}
                    onValueChange={(value) => handleSkuChange(query.userId, value)}
                    className="text-black"
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue
                        placeholder="Select"
                        className="text-black font-family[Roboto] text-2xl text-center"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {query.sku.map((sku) => (
                        <SelectItem key={sku} value={sku} className="text-black font-family[Roboto] text-2xl">
                          {sku}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="px-4 text-left">
                  <Input
                    type="number"
                    value={quantityOptions[query.userId] || query.quantityAssigned.toString()}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleQuantityChange(query.userId, e.target.value)}
                    className="text-black w-24 text-center font-family[Roboto] text-2xl"
                  />
                </TableCell>
                <TableCell className="px-4 text-left">
                  <Select
                    value={approvalStatus[query.userId] || query.approved}
                    onValueChange={(value) => handleApprovalChange(query.userId, value)}
                    className="text-black"
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue
                        placeholder="Select"
                        className="text-black font-family[Roboto] text-2xl text-center"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes" className="text-black font-family[Roboto] text-2xl">
                        Yes
                      </SelectItem>
                      <SelectItem value="No" className="text-black font-family[Roboto] text-2xl">
                        No
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}