import CategorieConfig from '@/Components/ThemeConfig/Categorie';
import HeaderConfig from '@/Components/ThemeConfig/Header';
import HeroConfig from '@/Components/ThemeConfig/Hero';
import ProductConfig from '@/Components/ThemeConfig/Product';
import { ThemeColor } from '@/lib/Theme/ThemeColor';
import { Catalog, categorie, product, ResHeader, ResHero } from '@/Types/config';
import { ResCategorie } from '@/Types/Product/CategorieState';
import { ResProduct } from '@/Types/Product/ProductState';
import { Get } from '@/utils/Get';
import React, { useEffect, useMemo, useState } from 'react'

const getThemeColor = (color?: string) => {
    if (color && color in ThemeColor) {
        return ThemeColor[color as keyof typeof ThemeColor]
    }
    return ThemeColor.orange
}

const previewPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [header, setHeader] = useState<ResHeader>();
    const [hero, setHero] = useState<ResHero>();
    const [categorie, setCategorie] = useState<categorie>();
    const [product, setProduct] = useState<product>();
    const [categories, setCategories] = useState<ResCategorie[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [products, setProducts] = useState<ResProduct[]>([]);
    const [themeDark, setThemeDark] = useState<boolean>(false);

    useEffect(() => {
        getCalog();
    }, []);

    const getCalog = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: Catalog }>('/catalog');

            if (res?.success) {
                setHeader(res?.data?.header)
                setHero(res?.data?.hero)
                setCategorie(res?.data?.categorie)
                setCategories(res?.data?.categories);
                setProduct(res?.data?.product)
                setProducts(res?.data?.products);
            }
        } finally {
            setLoading(false);
        }
    };


    const colorsHeader = useMemo(
        () => getThemeColor(header?.color),
        [header?.color]
    )

    const colorsHero = useMemo(
        () => getThemeColor(hero?.color),
        [hero?.color]
    )

    const colorsCategorie = useMemo(
        () => getThemeColor(categorie?.color),
        [categorie?.color]
    )
    const colorsProduct = useMemo(
        () => getThemeColor(product?.color),
        [product?.color]
    )

    return (
        <div className={`${themeDark ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'} h-full pb-4 min-h-[100vh]nv flex  justify-center`}>
            <div className='w-full max-w-7xl space-y-4'>
                <div className='relative'>
                    <div className='fixed w-full max-w-7xl z-1'>
                        {header &&
                            <HeaderConfig
                                isBuild={true}
                                theme={header?.theme}
                                color={colorsHeader}
                                themeMode={themeDark ? "dark" : "light"}
                                spanOne={header?.span_one}
                                spanTwo={header?.span_two}
                                setSidebarOpen={setSidebarOpen}
                                toggleTheme={() => setThemeDark(!themeDark)}
                                frameType={header.type_frame ?? 'none'}
                                frameTheme={header.frame ?? 'dark'}
                                logoImage={header?.logo ?? null} />
                        }
                    </div>
                    <div className='pt-18 sm:pt-24 px-4 space-y-4'>
                        {
                            hero &&
                            <HeroConfig
                                theme={hero?.theme}
                                color={colorsHero}
                                isDarkMode={themeDark}
                                headline={hero?.subtitle ?? ''}
                                subHeadline={hero?.desc ?? ''}
                                ctaText={hero?.cta ?? ''}
                                imageHero={hero?.image ?? null}
                                title={hero?.title ?? ''} />
                        }
                        {
                            categorie &&
                            <CategorieConfig
                                theme={categorie?.theme}
                                color={colorsCategorie}
                                categories={categories ?? []}
                                isDarkMode={themeDark} />
                        }
                        {
                            product &&
                            <>
                                <div className='hidden md:grid'>
                                    <ProductConfig
                                        theme={product?.theme}
                                        color={colorsProduct}
                                        products={products ?? []}
                                        isDarkMode={themeDark} />
                                </div>
                                <div className='md:hidden'>
                                    <ProductConfig
                                        theme={product?.theme}
                                        color={colorsProduct}
                                        products={products ?? []}
                                        isDarkMode={themeDark} />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default previewPage