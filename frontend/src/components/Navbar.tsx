import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/20 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/60 text-primary-foreground shadow-sm">
      <div className="container flex h-16 items-center mx-auto px-4">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <Image src="/logo.jpg" alt="DropFlexa Logo" width={44} height={44} className="rounded-full" />
          <div className="flex flex-col uppercase italic font-black tracking-wide leading-none ml-1">
            <span className="text-white text-lg">Drop</span>
            <span className="text-white/90 text-lg">Flexa</span>
          </div>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="hidden md:flex space-x-6 mr-6">
            <Link href="/" className="text-sm font-medium text-white transition-colors hover:text-white/80">Home</Link>
            <Link href="/services" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Services</Link>
            <Link href="/pricing" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Pricing</Link>
            <Link href="/track" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Track Parcel</Link>
            <Link href="/about" className="text-sm font-medium text-white/80 transition-colors hover:text-white">About</Link>
            <Link href="/reviews" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Reviews</Link>
            <Link href="/contact" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/book">
              <Button className="bg-white text-primary hover:bg-gray-100">Book Delivery</Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
