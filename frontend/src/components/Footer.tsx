import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Image src="/logo.jpg" alt="DropFlexa Logo" width={32} height={32} className="rounded-full" />
            <span className="font-bold text-xl">DropFlexa</span>
          </div>
          <p className="text-sm text-gray-300">Fast, Reliable Same-Day Deliveries Across Kenya. Your trusted logistics partner.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-primary">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/book" className="hover:text-primary transition-colors">Book Delivery</Link></li>
            <li><Link href="/track" className="hover:text-primary transition-colors">Track Parcel</Link></li>
            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-primary">Company</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/reviews" className="hover:text-primary transition-colors">User Reviews</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-primary">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center space-x-2"><MapPin className="h-4 w-4" /> <span>Nairobi, Kenya</span></li>
            <li className="flex items-center space-x-2"><Phone className="h-4 w-4" /> <span>+254 700 000 000</span></li>
            <li className="flex items-center space-x-2"><Mail className="h-4 w-4" /> <span>hello@dropflexa.co.ke</span></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 flex flex-col items-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} DropFlexa. All rights reserved.</p>
        <p className="mt-2 text-xs text-gray-500">Created by LupahTech Solutions</p>
      </div>
    </footer>
  )
}
