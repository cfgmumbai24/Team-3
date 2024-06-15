import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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
  );
};

const Component: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen px-4 md:px-6 py-8">
      <header className="py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Removed Home, About, and Wishlist links */}
          </div>
          <div className="flex items-center gap-4">
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
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="/placeholder.svg" alt={`Product ${index + 1}`} width={400} height={300} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">{`Product ${index + 1}`}</h3>
                <Button variant="outline" size="sm" className="w-full">
                  Add to Wishlist
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 My Ecommerce Site. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Component;
export { ChevronDownIcon };
    