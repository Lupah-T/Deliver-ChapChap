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

      <div className="flex justify-center max-w-6xl mx-auto">
        <Card className="border-none shadow-lg hover:shadow-xl transition-all max-w-md w-full">
          <CardHeader>
             <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mb-4 mx-auto">
                <Bike className="w-6 h-6 text-primary" />
             </div>
            <CardTitle className="text-center">Motorbike Delivery</CardTitle>
            <CardDescription className="text-center">Perfect for small parcels and documents</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">Navigate through traffic quickly. Best for same-day urgent deliveries across the city.</p>
            <Link href="/book"><Button variant="outline" className="w-full">Book Motorbike</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
