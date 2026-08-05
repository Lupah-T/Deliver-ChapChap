"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { ThemeToggle } from './theme-toggle'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/track', label: 'Track Parcel' },
    { href: '/about', label: 'About' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/contact', label: 'Contact' },
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-primary/20 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/60 text-primary-foreground shadow-sm">
        <div className="container flex h-16 items-center mx-auto px-4 justify-between">
          
          <div className="flex items-center">
            {/* Hamburger Menu Button (Mobile Only) */}
            <button 
              className="md:hidden mr-4 p-2 -ml-2 text-white hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setIsOpen(true)}
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.jpg" alt="DropFlexa Logo" width={44} height={44} className="rounded-full" />
              <div className="flex flex-col uppercase italic font-black tracking-wide leading-none ml-1 hidden sm:flex">
                <span className="text-white text-lg">Drop</span>
                <span className="text-white/90 text-lg">Flexa</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-2 md:justify-end">
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 mr-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`text-sm font-medium transition-colors hover:text-white ${pathname === link.href ? 'text-white' : 'text-white/80'}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/book">
                <Button className="bg-white text-primary hover:bg-gray-100 text-xs sm:text-sm h-9 sm:h-10">Book Delivery</Button>
              </Link>
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-background border-r shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Image src="/logo.jpg" alt="DropFlexa Logo" width={36} height={36} className="rounded-full" />
              <span className="font-black italic uppercase text-primary">DropFlexa</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-muted-foreground hover:bg-accent hover:text-foreground rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  pathname === link.href 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="p-4 border-t space-y-4">
            <Link href="/book" className="block w-full">
              <Button className="w-full" size="lg">Book Delivery</Button>
            </Link>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Toggle Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
