"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, CheckCircle2, Bike } from 'lucide-react'

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Since there's no backend endpoint for this yet, we just show a success state.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-[80vh] flex items-center justify-center">
        <Card className="max-w-lg w-full text-center py-12 border-none shadow-xl">
          <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <CardTitle className="text-3xl text-secondary mb-4">Application Received!</CardTitle>
          <CardDescription className="text-lg">
            Thank you for applying to join the DropFlexa fleet. Our team will review your documents and contact you within 48 hours.
          </CardDescription>
          <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-8">Submit Another Application</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-[80vh]">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Bike className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-secondary mb-4">Join Our Fleet: Rider Application</h1>
        <p className="text-muted-foreground text-lg">Partner with DropFlexa and earn money delivering packages across the city.</p>
      </div>

      <Card className="max-w-3xl mx-auto border-none shadow-xl">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* SECTION 1: PERSONAL INFORMATION */}
            <section className="space-y-6">
              <h3 className="text-xl font-bold text-secondary border-b pb-2">SECTION 1: PERSONAL INFORMATION</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input required placeholder="e.g. John Doe" />
                </div>
                <div className="space-y-2">
                  <Label>National ID / Passport Number</Label>
                  <Input required placeholder="e.g. 12345678" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Mobile Money / Phone Number</Label>
                  <Input required type="tel" placeholder="e.g. 0700 000 000" />
                </div>
              </div>
            </section>

            {/* SECTION 2: BIKE & LEGAL DETAILS */}
            <section className="space-y-6">
              <h3 className="text-xl font-bold text-secondary border-b pb-2">SECTION 2: BIKE & LEGAL DETAILS</h3>
              
              <div className="space-y-3">
                <Label>Do you own a functional motorbike?</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2"><input type="radio" name="own_bike" value="yes" required /> Yes</label>
                  <label className="flex items-center gap-2"><input type="radio" name="own_bike" value="no" /> No</label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Motorbike Registration Plate Number</Label>
                  <Input required placeholder="e.g. KMC 123A" />
                </div>
                <div className="space-y-2">
                  <Label>Driver&apos;s License Number (Class A)</Label>
                  <Input required placeholder="Enter license number" />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Is your motorbike insurance up to date?</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2"><input type="radio" name="insurance" value="yes" required /> Yes</label>
                  <label className="flex items-center gap-2"><input type="radio" name="insurance" value="no" /> No</label>
                </div>
              </div>
            </section>

            {/* SECTION 3: EXPERIENCE & EQUIPMENT */}
            <section className="space-y-6">
              <h3 className="text-xl font-bold text-secondary border-b pb-2">SECTION 3: EXPERIENCE & EQUIPMENT</h3>
              
              <div className="space-y-2">
                <Label>Years of experience riding in the city</Label>
                <Select required>
                  <SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 Years</SelectItem>
                    <SelectItem value="1-3">1-3 Years</SelectItem>
                    <SelectItem value="3+">3+ Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                <div className="space-y-3">
                  <Label className="text-sm">Functional smartphone with GPS?</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2"><input type="radio" name="gps" value="yes" required /> Yes</label>
                    <label className="flex items-center gap-2"><input type="radio" name="gps" value="no" /> No</label>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm">Smartphone power bank?</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2"><input type="radio" name="powerbank" value="yes" required /> Yes</label>
                    <label className="flex items-center gap-2"><input type="radio" name="powerbank" value="no" /> No</label>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm">Secure, waterproof delivery box?</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2"><input type="radio" name="box" value="yes" required /> Yes</label>
                    <label className="flex items-center gap-2"><input type="radio" name="box" value="no" /> No</label>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: FILE UPLOADS */}
            <section className="space-y-6">
              <h3 className="text-xl font-bold text-secondary border-b pb-2">SECTION 4: FILE UPLOADS</h3>
              <p className="text-sm text-muted-foreground mb-4">These documents are crucial for safety and verification.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700 block">Driver&apos;s License</span>
                  <input type="file" className="hidden" />
                </div>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700 block">National ID</span>
                  <input type="file" className="hidden" />
                </div>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700 block">Insurance Cert</span>
                  <input type="file" className="hidden" />
                </div>
              </div>
            </section>

            <Button type="submit" size="lg" className="w-full text-lg h-14 bg-secondary hover:bg-secondary/90">
              SUBMIT APPLICATION
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
