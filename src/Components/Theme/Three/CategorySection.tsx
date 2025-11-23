import { Category, ThemeClasses } from '@/lib/Types/Theme/Three';
import React from 'react'

const CategorySection: React.FC<{ categories: Category[], onSelectCategory: (id: string) => void, activeCategory: string, themeClasses: ThemeClasses }> = ({ categories, onSelectCategory, activeCategory, themeClasses }) => (
    <div className="mx-4 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Jelajahi Kategori</h2>
        <div className="flex flex-wrap gap-2 md:gap-4 overflow-x-auto pb-2">
            <button
                onClick={() => onSelectCategory('all')}
                className={`px-4 py-2 rounded-full text-sm transition ${activeCategory === 'all' ? `${themeClasses.primaryBg} text-white shadow-md` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
                Semua Produk
            </button>
            {categories.map(category => {
                const Icon = category.icon;
                return (
                    <button
                        key={category.id}
                        onClick={() => onSelectCategory(category.id)}
                        className={`flex items-center px-4 py-2 rounded-full text-sm transition ${activeCategory === category.id ? `${themeClasses.primaryBg} text-white shadow-md` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        <Icon className="h-4 w-4 mr-1" />
                        {category.name}
                    </button>
                );
            })}
        </div>
    </div>
);

export default CategorySection