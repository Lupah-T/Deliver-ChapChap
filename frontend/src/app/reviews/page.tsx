import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Star } from 'lucide-react'

export default function ReviewsPage() {
  const reviews = [
    { name: 'Sarah Wanjiku', role: 'Small Business Owner', rating: 5, comment: 'Deliver Chap Chap has transformed my business. My customers receive their packages within hours!' },
    { name: 'David Ochieng', role: 'Corporate Executive', rating: 5, comment: 'The tracking system is flawless. I always know exactly where my urgent documents are.' },
    { name: 'Grace Mutuku', role: 'Regular Customer', rating: 4, comment: 'Very reliable motorbike riders. They navigate Nairobi traffic exceptionally well.' },
    { name: 'Kevin Kipruto', role: 'E-commerce Seller', rating: 5, comment: 'The best logistics partner in Kenya. Professional, fast, and affordable.' },
  ]

  return (
    <div className="container mx-auto px-4 py-16 min-h-[80vh]">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-secondary mb-4">Customer Reviews</h1>
        <p className="text-muted-foreground text-lg">See what our clients have to say about our delivery services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {reviews.map((review, idx) => (
          <Card key={idx} className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                  <CardDescription>{review.role}</CardDescription>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground italic">"{review.comment}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
