import HeaderConfig from '@/Components/ThemeConfig/Header';
import HeroConfig from '@/Components/ThemeConfig/Hero';
import { ThemeColor } from '@/lib/Theme/ThemeColor';
import { Catalog, ResHeader } from '@/Types/config';
import { Get } from '@/utils/Get';
import React, { useEffect, useMemo, useState } from 'react'

const previewPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [header, setHeader] = useState<ResHeader>();
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
    return (
        <div className={`${themeDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} h-[100vh] flex  justify-center`}>
            <div className='w-full max-w-7xl'>
                {header &&
                    <HeaderConfig
                        isBuild={true}
                        theme={header?.id}
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
        </div>
    )
}

export default previewPage