import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <Separator className="mb-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center space-x-4">
            <div className="text-xl font-bold text-foreground">Zamani Tech</div>
            <span className="text-sm text-muted-foreground">Transforming Your Naira into Digital Wealth</span>
          </div>

          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Zamani Tech. All rights reserved. Expected launch: Q2 2025.</p>
          <p className="mt-2">Early access is limited. Join our waitlist to secure your spot.</p>
        </div>
      </div>
    </footer>
  )
}
