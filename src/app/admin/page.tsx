import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from "@/components/ui/table"
  import { DollarSign, Users, Package, Activity } from 'lucide-react';
  
  export default function AdminDashboard() {
    return (
      <div className="space-y-6">
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Kes 1,245,231.89</div>
                <p className="text-xs text-muted-foreground">
                +25.1% from last month
                </p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                Total Vendors
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+250</div>
                <p className="text-xs text-muted-foreground">
                +18 from last month
                </p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                +1900 from last month
                </p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Live Carts</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+1573</div>
                <p className="text-xs text-muted-foreground">
                +201 since last hour
                </p>
            </CardContent>
            </Card>
      </div>
  
        <Card>
          <CardHeader>
            <CardTitle>Recent Marketplace Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Fashion Forward</div>
                  </TableCell>
                  <TableCell>New Product Listing</TableCell>
                  <TableCell>Kes 75.00</TableCell>
                  <TableCell className="text-right">2023-06-23</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell>
                    <div className="font-medium">Tech Innovators Inc.</div>
                  </TableCell>
                  <TableCell>Order #3210</TableCell>
                  <TableCell>Kes 350.00</TableCell>
                  <TableCell className="text-right">2023-06-23</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Cozy Home Creations</div>
                  </TableCell>
                  <TableCell>Payout Processed</TableCell>
                  <TableCell className="text-destructive">-Kes 1,200.00</TableCell>
                  <TableCell className="text-right">2023-06-22</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Tradinta Warehouse</div>
                  </TableCell>
                  <TableCell>Order #3209</TableCell>
                  <TableCell>Kes 450.00</TableCell>
                  <TableCell className="text-right">2023-06-22</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }
  