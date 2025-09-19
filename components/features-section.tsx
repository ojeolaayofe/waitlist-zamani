import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, DollarSign, Lock, Smartphone } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Coins,
      title: "Seamless Naira Deposits",
      description: "Deposit your Naira and convert it seamlessly to USDC with competitive exchange rates.",
    },
    {
      icon: DollarSign,
      title: "Daily Yield Generation",
      description: "Earn daily yields on your deposits, powered by secure blockchain technology and DeFi protocols.",
    },
    {
      icon: Lock,
      title: "Safe & Secure Platform",
      description:
        "Your funds are protected with cutting-edge encryption, multi-signature wallets, and regulatory compliance.",
    },
    {
      icon: Smartphone,
      title: "Built for the Future",
      description: "An intuitive mobile-first platform designed for the next generation of digital finance in Nigeria.",
    },
  ]

  return (
    <section className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Why Choose Zamani Tech?
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            Experience the future of savings with our innovative platform designed specifically for Nigerian users.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-card-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
