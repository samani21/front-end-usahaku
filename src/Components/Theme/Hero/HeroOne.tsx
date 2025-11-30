import { Hero } from '@/lib/Types/Theme/Theme';
import React from 'react'

type Props = {
    dataHero: Hero | null;
}

const HeroOne = ({ dataHero }: Props) => {
    return (
        <section className={`bg-gradient-to-r from-gray-800 to-cyan-900 rounded-3xl shadow-2xl overflow-hidden mb-16 p-8 md:p-16 text-white`}>
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-3/5">
                    <span className={`text-sm font-semibold uppercase tracking-widest text-teal-200 mb-2 block`}>{dataHero?.title}</span>
                    <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">{dataHero?.sub_title}</h2>
                    <p className={`text-cyan-100 text-xl mb-8`}>{dataHero?.description}</p>
                    <button className={`bg-white text-cyan-400 font-bold py-3.5 px-10 rounded-full shadow-lg hover:bg-slate-100 transition duration-300 transform hover:scale-105`}
                        onClick={() => {
                            const sec = document.getElementById("produk-pilihan");
                            sec?.scrollIntoView({ behavior: "smooth" });
                        }}>
                        {dataHero?.cta}
                    </button>
                </div>
                <div className="hidden md:block md:w-1/4">
                    {/* SVG Ilustrasi Modern */}
                    <svg className="w-full h-auto text-white opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                </div>
            </div>
        </section>
    )
}

export default HeroOne