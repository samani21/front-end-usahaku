import { ResCategorie } from '@/lib/Types/Product/CategorieState';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React, { useState } from 'react'

type Props = {
    color: ThemeColorSet;
    categorie: ResCategorie[];
    frameIcon: 'Light' | 'Dark' | null
}

const Eight = ({ color, categorie, frameIcon }: Props) => {
    const [activeCategory, setActiveCategory] = useState<string>('Semua');
    return (
        <section className="mb-12 p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Pilih Kategori</h2>
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={() => setActiveCategory("Semua")}
                    className={`flex items-center px-4 py-2 rounded-full font-semibold transition duration-200 shadow-md ${activeCategory === "Semua"
                        ? `${color?.bg600} text-white`
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                        }
                                        `}
                >
                    Semua
                </button>
                {categorie.map(category => {
                    return (
                        <button
                            key={category?.id}
                            onClick={() => setActiveCategory(category?.name)}
                            className={`flex items-center px-4 py-2  gap-2 rounded-full font-semibold transition duration-200 shadow-md ${activeCategory === category?.name
                                ? `${color?.bg600} text-white`
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }
                                        `}
                        >
                            {category?.icon &&
                                <div className={`${frameIcon === 'Light' ? color?.bg100 : frameIcon === 'Dark' ? color?.bg900 : ""} rounded-full p-1`}>
                                    <img src={category?.icon} className='w-[24px] h-[24px]' />
                                </div>
                            }
                            {category?.name}
                        </button>
                    )
                })}
            </div>
        </section>
    )
}

export default Eight
