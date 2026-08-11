import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, CheckCircle } from 'lucide-react'

export default function ServiceAreas() {
  const areas = [
    { region: 'Nairobi Central', neighborhoods: ['CBD', 'Westlands', 'Kilimani', 'Kileleshwa', 'Lavington', 'Upper Hill'] },
    { region: 'Nairobi East', neighborhoods: ['Eastleigh', 'Buruburu', 'Donholm', 'Umoja', 'Pipeline', 'Embakasi'] },
    { region: 'Nairobi South', neighborhoods: ['South B', 'South C', 'Langata', 'Karen', 'Nairobi West'] },
    { region: 'Nairobi North & Thika Road', neighborhoods: ['Roysambu', 'Kasarani', 'Ruaraka', 'Pangani', 'Muthaiga'] },
    { region: 'Kiambu & Surrounds', neighborhoods: ['Kiambu Town', 'Ruaka', 'Ndenderu', 'Kikuyu', 'Ruiru'] },
  ]

  return (
    <div className="container mx-auto px-4 py-16 min-h-[80vh]">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-secondary mb-4">Our Service Areas</h1>
        <p className="text-muted-foreground text-lg">We offer fast, reliable courier services across Nairobi and its surrounding areas. Find your neighborhood below.</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {areas.map((area, index) => (
          <Card key={index} className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
            <CardHeader className="bg-gray-50/50 pb-4 border-b border-gray-50">
              <CardTitle className="text-xl flex items-center gap-2 text-secondary">
                <MapPin className="text-primary h-5 w-5" /> {area.region}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {area.neighborhoods.map((hood, i) => (
                  <li key={i} className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {hood}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-3xl mx-auto mt-16 p-8 bg-primary/10 rounded-2xl text-center">
        <h3 className="text-2xl font-bold text-secondary mb-3">Don&apos;t see your location?</h3>
        <p className="text-muted-foreground mb-6">We are constantly expanding our coverage. Contact our support team to request a special delivery outside our standard zones.</p>
        <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
          Contact Support
        </a>
      </div>
    </div>
  )
}
