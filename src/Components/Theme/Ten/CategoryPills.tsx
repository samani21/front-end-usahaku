import React from 'react'

type Props = {
    categories: string[];
    setActiveCategory: (value: string) => void
    activeCategory: string
    getThemeClass: (intensity: number, prefix?: string) => void
    themeColor: string;
}

const CategoryPills = ({ categories, setActiveCategory, activeCategory, getThemeClass, themeColor }: Props) => {
    return (
        <div className="flex space-x-2 overflow-x-auto whitespace-nowrap py-4 px-4 sm:px-0">
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 shadow-sm
        ${activeCategory === category
                            ? `${getThemeClass(600, 'bg')} text-white shadow-${themeColor}-300`
                            : `bg-white text-gray-700 hover:${getThemeClass(50, 'bg')} border border-gray-200`
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}

export default CategoryPills