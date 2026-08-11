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
          <p className="text-sm text-gray-300">Fast, Reliable Same-Day Deliveries Across Kenya. Your trusted express courier partner.</p>
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
            <li><Link href="/service-areas" className="hover:text-primary transition-colors">Service Areas</Link></li>
            <li><Link href="/reviews" className="hover:text-primary transition-colors">User Reviews</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Policies</Link></li>
            <li><Link href="/driver" className="hover:text-primary transition-colors">Driver Portal</Link></li>
            <li><Link href="/apply" className="hover:text-primary transition-colors text-green-400 font-medium">Join Our Fleet</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-primary">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center space-x-2"><MapPin className="h-4 w-4" /> <span>Nairobi, Kenya</span></li>
            <li className="flex items-center space-x-2"><Phone className="h-4 w-4" /> <a href="tel:+254700000000" className="hover:text-primary transition-colors">+254 700 000 000</a></li>
            <li className="flex items-center space-x-2"><Mail className="h-4 w-4" /> <a href="mailto:hello@dropflexa.co.ke" className="hover:text-primary transition-colors">hello@dropflexa.co.ke</a></li>
          </ul>
          <div className="mt-4 rounded-md overflow-hidden h-24 w-full bg-gray-800">
            {/* Placeholder for Google Map Embed */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.52835848508!2d36.75837651030491!3d-1.2920658428587123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 flex flex-col items-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} DropFlexa. All rights reserved.</p>
        <p className="mt-2 text-xs text-gray-500">Created by LupahTech Solutions</p>
      </div>
    </footer>
  )
}
