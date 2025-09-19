import { ArrowRight } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Deposit Naira",
      description: "Fund your Zamani Tech account with Nigerian Naira through secure bank transfers or mobile money.",
    },
    {
      step: "02",
      title: "Convert to USDC",
      description: "Your Naira is automatically converted to USDC at competitive real-time exchange rates.",
    },
    {
      step: "03",
      title: "Earn Daily Yields",
      description: "Watch your USDC grow with daily yields powered by secure DeFi protocols and blockchain technology.",
    },
  ]

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">How It Works</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            Start earning with your Naira in three simple steps. It's that easy.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground text-xl font-bold">
                    {step.step}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex flex-1 items-center justify-center">
                      <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground text-pretty">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
