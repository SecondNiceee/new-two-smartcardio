import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { AppSection } from "@/components/app-section"
import { GenerationsSection } from "@/components/generations-section"
import { AdvantagesSection } from "@/components/advantages-section"
import { CtaFooter } from "@/components/cta-footer"
import { FaqSection } from "@/components/faq-section"
import { GradientDecorations } from "@/components/gradient-decorations"
import { PatentsSection } from "@/components/patents-section"

import { RecordingsSection } from "@/components/recordings-section"
import { ReviewsSection } from "@/components/reviews-section"
import { OrderSection } from "@/components/order-section"
import { ContactsSection } from "@/components/contacts-section"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <GradientDecorations />
      <div className="relative z-10">
        <SiteHeader />
        <HeroSection />
        <AppSection />
        <GenerationsSection />
        <HowItWorksSection />
        <RecordingsSection />
        <AdvantagesSection />
        <ReviewsSection />
        <PatentsSection />
        <FaqSection />
        <OrderSection />
        <ContactsSection />
        <CtaFooter />
        {/* Legal docs — below the footer */}
        <div className="relative z-10 flex flex-wrap justify-center gap-3 bg-background px-4 pb-6 pt-4">
          <a
            href="/oferta.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            Договор оферты
          </a>
          <a
            href="/confidential.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </main>
  )
}
