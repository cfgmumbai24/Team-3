"use client"

import { useState } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface Product {
  id: string
  category: string
  productId: string
  imageUrl: string
}

interface ChevronDownIconProps extends React.SVGProps<SVGSVGElement> {}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

const Component: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showImageModal, setShowImageModal] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const products: Product[] = [
    {
      id: "SKU001",
      category: "Terracotta ornaments and home decor",
      productId: "C001",
      imageUrl: "/placeholder.svg",
    },
    {
      id: "SKU002",
      category: "Macrame based handicraft",
      productId: "C002",
      imageUrl: "/placeholder.svg",
    },
    {
      id: "SKU003",
      category: "Moonj based handicraft",
      productId: "C003",
      imageUrl: "/placeholder.svg",
    },
    {
      id: "SKU004",
      category: "Banana fiber based ornaments and home decor",
      productId: "C004",
      imageUrl: "/placeholder.svg",
    },
    {
      id: "SKU005",
      category: "Jute bags and allied products",
      productId: "C005",
      imageUrl: "/placeholder.svg",
    },
  ]

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products

  return (
    <div className="flex flex-col min-h-screen px-4 md:px-6 py-8">
      <header className="py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4" />
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Categories
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuItem onSelect={() => setSelectedCategory("Terracotta ornaments and home decor")}>
                  Terracotta ornaments and home decor
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedCategory("Macrame based handicraft")}>
                  Macrame based handicraft
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedCategory("Moonj based handicraft")}>
                  Moonj based handicraft
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedCategory("Banana fiber based ornaments and home decor")}>
                  Banana fiber based ornaments and home decor
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedCategory("Jute bags and allied products")}>
                  Jute bags and allied products
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 py-8">
        <div className="container mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Product ID</TableHead>
                <TableHead>Image</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.productId}</TableCell>
                  <TableCell>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSelectedImage(product.imageUrl)
                        setShowImageModal(true)
                      }}
                    >
                      <img
                        src={product.imageUrl}
                        alt={`Product ${product.id}`}
                        width={50}
                        height={50}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      {showImageModal && selectedImage && (
        <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
          <DialogContent className="max-w-[50vw]">
            <div className="flex flex-col items-center">
              <img
                src={selectedImage}
                alt="Product Image"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
              />
              <div className="flex justify-end w-full mt-4">
                <Button variant="outline" className="mr-2">
                  Reject
                </Button>
                <Button>Accept</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <footer className="bg-gray-900 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 My Ecommerce Site. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Component
export { ChevronDownIcon }
