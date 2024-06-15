/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LVxFynv94Ji
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen px-4 md:px-6 py-8">
      <header className="py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="#" className="text-lg font-bold text-black" prefetch={false}>
              Home
            </Link>
            <Link href="#" className="text-lg font-bold text-black" prefetch={false}>
              About
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-lg font-bold text-black" prefetch={false}>
              Wishlist
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Categories
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Terracotta ornaments and home decor</DropdownMenuItem>
                <DropdownMenuItem>Macrame based handicraft</DropdownMenuItem>
                <DropdownMenuItem>Moonj based handicraft</DropdownMenuItem>
                <DropdownMenuItem>Banana fiber based ornaments and home decor</DropdownMenuItem>
                <DropdownMenuItem>Jute bags and allied products</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 py-8">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/placeholder.svg" alt="Product 1" width={400} height={300} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">Product 1</h3>
              <Button variant="outline" size="sm" className="w-full">
                Add to Wishlist
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/placeholder.svg" alt="Product 2" width={400} height={300} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">Product 2</h3>
              <Button variant="outline" size="sm" className="w-full">
                Add to Wishlist
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/placeholder.svg" alt="Product 3" width={400} height={300} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">Product 3</h3>
              <Button variant="outline" size="sm" className="w-full">
                Add to Wishlist
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/placeholder.svg" alt="Product 4" width={400} height={300} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">Product 4</h3>
              <Button variant="outline" size="sm" className="w-full">
                Add to Wishlist
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/placeholder.svg" alt="Product 5" width={400} height={300} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">Product 5</h3>
              <Button variant="outline" size="sm" className="w-full">
                Add to Wishlist
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/placeholder.svg" alt="Product 6" width={400} height={300} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">Product 6</h3>
              <Button variant="outline" size="sm" className="w-full">
                Add to Wishlist
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/placeholder.svg" alt="Product 7" width={400} height={300} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">Product 7</h3>
              <Button variant="outline" size="sm" className="w-full">
                Add to Wishlist
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/placeholder.svg" alt="Product 8" width={400} height={300} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">Product 8</h3>
              <Button variant="outline" size="sm" className="w-full">
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 My Ecommerce Site. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function ChevronDownIcon(props) {
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