"use client"
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Package, Clock, ShieldCheck, MapPin, Search, ChevronDown } from 'lucide-react'
import { CountUp } from '@/components/CountUp'

const faqs = [
  { question: "What happens if a package is damaged?", answer: "We take full responsibility for packages damaged during transit due to our negligence. Our maximum liability is up to 5,000 KES unless additional insurance was purchased." },
  { question: "Do you offer same-day delivery?", answer: "Yes! Orders booked before 11:00 AM are guaranteed for same-day delivery within Nairobi and its immediate environs." },
  { question: "Can I track my delivery in real-time?", answer: "Absolutely. Once your rider is dispatched, you will receive a Tracking ID. You can enter this ID on our Tracking page to see live updates." },
  { question: "Are there any items you do not deliver?", answer: "For safety reasons, we do not deliver cash, illegal substances, live animals, or highly flammable materials. Please see our Terms & Policies for the full list." }
]

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
          <button 
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex justify-between items-center w-full p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-lg text-secondary">{faq.question}</span>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
          </button>
          <div 
            className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="p-6 pt-0 text-muted-foreground">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

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
              Technology-driven courier and delivery solutions for individuals, businesses, and enterprises.
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
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">We combine cutting-edge technology with reliable delivery services to deliver a premium experience.</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2"><CountUp end={250} suffix="+" /></div>
              <div className="text-secondary font-medium">Deliveries</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2"><CountUp end={10} suffix="+" /></div>
              <div className="text-secondary font-medium">Active Riders</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2"><CountUp end={99} suffix="%" /></div>
              <div className="text-secondary font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">Ready to deliver with DropFlexa?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">Join thousands of businesses and individuals who trust us with their daily courier needs.</p>
          <Link href="/book">
            <Button size="lg" className="text-lg px-10 py-6 h-auto bg-secondary hover:bg-secondary/90 text-white rounded-full">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">Quick answers to common questions about our delivery services.</p>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* Google Reviews Section Placeholder */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground mb-10">Real reviews from our Google Business Profile.</p>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            {/* Replace this with an actual Google Reviews widget (e.g., Elfsight, Trustpilot, or Google Places API) */}
            <div className="flex flex-col items-center justify-center py-8">
              <div className="flex text-yellow-400 mb-4">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">4.7/5 Average Rating</h3>
              <p className="text-gray-500 mb-6">Based on 120+ reviews on Google</p>
              <Link href="/reviews">
                <Button variant="outline" className="rounded-full">Read All Reviews</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
