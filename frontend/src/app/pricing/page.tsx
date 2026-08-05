"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Map } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  const zones = [
    {
      name: "Immediate Radius",
      price: "KSh 200 – 250",
      areas: "Ngara, Pangani, Starehe, Upper Hill, Community",
      popular: false
    },
    {
      name: "Inner Suburbs",
      price: "KSh 300",
      areas: "Westlands, Kilimani, Kileleshwa, Parklands, Lavington, South B, South C, Nairobi West",
      popular: true
    },
    {
      name: "Mid-Tier Ring",
      price: "KSh 300 – 400",
      areas: "Roysambu, Kasarani, Mbagathi, Dagoretti Corner, Eastleigh",
      popular: false
    },
    {
      name: "Outer Ring / Highways",
      price: "KSh 400 – 500",
      areas: "Thika Road (up to TRM), Mombasa Road, Lang'ata, Ngong Road, Kangemi",
      popular: false
    },
    {
      name: "Nairobi Outskirts",
      price: "KSh 500 – 800",
      areas: "Karen, Kikuyu, Kiambu Town, Ruiru, Kitengela, Rongai, Athi River",
      popular: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 min-h-[80vh]">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary mb-4">Distance-Based Transparent Pricing</h1>
        <p className="text-muted-foreground text-lg">Our pricing is calculated dynamically based on distance from the CBD. We currently operate exclusively within Nairobi and Kiambu.</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {zones.map((zone, idx) => (
          <Card key={idx} className={`border-none shadow-lg hover:shadow-xl transition-all relative ${zone.popular ? 'border-2 border-primary shadow-xl transform md:-translate-y-2' : ''}`}>
            {zone.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className={`text-2xl ${zone.popular ? 'text-primary' : ''}`}>{zone.name}</CardTitle>
              <CardDescription>Zone {idx + 1}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-3xl font-bold text-secondary">{zone.price}</span>
                <span className="text-muted-foreground">/delivery</span>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Map className="w-4 h-4 text-primary" /> Covered Areas:
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{zone.areas}</p>
                </div>
                <ul className="space-y-2 pt-4 border-t border-border">
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Free GPS Tracking</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Same-day delivery</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/book" className="w-full">
                <Button className="w-full" variant={zone.popular ? "default" : "outline"}>
                  {zone.popular ? "Book Now" : "Select Zone"}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
        
        {/* Corporate / Special Case */}
        <Card className="border-none shadow-lg hover:shadow-xl transition-all bg-secondary text-secondary-foreground">
          <CardHeader>
            <CardTitle className="text-2xl">Corporate Business</CardTitle>
            <CardDescription className="text-gray-400">For high-volume business logistics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <span className="text-3xl font-bold">Custom Pricing</span>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Dedicated account manager</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Monthly invoicing</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Discounted volume rates</li>
            </ul>
          </CardContent>
          <CardFooter className="mt-14">
            <Link href="/contact" className="w-full">
              <Button className="w-full bg-white text-secondary hover:bg-gray-100">Contact Sales</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
