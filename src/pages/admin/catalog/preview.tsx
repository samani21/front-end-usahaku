import HeaderConfig from '@/Components/ThemeConfig/Header';
import HeroConfig from '@/Components/ThemeConfig/Hero';
import { ThemeColor } from '@/lib/Theme/ThemeColor';
import { Catalog, ResHeader, ResHero } from '@/Types/config';
import { Get } from '@/utils/Get';
import React, { useEffect, useMemo, useState } from 'react'

const previewPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [header, setHeader] = useState<ResHeader>();
    const [hero, setHero] = useState<ResHero>();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
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
            }
        } finally {
            setLoading(false);
        }
    };
    const colorsHeader = useMemo(() => {
        if (header && header?.color in ThemeColor) {
            return ThemeColor[header?.color as keyof typeof ThemeColor]
        }
        return ThemeColor.orange
    }, [header]);
    const colorsHero = useMemo(() => {
        if (hero && hero?.color in ThemeColor) {
            return ThemeColor[hero?.color as keyof typeof ThemeColor]
        }
        return ThemeColor.orange
    }, [hero]);
    return (
        <div className={`${themeDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} h-full pb-4 min-h-[100vh]nv flex  justify-center`}>
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
                    <div className='pt-18 sm:pt-24 px-4'>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default previewPage