import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Package, Clock, ShieldCheck, MapPin, Search } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-secondary pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1617513360640-5bb961bf3bfd?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl text-center mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Fast, Reliable <span className="text-primary">Same-Day</span> Deliveries Across Kenya
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10">
              Technology-driven courier and logistics solutions for individuals, businesses, and enterprises.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90 text-white rounded-full">
                  Book Delivery <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/track">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 h-auto border-white text-secondary hover:bg-white rounded-full">
                  Track Parcel <Search className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">We combine cutting-edge technology with reliable logistics to deliver a premium experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
                  <Clock className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">Lightning Fast</h3>
                <p className="text-muted-foreground">Same-day and express delivery options to ensure your package arrives exactly when needed.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
                  <ShieldCheck className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">Secure & Insured</h3>
                <p className="text-muted-foreground">Every package is handled with care and fully insured for your peace of mind.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
                  <MapPin className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">Live Tracking</h3>
                <p className="text-muted-foreground">Real-time GPS tracking and instant notifications from pickup to delivery.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1M+</div>
              <div className="text-secondary font-medium">Deliveries</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5K+</div>
              <div className="text-secondary font-medium">Active Riders</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">99%</div>
              <div className="text-secondary font-medium">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">47</div>
              <div className="text-secondary font-medium">Counties Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">Ready to deliver with DropFlexa?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">Join thousands of businesses and individuals who trust us with their daily logistics needs.</p>
          <Link href="/book">
            <Button size="lg" className="text-lg px-10 py-6 h-auto bg-secondary hover:bg-secondary/90 text-white rounded-full">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
