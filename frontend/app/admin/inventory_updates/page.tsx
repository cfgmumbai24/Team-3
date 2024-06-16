/**
 * v0 by Vercel.
 * @see https://v0.dev/t/d150LgK5kKO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface Product {
  id: string;
  category: string;
  productId: string;
}

interface Quantities {
  [key: string]: number;
}

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Quantities>({
    SKU001: 1,
    SKU002: 1,
    SKU003: 1,
    SKU004: 1,
    SKU005: 1,
  });

  const products: Product[] = [
    {
      id: "SKU001",
      category: "Terracotta ornaments and home decor",
      productId: "C001",
    },
    {
      id: "SKU002",
      category: "Macrame based handicraft",
      productId: "C002",
    },
    {
      id: "SKU003",
      category: "Moonj based handicraft",
      productId: "C003",
    },
    {
      id: "SKU004",
      category: "Banana fiber based ornaments and home decor",
      productId: "C004",
    },
    {
      id: "SKU005",
      category: "Jute bags and allied products",
      productId: "C005",
    },
  ];

  const filteredProducts: Product[] = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleQuantityChange = (sku: string, change: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [sku]: prevQuantities[sku] + change,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen px-4 md:px-6 py-8">
      <header className="py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-blue-800">Inventory Updation</h1>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Categories
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuItem
                  onSelect={() =>
                    setSelectedCategory("Terracotta ornaments and home decor")
                  }
                >
                  Terracotta ornaments and home decor
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setSelectedCategory("Macrame based handicraft")}
                >
                  Macrame based handicraft
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setSelectedCategory("Moonj based handicraft")}
                >
                  Moonj based handicraft
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    setSelectedCategory(
                      "Banana fiber based ornaments and home decor"
                    )
                  }
                >
                  Banana fiber based ornaments and home decor
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    setSelectedCategory("Jute bags and allied products")
                  }
                >
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
                <TableHead className="text-blue-800">SKU ID</TableHead>
                <TableHead className="text-blue-800">Category</TableHead>
                <TableHead className="text-blue-800">Product ID</TableHead>
                <TableHead className="text-blue-800">Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.productId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(product.id, -1)}
                        disabled={quantities[product.id] <= 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span>{quantities[product.id]}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(product.id, 1)}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 My Ecommerce Site. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
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
  );
}

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
