import Loading from '@/Components/component/Loading'
import CTA from '@/Components/LandingPage/CTA'
import Feature from '@/Components/LandingPage/Feature'
import Footer from '@/Components/LandingPage/Footer'
import Header from '@/Components/LandingPage/Header'
import HeroSection from '@/Components/LandingPage/HeroSection'
import PricingSection from '@/Components/LandingPage/PricingSection'
import ThemeSection from '@/Components/LandingPage/ThemeSection'
import { getToken } from '@/store/authStore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Pages = () => {
  const token = getToken();
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRouter();
  useEffect(() => {
    if (token) {
      route?.push('/panel/dashboard')
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }

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