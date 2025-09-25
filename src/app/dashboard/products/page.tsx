import Image from "next/image"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/data"
import { placeholderImages } from "@/lib/placeholder-images.json"

export default function DashboardProducts() {
    const vendorProducts = products.filter(p => p.vendorId === 'vendor-2'); // Mock

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                Manage your products and view their sales performance.
                </CardDescription>
            </div>
            <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                </span>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Sales
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendorProducts.map(product => {
                const productImage = placeholderImages.find(p => p.id === product.imageUrl);
                return (
                    <TableRow key={product.id}>
                        <TableCell className="hidden sm:table-cell">
                            {productImage && 
                                <Image
                                    alt={product.name}
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={productImage.imageUrl}
                                    width="64"
                                    data-ai-hint={productImage.imageHint}
                                />
                            }
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                            <Badge variant="outline">Active</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">Kes {product.price.toFixed(2)}</TableCell>
                        <TableCell className="hidden md:table-cell">25</TableCell>
                        <TableCell>
                            <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                    </TableRow>
                )
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-2</strong> of <strong>2</strong> products
        </div>
      </CardFooter>
    </Card>
  )
}
