import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-[80vh]">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-secondary mb-4">About Deliver Chap Chap</h1>
        <p className="text-muted-foreground text-lg">We are revolutionizing logistics in Kenya with speed, reliability, and precision.</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To provide the fastest, most reliable delivery service in Kenya, empowering businesses and individuals to move goods seamlessly across the city.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Why Choose Us?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Lightning fast deliveries</li>
              <li>Dedicated fleet of motorbikes</li>
              <li>Real-time tracking system</li>
              <li>24/7 customer support</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
