"use client"

import { useState, useMemo, ChangeEvent } from "react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/ui/pagination"

interface Product {
  skuId: string
  quantity: number
}

interface DataItem {
  userId: number
  email: string
  username: string
  products: Product[]
  assignedTo: string
  status: string
}

interface SelectedProducts {
  [userId: number]: { [skuId: string]: Product }
}

interface SelectedStatus {
  [userId: number]: string
}

interface SelectedAssignedTo {
  [userId: number]: string
}

export default function Component() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setCurrentPage(1)
  }

  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts>({})

  const handleProductChange = (userId: number, products: { [skuId: string]: Product }) => {
    setSelectedProducts((prevState) => ({
      ...prevState,
      [userId]: products,
    }))
  }

  const filteredData: DataItem[] = useMemo(() => {
    return [
      {
        userId: 1234,
        email: "john@example.com",
        username: "johndoe",
        products: [
          { skuId: "SKU001", quantity: 3 },
          { skuId: "SKU002", quantity: 2 },
        ],
        assignedTo: "Jane Smith",
        status: "Pending",
      },
      {
        userId: 5678,
        email: "jane@example.com",
        username: "janesmith",
        products: [
          { skuId: "SKU003", quantity: 5 },
          { skuId: "SKU004", quantity: 5 },
        ],
        assignedTo: "Bob Johnson",
        status: "Accepted",
      },
      {
        userId: 9012,
        email: "bob@example.com",
        username: "bobjohnson",
        products: [{ skuId: "SKU005", quantity: 3 }],
        assignedTo: "Sarah Lee",
        status: "Rejected",
      },
      {
        userId: 3456,
        email: "sarah@example.com",
        username: "sarahlee",
        products: [
          { skuId: "SKU006", quantity: 4 },
          { skuId: "SKU007", quantity: 4 },
        ],
        assignedTo: "Tom Wilson",
        status: "Pending",
      },
      {
        userId: 7890,
        email: "tom@example.com",
        username: "tomwilson",
        products: [{ skuId: "SKU008", quantity: 2 }],
        assignedTo: "John Doe",
        status: "Accepted",
      },
    ].filter((item) => {
      return (
        item.userId.toString().includes(searchQuery) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.products.some(
          (product) => product.skuId.includes(searchQuery) || product.quantity.toString().includes(searchQuery),
        ) ||
        item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
  }, [searchQuery])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const [selectedStatus, setSelectedStatus] = useState<SelectedStatus>({})
  const handleStatusChange = (userId: number, status: string) => {
    setSelectedStatus((prevState) => ({
      ...prevState,
      [userId]: status,
    }))
  }

  const [selectedAssignedTo, setSelectedAssignedTo] = useState<SelectedAssignedTo>({})
  const handleAssignedToChange = (userId: number, assignedTo: string) => {
    setSelectedAssignedTo((prevState) => ({
      ...prevState,
      [userId]: assignedTo,
    }))
  }

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md">
      <header className="bg-gray-100 dark:bg-gray-800 p-4 flex items-center justify-between">
        <a href = "order_request"><h1>Order Requests</h1></a>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="bg-white dark:bg-gray-950 rounded-md pl-10 pr-4 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          />
        </div>
      </header>
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Products Requirements</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.userId}>
                <TableCell>{item.userId}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>
                  {item.products.map((product, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span>{product.skuId}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            {selectedProducts[item.userId]?.[product.skuId]?.quantity || product.quantity}
                            <ChevronDownIcon className="w-4 h-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48">
                          {[1, 2, 3, 4, 5].map((qty) => (
                            <DropdownMenuItem
                              key={qty}
                              onClick={() =>
                                handleProductChange(item.userId, {
                                  ...selectedProducts[item.userId],
                                  [product.skuId]: { skuId: product.skuId, quantity: qty },
                                })
                              }
                            >
                              {qty}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        {selectedAssignedTo[item.userId] || item.assignedTo}
                        <ChevronDownIcon className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem onClick={() => handleAssignedToChange(item.userId, "Jane Smith")}>
                        Jane Smith
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAssignedToChange(item.userId, "Bob Johnson")}>
                        Bob Johnson
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAssignedToChange(item.userId, "Sarah Lee")}>
                        Sarah Lee
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAssignedToChange(item.userId, "Tom Wilson")}>
                        Tom Wilson
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAssignedToChange(item.userId, "John Doe")}>
                        John Doe
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAssignedToChange(item.userId, "Admin")}>
                        Admin
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        {selectedStatus[item.userId] || item.status}
                        <ChevronDownIcon className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem onClick={() => handleStatusChange(item.userId, "Pending")}>
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(item.userId, "Accepted")}>
                        Accepted
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(item.userId, "Rejected")}>
                        Rejected
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-center mt-4">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  )
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
  )
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}