"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-[80vh]">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary mb-4">Transparent Pricing for Every Need</h1>
        <p className="text-muted-foreground text-lg">Whether you are sending a single document or managing a supply chain, we have the right plan for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Same Day */}
        <Card className="border-none shadow-lg hover:shadow-xl transition-all">
          <CardHeader>
            <CardTitle className="text-2xl">Standard Same Day</CardTitle>
            <CardDescription>Perfect for flexible daily deliveries.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <span className="text-4xl font-bold text-secondary">From KES 250</span>
              <span className="text-muted-foreground">/delivery</span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Delivery within 6 hours</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Live tracking included</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> SMS notifications</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Standard insurance</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/book" className="w-full">
              <Button className="w-full" variant="outline">Book Now</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Express */}
        <Card className="border-2 border-primary shadow-xl hover:shadow-2xl transition-all relative transform md:-translate-y-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </div>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Express Under 2hrs</CardTitle>
            <CardDescription>When it absolutely needs to be there now.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <span className="text-4xl font-bold text-secondary">From KES 450</span>
              <span className="text-muted-foreground">/delivery</span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Guaranteed under 2 hours</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Priority routing</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Premium insurance coverage</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Direct driver contact</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> WhatsApp notifications</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/book" className="w-full">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white text-lg h-12">Book Express</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Corporate */}
        <Card className="border-none shadow-lg hover:shadow-xl transition-all bg-secondary text-secondary-foreground">
          <CardHeader>
            <CardTitle className="text-2xl">Corporate Business</CardTitle>
            <CardDescription className="text-gray-400">For high-volume business logistics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <span className="text-4xl font-bold">Custom Pricing</span>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Dedicated account manager</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Monthly invoicing</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Advanced API integration</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Custom analytics dashboard</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Discounted volume rates</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/contact" className="w-full">
              <Button className="w-full bg-white text-secondary hover:bg-gray-100">Contact Sales</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
