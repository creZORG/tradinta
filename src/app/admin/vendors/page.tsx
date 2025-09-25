import Image from "next/image"
import { MoreHorizontal, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { vendors } from "@/lib/data"
import { placeholderImages } from "@/lib/placeholder-images.json"

export default function AdminVendors() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>Vendors</CardTitle>
                <CardDescription>
                    Manage all vendors in the marketplace.
                </CardDescription>
            </div>
            <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Vendor
                </span>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Logo</span>
              </TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Total Sales</TableHead>
              <TableHead className="hidden md:table-cell">
                Commission
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map(vendor => {
                const vendorLogo = placeholderImages.find(p => p.id === vendor.logoUrl.split('/').pop());
                return (
                    <TableRow key={vendor.id}>
                        <TableCell className="hidden sm:table-cell">
                            {vendorLogo && 
                                <Image
                                    alt={vendor.name}
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={vendorLogo.imageUrl}
                                    width="64"
                                    data-ai-hint={vendorLogo.imageHint}
                                />
                            }
                        </TableCell>
                        <TableCell className="font-medium">{vendor.name}</TableCell>
                        <TableCell>
                            <Badge variant="outline">Active</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">Kes {(vendor.reviewCount * 123.45).toLocaleString()}</TableCell>
                        <TableCell className="hidden md:table-cell">Kes {(vendor.reviewCount * 123.45 * 0.1).toLocaleString()}</TableCell>
                        <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                                >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Storefront</DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Suspend</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
