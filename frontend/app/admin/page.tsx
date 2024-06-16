"use client"

import { useState, ChangeEvent } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

// Define types for the sub-admins and selected options
interface SubAdmin {
  id: number
  name: string
}

export default function Component() {
  const [newCategory, setNewCategory] = useState<string>("")
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Bob Johnson" },
  ])
  const [selectedSubAdmin, setSelectedSubAdmin] = useState<SubAdmin | null>(null)
  const [categories, setCategories] = useState<string[]>([
    "Terracotta Ornaments & Home Décor",
    "Macrame Based Handicraft",
    "Moonj Based Handicrafts",
    "Banana Fiber based ornaments & Home Décor",
    "Jute Bags & Allied Products",
  ])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory.trim()])
      setNewCategory("")
    }
  }

  const handleDeleteSubAdmin = () => {
    if (selectedSubAdmin) {
      setSubAdmins(subAdmins.filter((admin) => admin.id !== selectedSubAdmin.id))
      setSelectedSubAdmin(null)
    }
  }

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      setCategories(categories.filter((cat) => cat !== selectedCategory))
      setSelectedCategory(null)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="bg-[#0077b6] shadow-md py-4 px-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center text-white">
            <Link href="/admin/order_request" className="text-white hover:text-gray-200 mr-6 text-xl font-bold" prefetch={false}>
              Order Request
            </Link>
            <Link href="/admin/inventory_updates" className="text-white hover:text-gray-200 mr-6 text-xl font-bold" prefetch={false}>
              Inventory Updation
            </Link>
            <Link href="#" className="text-white hover:text-gray-200 text-2xl font-bold" prefetch={false}>
              Master Control
            </Link>

          </div>
        </nav>
      </header>
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4 text-[#0077b6]">Add New Category</h2>
            <div className="flex items-center mb-4">
              <Input
                type="text"
                placeholder="Enter new category name"
                value={newCategory}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value)}
                className="flex-1 mr-4"
              />
              <Button
                onClick={handleAddCategory}
                className="bg-[#0077b6] text-white hover:bg-[#005a8d] dark:bg-[#0077b6] dark:text-white dark:hover:bg-[#005a8d]"
              >
                Add
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4 text-[#0077b6]">Delete Sub-Admin</h2>
            <div className="mb-4">
              <Select
                value={selectedSubAdmin?.id.toString() || ""}
                className="w-full"
                onValueChange={(id) => setSelectedSubAdmin(subAdmins.find((admin) => admin.id === Number(id)) || null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sub-admin" />
                </SelectTrigger>
                <SelectContent>
                  {subAdmins.map((admin) => (
                    <SelectItem key={admin.id} value={admin.id.toString()}>
                      {admin.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedSubAdmin && (
              <div>
                <p className="mb-4">
                  You are about to delete sub-admin:{" "}
                  <strong className="text-[#0077b6] mr-2">{selectedSubAdmin.name}</strong>
                </p>
                <div className="flex justify-end">
                  <Button variant="outline" className="mr-2">
                    View
                  </Button>
                  <Button
                    onClick={handleDeleteSubAdmin}
                    className="bg-[#0077b6] text-white hover:bg-[#005a8d] dark:bg-[#0077b6] dark:text-white dark:hover:bg-[#005a8d]"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4 text-[#0077b6]">Delete Existing Category</h2>
            <div className="mb-4">
              <Select value={selectedCategory || ""} className="w-full" onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedCategory && (
              <div>
                <p className="mb-4">
                  You are about to delete category: <strong className="text-[#0077b6] mr-2">{selectedCategory}</strong>
                </p>
                <div className="flex justify-end">
                  <Button
                    onClick={handleDeleteCategory}
                    className="bg-[#0077b6] text-white hover:bg-[#005a8d] dark:bg-[#0077b6] dark:text-white dark:hover:bg-[#005a8d]"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}