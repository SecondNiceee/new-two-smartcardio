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
        {/* Legal docs strip — shown below the header */}
        <div className="relative z-40 flex justify-center gap-3 pt-20 pb-2 md:pt-24">
          <a
            href="/oferta.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
          >
            Договор оферты
          </a>
          <a
            href="/confidential.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
          >
            Политика конфиденциальности
          </a>
        </div>
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
      </div>
    </main>
  )
}
