import Link from 'next/link'
import { Button } from './ui/button'
import { Truck } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center mx-auto px-4">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <Truck className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl text-secondary dark:text-foreground">Deliver Chap Chap</span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="hidden md:flex space-x-6 mr-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">Home</Link>
            <Link href="/services" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Services</Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Pricing</Link>
            <Link href="/track" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Track Parcel</Link>
            <Link href="/dashboard/business" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Business</Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/book">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Book Delivery</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
