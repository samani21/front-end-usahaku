import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { DUMMY_CATEGORIES, DUMMY_PRODUCTS, Product, SidebarType, THEME_MAP, ThemeClasses, ThemeName } from '@/lib/Types/Theme/Three';
import Header from '@/Components/Theme/Three/Header';
import SidebarModal from '@/Components/Theme/Three/SidebarModal';
import ProductDetailModal from '@/Components/Theme/Three/ProductDetailModal';
import MessageBox from '@/Components/Theme/Three/MessageBox';
import ThemeSwitcher from '@/Components/Theme/Three/ThemeSwitcher';
import HeroSection from '@/Components/Theme/Three/HeroSection';
import CategorySection from '@/Components/Theme/Three/CategorySection';
import ProductCard from '@/Components/Theme/Three/ProductCard';


const ThemeThree: React.FC = () => {
    const [activeSidebar, setActiveSidebar] = useState<SidebarType>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTheme, setActiveTheme] = useState<ThemeName>('Minimarket');

    // Calculate theme classes based on active theme
    const themeClasses: ThemeClasses = useMemo(() => {
        return THEME_MAP[activeTheme];
    }, [activeTheme]);

    const filteredProducts = useMemo(() => {
        return DUMMY_PRODUCTS.filter(product => {
            const categoryMatch = activeCategory === 'all' || product.category === activeCategory;
            const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            return categoryMatch && searchMatch;
        });
    }, [activeCategory, searchTerm]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header onSidebarToggle={setActiveSidebar} themeClasses={themeClasses} />
            <SidebarModal type={activeSidebar} onClose={() => setActiveSidebar(null)} themeClasses={themeClasses} />
            {selectedProduct && <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} themeClasses={themeClasses} />}
            <MessageBox />

            <main className="container mx-auto p-4 pt-0">

                {/* Theme Switcher */}
                <ThemeSwitcher activeTheme={activeTheme} onSelectTheme={setActiveTheme} />

                {/* Hero Section - Sekarang menerima themeClasses */}
                <HeroSection themeClasses={themeClasses} />

                {/* Search Bar */}
                <div className="mx-4 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari produk di minimarket..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${themeClasses.primaryRing} shadow-sm transition`}
                        />
                    </div>
                </div>

                {/* Categories */}
                <CategorySection
                    categories={DUMMY_CATEGORIES}
                    onSelectCategory={setActiveCategory}
                    activeCategory={activeCategory}
                    themeClasses={themeClasses}
                />

                {/* Product Grid */}
                <div className="mx-4 mt-8" id="produk-pilihan">
                    <h2 className="text-2xl font-extrabold text-gray-800 mb-4">
                        {activeCategory === 'all' ? 'Semua Produk' : DUMMY_CATEGORIES.find(c => c.id === activeCategory)?.name || 'Produk'}
                    </h2>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} onClick={setSelectedProduct} themeClasses={themeClasses} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-10 bg-white rounded-lg shadow-md mt-6">
                            <p className="text-xl text-gray-500">
                                Tidak ada produk ditemukan untuk kategori/pencarian ini.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer sederhana untuk mobile spacing */}
            <div className="h-16"></div>
        </div>
    );
};

export default ThemeThree;