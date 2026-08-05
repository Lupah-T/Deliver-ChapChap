"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-[80vh]">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary mb-4">Get in Touch</h1>
        <p className="text-muted-foreground text-lg">We are here to help. Reach out to us through any of the channels below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="space-y-8">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary">Our Office</h3>
                  <p className="text-muted-foreground">DropFlexa HQ<br/>Westlands, Nairobi, Kenya</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary">Phone</h3>
                  <p className="text-muted-foreground">+254 713 482 742</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary">Email</h3>
                  <p className="text-muted-foreground">support@dropflexa.co.ke</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <a href="https://wa.me/254713482742" target="_blank" rel="noreferrer">
            <Button className="w-full h-14 bg-green-500 hover:bg-green-600 text-white text-lg">
              <MessageCircle className="w-6 h-6 mr-2" /> Chat on WhatsApp
            </Button>
          </a>

          {/* Mock Map */}
          <div className="bg-accent h-64 rounded-xl overflow-hidden relative">
             <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Nairobi_street_map.png/800px-Nairobi_street_map.png')] bg-cover bg-center"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
             </div>
          </div>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea placeholder="Type your message here..." className="h-32" />
              </div>
              <Button className="w-full h-12 mt-2">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
