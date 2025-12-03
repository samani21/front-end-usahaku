import { Category } from '@/lib/Types/Theme/Theme';
import React from 'react'

type Props = {
    categorie: Category[];
    setActiveCategory: (val: string) => void;
    activeCategory: string;
    color?: string
}

const CategorieTwo = ({ categorie, setActiveCategory, activeCategory, color }: Props) => {
    return (
        <div className="mt-8 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Telusuri Kategori</h2>
            <div className="flex space-x-3 overflow-x-auto pb-3 scrollbar-hide">
                {['Semua', ...categorie.map(c => c.name)].map((name, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveCategory(name)}
                        className={`flex-shrink-0 px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-200 shadow-sm ${activeCategory === name
                            ? `bg-${color}-600 hover:bg-${color}-700 text-white shadow-${color}-300`
                            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                            }`}
                    >
                        {categorie?.find(c => c.name === name)?.icon} {name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CategorieTwo