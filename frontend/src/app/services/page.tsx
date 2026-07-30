"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Package, Bike, Truck as TruckIcon, Globe, MapPin, Search } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-[80vh]">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary mb-4">Our Delivery Services</h1>
        <p className="text-muted-foreground text-lg">From small documents to large freight, we have the right vehicle and team to handle your delivery.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="border-none shadow-lg hover:shadow-xl transition-all">
          <CardHeader>
             <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mb-4">
                <Bike className="w-6 h-6 text-primary" />
             </div>
            <CardTitle>Motorbike Delivery</CardTitle>
            <CardDescription>Perfect for small parcels and documents</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Navigate through traffic quickly. Best for same-day urgent deliveries under 20kg.</p>
            <Link href="/book"><Button variant="outline" className="w-full">Book Motorbike</Button></Link>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg hover:shadow-xl transition-all">
          <CardHeader>
             <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mb-4">
                <TruckIcon className="w-6 h-6 text-primary" />
             </div>
            <CardTitle>Van & Pickup</CardTitle>
            <CardDescription>Ideal for medium to large items</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Moving furniture, electronics, or bulk goods? Our vans can handle up to 1000kg.</p>
            <Link href="/book"><Button variant="outline" className="w-full">Book Van</Button></Link>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg hover:shadow-xl transition-all">
          <CardHeader>
             <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mb-4">
                <Globe className="w-6 h-6 text-primary" />
             </div>
            <CardTitle>Inter-county Freight</CardTitle>
            <CardDescription>Deliveries across Kenya</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Long-distance logistics covering 47 counties with real-time tracking.</p>
            <Link href="/book"><Button variant="outline" className="w-full">Book Freight</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
