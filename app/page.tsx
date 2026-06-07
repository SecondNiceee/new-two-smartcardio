import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { AudienceSlider } from "@/components/audience-slider"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { AppSection } from "@/components/app-section"
import { AdvantagesSection } from "@/components/advantages-section"
import { ViolationsSection } from "@/components/violations-section"
import { CtaFooter } from "@/components/cta-footer"
import { FaqSection } from "@/components/faq-section"
import { GradientDecorations } from "@/components/gradient-decorations"
import { PatentsSection } from "@/components/patents-section"

import { IndicatorsSection } from "@/components/indicators-section"
import { RecordingsSection } from "@/components/recordings-section"
import { ReviewsSection } from "@/components/reviews-section"
import { GenerationsSection } from "@/components/generations-section"
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
        <IndicatorsSection />
        <HowItWorksSection />
        <RecordingsSection />
        <ViolationsSection />
        <GenerationsSection />
        <ReviewsSection />
        <AdvantagesSection />
        <AudienceSlider />
        <FaqSection />
        <PatentsSection />
        <OrderSection />
        <ContactsSection />
        <CtaFooter />
      </div>
    </main>
  )
}
