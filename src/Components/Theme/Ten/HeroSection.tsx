import React from 'react'

type Props = {
    getThemeClass: (intensity: number, prefix?: string) => void
}

const HeroSection = ({getThemeClass}: Props) => {
    return (
        <section id="home" className={`${getThemeClass(50, 'bg')} pt-20 pb-12 sm:pt-24 sm:pb-16 text-center shadow-inner rounded-b-xl`}>
        <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3">
                Layanan Cepat & Terpercaya
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Pesan jasa laundry, barbershop, dan lainnya dengan mudah. Layanan premium, harga terjangkau.
            </p>
            <div className="mt-6">
                <a href="#satuan" className={`inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-lg text-white ${getThemeClass(600, 'bg')} hover:${getThemeClass(700, 'bg')} transition duration-300 transform hover:scale-105`}>
                    Lihat Katalog Sekarang
                </a>
            </div>
        </div>
    </section>
    )
}

export default HeroSection