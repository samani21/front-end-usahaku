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
  const [isLandingPage, setIsLandingPage] = useState(false)
  const route = useRouter();
  useEffect(() => {
    setLoading(true)
    if (token) {
      route?.push('/admin/dashboard')
    } else {
      setIsLandingPage(true)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    isLandingPage &&
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