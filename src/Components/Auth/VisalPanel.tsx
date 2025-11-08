import { LayoutGrid } from 'lucide-react'
import React from 'react'

const VisalPanel = () => {
    return (
        <div className="hidden lg:flex lg:w-2/5 bg-[var(--dark-bg)] items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[var(--primary-cyan)] to-[var(--secondary-orange)]"></div>
            <div className="relative z-10 text-center">
                <h2 className="text-5xl font-extrabold text-white mb-6">
                    <span className="block">Aliran Bisnis yang</span>
                    <span className="block text-[var(--secondary-orange)]">Tak Tertandingi.</span>
                </h2>
                <p className="text-lg text-gray-300 max-w-md mx-auto mb-8">
                    Masuk ke Usahaku untuk kelola keuangan, katalog, dan operasional bisnis Anda di satu tempat.
                    Belum punya akun? Daftar gratis dan mulai kembangkan usaha Anda sekarang.
                </p>
                <LayoutGrid className="w-20 h-20 text-[var(--primary-cyan)] mx-auto opacity-90" />
            </div>
        </div>
    )
}

export default VisalPanel