import React from 'react'


const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div className='flex items-center'>
                    <img src="/logo/logo.png" alt="" className='h-[28px]' />
                       <a href="#" className="text-2xl font-bold flex items-center">
                    <span className="text-[var(--primary-cyan)]">Usaha</span><span className="text-[var(--secondary-orange)]">Ku</span>
                </a>
                </div>
                <a href="#cta-final" className="hidden md:inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-[var(--secondary-orange)] hover:bg-[var(--secondary-orange)]/90 transition duration-300 shadow-lg shadow-[var(--secondary-orange)]/30">
                    Mulai Uji Coba
                </a>
            </div>
        </header>
    )
}

export default Header