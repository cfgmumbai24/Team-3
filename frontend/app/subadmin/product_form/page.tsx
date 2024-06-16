import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const Component: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen px-4 md:px-6 py-8">
      <header className="py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4" />
        </div>
      </header>
      <main className="flex-1 py-8">
        <div className="container mx-auto">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="size">Size</Label>
                      <Input id="size" placeholder="Enter size" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="color">Color</Label>
                      <Input id="color" placeholder="Enter color" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" placeholder="Enter quantity" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Enter product description" />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
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

export default Component;

