import React from 'react'

type Props = {
    categorie: string[] | undefined;
    setActiveCategory: (val: string) => void;
    activeCategory: string;
}

const CategorieOne = ({ categorie, setActiveCategory, activeCategory }: Props) => {
    return (
        <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className={`text-4xl font-bold text-gray-50`}>Jelajahi Kategori</h2>
            </div>

            <div className="flex overflow-x-auto pb-4 space-x-3 sm:space-x-5 whitespace-nowrap scrollbar-hide">
                {categorie?.map(category => (
                    <button
                        key={category}
                        className={`flex-shrink-0 py-2.5 px-8 rounded-full text-lg font-semibold transition duration-200 ${activeCategory === category
                            ? `bg-cyan-600 text-white shadow-lg`
                            : `bg-gray-800 text-gray-50 border border-gray-700/20 hover:bg-gray-700`
                            }`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </section>

    )
}

export default CategorieOne