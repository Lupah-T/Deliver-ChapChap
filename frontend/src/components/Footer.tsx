import Link from 'next/link'
import { Truck, MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Truck className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Deliver Chap Chap</span>
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
            <li><Link href="/dashboard/business" className="hover:text-primary transition-colors">Business Solutions</Link></li>
            <li><Link href="/dashboard/rider" className="hover:text-primary transition-colors">Become a Rider</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-primary">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center space-x-2"><MapPin className="h-4 w-4" /> <span>Nairobi, Kenya</span></li>
            <li className="flex items-center space-x-2"><Phone className="h-4 w-4" /> <span>+254 700 000 000</span></li>
            <li className="flex items-center space-x-2"><Mail className="h-4 w-4" /> <span>hello@deliverchapchap.co.ke</span></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Deliver Chap Chap. All rights reserved.
      </div>
    </footer>
  )
}
