import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

function CategorySelect() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Select a Category</h2>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="terracotta">Terracotta Ornaments & Home Décor</SelectItem>
          <SelectItem value="macrame">Macrame Based Handicraft</SelectItem>
          <SelectItem value="moonj">Moonj Based Handicrafts</SelectItem>
          <SelectItem value="banana-fiber">Banana Fiber based ornaments & Home Décor</SelectItem>
          <SelectItem value="jute">Jute Bags & Allied Products</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default function Component() {
  return (
    <div>
      <header className="bg-red-500 py-4 text-white text-center font-bold text-2xl">JPMMSSS</header>
      <div className="flex justify-center items-center h-[calc(100vh-6rem)]">
        
      </div>
    </div>
  )
}