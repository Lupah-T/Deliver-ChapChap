export default function TermsAndPolicies() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-[80vh]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary mb-4">Terms of Service & Policies</h1>
        <p className="text-muted-foreground text-lg mb-10">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-3">1. Scope of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              DropFlexa provides local express courier and delivery services within our specified coverage zones. We reserve the right to refuse packages that are hazardous, illegal, or improperly packed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-3">2. Delivery Window</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we aim for prompt delivery, stated delivery times are estimates and not guarantees. We are not liable for delays caused by traffic, weather, or incorrect address details provided by the sender.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-3">3. Liability and Loss</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our maximum liability for any lost or damaged package is strictly limited to <strong>5,000 KES</strong> or the cost of the delivery service, whichever is lower. We do not insure high-value items like cash, jewelry, or electronics unless a separate written agreement is signed before transit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-3">4. Receiver Unavailability</h2>
            <p className="text-muted-foreground leading-relaxed">
              If the receiver is unavailable, the driver will attempt to call the sender. If no contact is made within 10 minutes, the package will be returned to the hub, and a re-delivery fee will apply.
            </p>
          </section>

          <section className="bg-red-50 border border-red-100 p-6 rounded-xl mt-10">
            <h2 className="text-xl font-bold text-red-600 mb-4">🚨 Blacklisted Items Alert</h2>
            <p className="text-gray-700 mb-3 font-medium">For the safety of our riders and legal compliance, we STRICTLY PROHIBIT the transportation of:</p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Cash, currency, or negotiable instruments.</li>
              <li>Illegal substances, narcotics, or unprescribed medications.</li>
              <li>Explosives, flammable materials, or hazardous chemicals.</li>
              <li>Firearms, ammunition, or weapons of any kind.</li>
              <li>Live animals.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
