"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle2, MapPin, Package, Clock, Weight } from 'lucide-react'

export default function BookingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const trackingNumber = "DC" + Math.floor(Math.random() * 1000000000)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget as HTMLFormElement;
    const elements = form.elements as any;
    
    const expectedTime = new Date(Date.now() + 45 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Note: To use NEXT_PUBLIC_API_URL in client component, it should be defined in .env
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    try {
      await fetch(`${apiUrl}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: elements.sender.value,
          senderEmail: elements.senderEmail.value,
          recipientName: elements.recipient.value,
          recipientEmail: elements.recipientEmail.value,
          parcelDetails: `Package (~${elements.weight.value}kg)`,
          expectedTime
        })
      });
    } catch (err) {
      console.error('Failed to send booking emails:', err);
    }
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center min-h-[80vh] items-center">
        <Card className="w-full max-w-lg text-center shadow-xl border-none">
          <CardHeader>
            <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <CardTitle className="text-3xl text-secondary">Booking Successful!</CardTitle>
            <CardDescription className="text-lg mt-2">Your delivery has been scheduled successfully.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-accent p-6 rounded-xl mt-4">
              <p className="text-sm text-muted-foreground mb-2">Your Tracking Number</p>
              <p className="text-4xl font-mono font-bold text-primary tracking-wider">{trackingNumber}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button className="w-full sm:w-auto" onClick={() => setIsSubmitted(false)}>Book Another</Button>
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
          <p className="text-muted-foreground">Fill in the details below to schedule your chap chap delivery.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  {/* Locations */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Locations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pickup">Pickup Location</Label>
                        <Input id="pickup" name="pickup" placeholder="Enter pickup address" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destination">Destination</Label>
                        <Input id="destination" name="destination" placeholder="Enter delivery address" required />
                      </div>
                    </div>
                  </div>

                  {/* Contacts */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Package className="w-5 h-5 text-primary" /> Contacts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sender">Sender Name & Phone</Label>
                        <Input id="sender" name="sender" placeholder="e.g. John Doe - 0700123456" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="senderEmail">Sender Email</Label>
                        <Input id="senderEmail" name="senderEmail" type="email" placeholder="e.g. john@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recipient">Recipient Name & Phone</Label>
                        <Input id="recipient" name="recipient" placeholder="e.g. Jane Doe - 0700654321" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recipientEmail">Recipient Email</Label>
                        <Input id="recipientEmail" name="recipientEmail" type="email" placeholder="e.g. jane@example.com" required />
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
                        <Select required name="priority">
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

                  <Button type="submit" size="lg" className="w-full text-lg h-14" disabled={isSubmitting}>
                    {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-none shadow-lg sticky top-24 bg-secondary text-secondary-foreground">
              <CardHeader>
                <CardTitle>Instant Quote</CardTitle>
                <CardDescription className="text-gray-400">Estimated cost for this delivery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Base Fare</span>
                  <span>KES 300</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Distance (est.)</span>
                  <span>KES 450</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Priority Fee</span>
                  <span>KES 0</span>
                </div>
                <div className="pt-4 flex justify-between items-center font-bold text-2xl text-primary">
                  <span>Total</span>
                  <span>KES 750</span>
                </div>
                <div className="mt-6 p-4 bg-primary/20 rounded-lg flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-white">Estimated Delivery Time</p>
                    <p className="text-gray-400 mt-1">45 minutes after pickup</p>
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
