"use client"

import { useState, useEffect, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle2, MapPin, Package, Clock, Weight, User, UserCheck, Crosshair, Search } from 'lucide-react'
import dynamic from 'next/dynamic'
import { estimateFare } from '@/lib/pricing'

// Dynamically import MapPicker with SSR disabled to avoid 'window' is not defined errors
const MapPicker = dynamic(() => import('@/components/MapPicker'), { 
  ssr: false,
  loading: () => <div className="h-64 w-full bg-accent animate-pulse rounded-lg flex items-center justify-center">Loading map...</div>
})

export default function BookingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPaymentPending, setIsPaymentPending] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState('')
  
  
  // Location states
  const [pickupAddress, setPickupAddress] = useState('')
  const [destinationAddress, setDestinationAddress] = useState('')
  const [pickupLocation, setPickupLocation] = useState<{lat: number, lng: number} | null>(null)
  const [destinationLocation, setDestinationLocation] = useState<{lat: number, lng: number} | null>(null)
  
  // Quote states
  const [quote, setQuote] = useState({ totalFare: 0, baseFare: 0, distanceFare: 0, distance: 0, duration: 0 })
  const [isLocating, setIsLocating] = useState(false)

  // Reverse Geocode to get address string from coordinates
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
      const data = await res.json();
      return data.display_name;
    } catch (err) {
      console.error("Geocoding failed", err);
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  }

  // Forward Geocode to get coordinates from typed address
  const forwardGeocode = async (address: string, setLocation: (loc: {lat: number, lng: number}) => void, setAddress: (addr: string) => void) => {
    if (!address) return;
    setIsLocating(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', Kenya')}&limit=1`);
      const data = await res.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        setLocation({ lat, lng });
        setAddress(data[0].display_name);
      } else {
        alert("Location not found. Please try dragging the pin instead.");
      }
    } catch (err) {
      console.error("Search failed", err);
      alert("Failed to search location.");
    }
    setIsLocating(false);
  }

  // Update Quote whenever locations change
  useEffect(() => {
    if (pickupLocation && destinationLocation) {
      estimateFare(
        pickupAddress, 
        destinationAddress, 
        pickupLocation.lat, 
        pickupLocation.lng, 
        destinationLocation.lat, 
        destinationLocation.lng
      ).then(res => setQuote(res));
    }
  }, [pickupLocation, destinationLocation, pickupAddress, destinationAddress]);

  const handlePickupChange = async (lat: number, lng: number) => {
    setPickupLocation({ lat, lng });
    const address = await reverseGeocode(lat, lng);
    setPickupAddress(address);
  }

  const handleDestinationChange = async (lat: number, lng: number) => {
    setDestinationLocation({ lat, lng });
    const address = await reverseGeocode(lat, lng);
    setDestinationAddress(address);
  }

  const useCurrentLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          await handlePickupChange(lat, lng);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Could not get your location. Please check your browser permissions.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setIsLocating(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget as HTMLFormElement;
    const elements = form.elements as any;
    
    const expectedTime = new Date(Date.now() + quote.duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? `http://${window.location.hostname}:5000/api` : 'http://localhost:5000/api');

    try {
      const res = await fetch(`${apiUrl}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickupAddress,
          destinationAddress,
          pickupLocation,
          destinationLocation,
          distance: quote.distance,
          estimatedCost: quote.totalFare,
          senderName: elements.senderName.value,
          senderPhone: elements.senderPhone.value,
          senderEmail: elements.senderEmail.value,
          recipientName: elements.recipientName.value,
          recipientPhone: elements.recipientPhone.value,
          recipientEmail: elements.recipientEmail.value,
          parcelDetails: `Package (~${elements.weight.value}kg)`,
          expectedTime
        })
      });
      const data = await res.json();
      
      if (data.bookingId) {
        // Step 2: Trigger STK Push
        const phoneToBill = elements.senderPhone.value;
        const stkRes = await fetch(`${apiUrl}/mpesa/stkpush`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId: data.bookingId,
            phone: phoneToBill,
            amount: quote.totalFare
          })
        });
        
        setIsSubmitting(false);
        setIsPaymentPending(true);

        // Step 3: Poll for success
        const pollInterval = setInterval(async () => {
          try {
            const statusRes = await fetch(`${apiUrl}/bookings/status/${data.bookingId}`);
            const statusData = await statusRes.json();
            
            if (statusData.status === 'Booking Confirmed' && statusData.trackingId && !statusData.trackingId.startsWith('PENDING')) {
              clearInterval(pollInterval);
              setTrackingNumber(statusData.trackingId);
              setIsPaymentPending(false);
              setIsSubmitted(true);
            }
          } catch (pollErr) {
            console.error("Polling error", pollErr);
          }
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to create booking:', err);
      setIsSubmitting(false);
    }
  };

  if (isPaymentPending) {
    return (
      <div className="container mx-auto px-4 py-32 flex justify-center min-h-[80vh] items-center">
        <Card className="w-full max-w-md text-center shadow-2xl border-none bg-secondary text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-primary to-green-400 animate-pulse"></div>
          <CardHeader>
            <div className="mx-auto w-16 h-16 border-4 border-t-primary border-r-primary border-b-gray-600 border-l-gray-600 rounded-full animate-spin mb-6"></div>
            <CardTitle className="text-2xl">Awaiting Payment</CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              An M-Pesa prompt has been sent to your phone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-2">Amount to pay: <strong className="text-primary text-xl">KES {quote.totalFare}</strong></p>
            <p className="text-sm text-gray-400">Please enter your M-Pesa PIN to complete the booking. Do not close this window.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isSubmitted) {
    const whatsappMsg = `Hello DropFlexa, I want to dispatch my booking. \n*Tracking ID:* ${trackingNumber}\n*Pickup:* ${pickupAddress}\n*Destination:* ${destinationAddress}`;
    const whatsappUrl = `https://wa.me/254707303816?text=${encodeURIComponent(whatsappMsg)}`;

    return (
      <div className="container mx-auto px-4 py-24 flex justify-center min-h-[80vh] items-center">
        <Card className="w-full max-w-lg text-center shadow-xl border-none">
          <CardHeader>
            <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <CardTitle className="text-3xl text-secondary">Payment & Booking Successful!</CardTitle>
            <CardDescription className="text-lg mt-2">Your delivery has been scheduled and rider dispatched.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-accent p-6 rounded-xl mt-4 mb-4">
              <p className="text-sm text-muted-foreground mb-2">Your Tracking Number</p>
              <p className="text-4xl font-mono font-bold text-primary tracking-wider">{trackingNumber}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsSubmitted(false)}>Book Another</Button>
            <Button variant="outline" className="w-full sm:w-auto">Track Parcel</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-secondary mb-2">Book a Delivery</h1>
          <p className="text-muted-foreground">Fill in the details below to schedule your DropFlexa delivery.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  {/* Locations */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Locations</h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={useCurrentLocation}
                        disabled={isLocating}
                      >
                        <Crosshair className="w-4 h-4 mr-2" />
                        {isLocating ? 'Locating...' : 'Use My GPS'}
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Pickup Map */}
                      <div className="space-y-2">
                        <Label>1. Drop Pin or Type Pickup Location</Label>
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Type pickup address..." 
                            value={pickupAddress}
                            onChange={(e) => setPickupAddress(e.target.value)}
                            required 
                          />
                          <Button type="button" variant="secondary" onClick={() => forwardGeocode(pickupAddress, setPickupLocation, setPickupAddress)}>
                            <Search className="w-4 h-4 mr-2" /> Search
                          </Button>
                        </div>
                        <MapPicker 
                          position={pickupLocation} 
                          onPositionChange={handlePickupChange} 
                        />
                      </div>
                      
                      {/* Destination Map */}
                      <div className="space-y-2">
                        <Label>2. Drop Pin or Type Destination Location</Label>
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Type destination address..." 
                            value={destinationAddress}
                            onChange={(e) => setDestinationAddress(e.target.value)}
                            required 
                          />
                          <Button type="button" variant="secondary" onClick={() => forwardGeocode(destinationAddress, setDestinationLocation, setDestinationAddress)}>
                            <Search className="w-4 h-4 mr-2" /> Search
                          </Button>
                        </div>
                        <MapPicker 
                          position={destinationLocation} 
                          onPositionChange={handleDestinationChange} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sender Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Sender Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="senderName">Sender Name</Label>
                        <Input id="senderName" name="senderName" placeholder="e.g. John Doe" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="senderPhone">Sender Phone</Label>
                        <Input id="senderPhone" name="senderPhone" type="tel" placeholder="e.g. 0700123456" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="senderEmail">Sender Email (Optional)</Label>
                        <Input id="senderEmail" name="senderEmail" type="email" placeholder="e.g. john@example.com" />
                      </div>
                    </div>
                  </div>

                  {/* Recipient Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2"><UserCheck className="w-5 h-5 text-primary" /> Recipient Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipientName">Recipient Name</Label>
                        <Input id="recipientName" name="recipientName" placeholder="e.g. Jane Doe" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recipientPhone">Recipient Phone</Label>
                        <Input id="recipientPhone" name="recipientPhone" type="tel" placeholder="e.g. 0700654321" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recipientEmail">Recipient Email (Optional)</Label>
                        <Input id="recipientEmail" name="recipientEmail" type="email" placeholder="e.g. jane@example.com" />
                      </div>
                    </div>
                  </div>

                  {/* Package Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Weight className="w-5 h-5 text-primary" /> Package Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Package Type</Label>
                        <Select required name="type">
                          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="document">Document</SelectItem>
                            <SelectItem value="parcel">Parcel</SelectItem>
                            <SelectItem value="food">Food</SelectItem>
                            <SelectItem value="fragile">Fragile Items</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight">Estimated Weight (kg)</Label>
                        <Input id="weight" name="weight" type="number" min="0.1" step="0.1" placeholder="e.g. 2.5" required />
                      </div>
                    </div>
                  </div>

                  {/* Timing */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> Timing & Priority</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="priority">Delivery Speed</Label>
                        <Select required name="priority" defaultValue="standard">
                          <SelectTrigger><SelectValue placeholder="Select speed" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard (Same Day)</SelectItem>
                            <SelectItem value="express">Express (Under 2 hours)</SelectItem>
                            <SelectItem value="urgent">Urgent (Immediate)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Preferred Pickup Time</Label>
                        <Input id="time" name="time" type="time" required />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full text-lg h-14 bg-green-500 hover:bg-green-600 text-white" disabled={isSubmitting || !pickupLocation || !destinationLocation}>
                    {!pickupLocation || !destinationLocation 
                      ? 'Please select locations on map' 
                      : isSubmitting 
                        ? 'Processing Payment...' 
                        : `Pay KES ${quote.totalFare} & Book Delivery`
                    }
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-none shadow-lg sticky top-24 bg-secondary text-secondary-foreground">
              <CardHeader>
                <CardTitle>Instant Quote</CardTitle>
                <CardDescription className="text-gray-400">Dynamic pricing based on Nairobi/Kiambu zones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {(!pickupLocation || !destinationLocation) && (
                   <div className="p-3 bg-white/10 rounded text-sm text-center mb-4 text-orange-200">
                     Drop pins on the map to calculate exact fare.
                   </div>
                )}
                
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Base Fare (Zone)</span>
                  <span>KES {quote.baseFare}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Distance ({quote.distance > 0 ? quote.distance + ' km' : 'est.'})</span>
                  <span>{quote.distanceFare > 0 ? '+ KES ' + quote.distanceFare : 'Included'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">GPS & Tracking</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="pt-4 flex justify-between items-center font-bold text-2xl text-primary">
                  <span>Total</span>
                  <span>KES {quote.totalFare}</span>
                </div>
                <div className="mt-6 p-4 bg-primary/20 rounded-lg flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-white">Estimated Delivery Time</p>
                    <p className="text-gray-400 mt-1">{quote.duration > 0 ? `${quote.duration} minutes after pickup` : 'Pending location selection'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
