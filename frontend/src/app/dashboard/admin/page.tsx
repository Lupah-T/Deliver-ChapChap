"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, Building, Bike, Package, Activity, MapPin, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const data = [
  { name: 'Mon', bookings: 1200 },
  { name: 'Tue', bookings: 1400 },
  { name: 'Wed', bookings: 1100 },
  { name: 'Thu', bookings: 1600 },
  { name: 'Fri', bookings: 1900 },
  { name: 'Sat', bookings: 1500 },
  { name: 'Sun', bookings: 900 },
]

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Hardcoded credentials for MVP prototype
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Invalid username or password')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-[80vh] flex items-center justify-center">
        <Card className="w-full max-w-md border-none shadow-xl">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-secondary">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                Log In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-[80vh]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-secondary">System Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <Activity className="w-4 h-4" /> System Healthy
          </div>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>Logout</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">24,500</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Businesses</CardTitle>
            <Building className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">1,250</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Online Riders</CardTitle>
            <Bike className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">482</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Revenue</CardTitle>
            <Package className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">KES 1.2M</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="border-none shadow-md h-full">
            <CardHeader>
              <CardTitle>Weekly Bookings (System-wide)</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="bookings" fill="#0B1F3A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="border-none shadow-md h-full overflow-hidden">
            <CardHeader>
              <CardTitle>Active Riders Heatmap</CardTitle>
            </CardHeader>
            <div className="bg-accent h-64 relative flex items-center justify-center border-t border-gray-200">
              <div className="absolute inset-0 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Nairobi_street_map.png/800px-Nairobi_street_map.png')] bg-cover bg-center"></div>
              <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-primary/40 rounded-full blur-md"></div>
              <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-primary/60 rounded-full blur-md"></div>
              <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-primary/30 rounded-full blur-md"></div>
              <div className="absolute top-2/3 right-1/3 w-16 h-16 bg-primary/70 rounded-full blur-md flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary z-10 drop-shadow" />
              </div>
            </div>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center">High density detected in CBD and Westlands. Recommend deploying 20 idle riders to these zones.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
