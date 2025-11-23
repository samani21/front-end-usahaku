import { ThemeClasses } from '@/lib/Types/Theme/Three';
import { ChevronRight } from 'lucide-react';
import React from 'react'

const HeroSection: React.FC<{ themeClasses: ThemeClasses }> = ({ themeClasses }) => (
    <div className={`relative overflow-hidden rounded-xl m-4 shadow-lg ${themeClasses.primaryBgLight}`}> {/* Menggunakan warna tema terang */}
        <div className="p-6 md:p-10 flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                    Hemat Akhir Pekan!
                </h1>
                <p className="mt-2 text-lg text-gray-600">Diskon hingga 50% untuk produk pilihan.</p>
                <button className={`mt-4 inline-flex items-center px-4 py-2 ${themeClasses.primaryBg} text-white font-semibold rounded-lg shadow-md ${themeClasses.primaryHoverBg} transition`} onClick={() => {
                    const sec = document.getElementById("produk-pilihan");
                    sec?.scrollIntoView({ behavior: "smooth" });
                }}>
                    Lihat Promo
                    <ChevronRight className="h-5 w-5 ml-1" />
                </button>
            </div>
            <div className="shrink-0">
                <img
                    src="https://png.pngtree.com/png-vector/20230605/ourmid/pngtree-special-promo-banner-design-for-sale-and-offer-vector-png-image_7121132.png"
                    alt="Banner Promo"
                    className="rounded-full shadow-xl w-[150px]"
                />
            </div>
        </div>
    </div>
);
export default HeroSection