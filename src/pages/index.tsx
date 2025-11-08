import CTA from '@/Components/LandingPage/CTA'
import Feature from '@/Components/LandingPage/Feature'
import Footer from '@/Components/LandingPage/Footer'
import Header from '@/Components/LandingPage/Header'
import HeroSection from '@/Components/LandingPage/HeroSection'
import PricingSection from '@/Components/LandingPage/PricingSection'
import ThemeSection from '@/Components/LandingPage/ThemeSection'
import React from 'react'

const Pages = () => {
  return (
    <div className="font-sans text-gray-800 antialiased bg-white">
      <Header />
      <main>
        <HeroSection />
        <Feature />
        <ThemeSection />
        <PricingSection />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default Pages