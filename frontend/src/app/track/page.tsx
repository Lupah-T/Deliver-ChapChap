"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, MapPin, CheckCircle2, Circle, Truck, Bike } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [isTracking, setIsTracking] = useState(false)
  const [progress, setProgress] = useState(0)

  const [error, setError] = useState('')

  const [bookingDetails, setBookingDetails] = useState<any>(null)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsTracking(false)
    setProgress(0)
    setBookingDetails(null)

    if (trackingNumber.trim() === '') {
      setError('Please enter a tracking number.')
      return
    }

    if (trackingNumber.length < 8 || !trackingNumber.startsWith('DC')) {
      setError('Invalid tracking number format. It should start with DC.')
      return
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/bookings/${trackingNumber}`);
      
      if (!res.ok) {
        setError('Tracking number not found. Please verify the ID and try again.')
        return
      }

      const data = await res.json();
      setBookingDetails(data);
      setProgress(data.progress || 1);
      setIsTracking(true);
    } catch (err) {
      setError('Failed to connect to tracking server. Try again later.');
    }
  }

  // Simulate progress only if we are tracking and progress < 4
  useEffect(() => {
    if (isTracking && progress < 4) {
      const timer = setTimeout(() => {
        setProgress(p => p + 1)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isTracking, progress])

  const steps = [
    { title: "Booking Confirmed", desc: "10:30 AM", active: true },
    { title: "Rider Assigned", desc: "10:35 AM - James Mwangi", active: progress >= 1 },
    { title: "Parcel Picked", desc: "10:45 AM", active: progress >= 2 },
    { title: "In Transit", desc: "Current Status", active: progress >= 3 },
    { title: "Near Destination", desc: "ETA: 28 mins", active: progress >= 4 },
    { title: "Delivered", desc: "Pending", active: false },
  ]

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center min-h-[80vh]">
      <div className="max-w-2xl w-full text-center mb-10">
        <h1 className="text-3xl font-bold text-secondary mb-4">Track Your Parcel</h1>
        <p className="text-muted-foreground mb-8">Enter your tracking number below to get real-time updates on your delivery.</p>
        <form onSubmit={handleTrack} className="flex gap-2">
          <Input 
            className="h-14 text-lg" 
            placeholder="e.g. DC123456789" 
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <Button type="submit" size="lg" className="h-14 px-8 text-lg">
            <Search className="w-5 h-5 mr-2" /> Track
          </Button>
        </form>
        {error && <p className="text-red-500 mt-4 font-medium">{error}</p>}
      </div>

      {isTracking && (
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-none shadow-lg order-2 md:order-1">
            <CardHeader>
              <CardTitle>Delivery Timeline</CardTitle>
              <CardDescription>Tracking Number: {trackingNumber}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-8 space-y-8 mt-4">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200"></div>
                {steps.map((step, idx) => (
                  <div key={idx} className={`relative ${step.active ? 'opacity-100' : 'opacity-50'}`}>
                    <div className="absolute -left-[37px] top-1">
                      {step.active ? (
                        <CheckCircle2 className="w-6 h-6 text-primary bg-white rounded-full" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300 bg-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <h4 className={`text-lg font-semibold ${step.active ? 'text-secondary' : 'text-gray-400'}`}>{step.title}</h4>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg order-1 md:order-2 overflow-hidden">
            <div className="bg-accent h-64 relative flex items-center justify-center border-b border-gray-200">
              {/* Mock Map Background */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Nairobi_street_map.png/800px-Nairobi_street_map.png')] bg-cover bg-center"></div>
              
              {/* Animated Map Route & Rider */}
              <div className="relative z-10 w-full h-full flex items-center p-8">
                <div className="w-full h-1 bg-gray-300 rounded-full relative">
                  <motion.div 
                    className="h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(progress / 5) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                  <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 -ml-4"
                    initial={{ left: "0%" }}
                    animate={{ left: `${(progress / 5) * 100}%` }}
                    transition={{ duration: 1 }}
                  >
                    <div className="bg-white p-2 rounded-full shadow-md text-primary">
                      <Bike className="w-6 h-6" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Expected Time of Arrival</p>
                  <p className="text-3xl font-bold text-primary">{bookingDetails?.expectedTime || "Calculating..."}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-xl font-semibold capitalize">{bookingDetails?.status || "In Transit"}</p>
                </div>
              </div>
              <div className="bg-accent rounded-lg p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  <span className="font-bold">
                    {bookingDetails?.senderName?.charAt(0) || "D"}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-secondary">Sender: {bookingDetails?.senderName || "Unknown"}</p>
                  <p className="text-sm text-muted-foreground">Recipient: {bookingDetails?.recipientName || "Unknown"}</p>
                </div>
                <div className="ml-auto">
                  <Button variant="outline" size="sm">Call Support</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
