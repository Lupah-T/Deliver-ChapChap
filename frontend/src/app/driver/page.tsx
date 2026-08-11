import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, Camera, UserCheck, ShieldAlert } from 'lucide-react'

export default function DriverPortal() {
  // Replace this with the actual Google Form URL provided by the user later
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScw4bgsFpum57qCIZEKFSgssYBBbVjFXQHQ2HGrnkKr5P54gg/viewform?usp=publish-editor"

  return (
    <div className="container mx-auto px-4 py-20 min-h-[80vh] flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-secondary mb-4">Driver Portal</h1>
          <p className="text-muted-foreground text-lg">Secure portal for DropFlexa riders to submit Proof of Delivery (POD).</p>
        </div>

        <Card className="border border-gray-100 shadow-md">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-8 pt-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl mb-2">Submit Proof of Delivery</CardTitle>
            <CardDescription className="text-base">
              You will be redirected to our secure Google Form to upload photos and signatures.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-green-100 p-2 rounded-full"><UserCheck className="h-4 w-4 text-green-600" /></div>
                <div>
                  <h4 className="font-medium text-secondary">1. Verify Receiver</h4>
                  <p className="text-sm text-muted-foreground">Confirm the receiver&apos;s name and phone number matches the order.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-blue-100 p-2 rounded-full"><Camera className="h-4 w-4 text-blue-600" /></div>
                <div>
                  <h4 className="font-medium text-secondary">2. Take a Clear Photo</h4>
                  <p className="text-sm text-muted-foreground">Ensure the package and the delivery location are clearly visible.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-orange-100 p-2 rounded-full"><ShieldAlert className="h-4 w-4 text-orange-600" /></div>
                <div>
                  <h4 className="font-medium text-secondary">3. Enter Tracking ID</h4>
                  <p className="text-sm text-muted-foreground">You MUST enter the correct tracking ID for the client to be notified.</p>
                </div>
              </div>
            </div>

            <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
              <Button size="lg" className="w-full text-lg py-6 rounded-xl bg-secondary hover:bg-secondary/90">
                Open Delivery Form <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
