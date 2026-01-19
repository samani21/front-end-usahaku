import { useEffect, useMemo, useState } from 'react';
import MainLayout from '../Layout/MainLayout'
import { Get } from '@/utils/Get';
import { Catalog, ResHeader, ResHero } from '@/Types/config';
import HeaderConfig from '@/Components/ThemeConfig/HeaderConfig';
import { ThemeColor } from '@/lib/Types/Theme/ThemeColor';
import HeroConfig from '@/Components/ThemeConfig/HeroConfig';
import { Hero } from '@/lib/Types/Theme/theme';
import { ChevronLeftCircle } from 'lucide-react';
import { useRouter } from 'next/router';

const PreviewPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const [dataHeader, setDataHeader] = useState<ResHeader | null>(null)
    const [themeMode, setThemeMode] = useState<string>("Light");
    const [headerLayout, setHeaderLayout] = useState<number | null>(null);
    const [frameLogo, setFrameLogo] = useState<string>('');
    const [logo, setLogo] = useState<string | null>(null);
    const [span1, setSpan1] = useState<string>('Brand ');
    const [span2, setSpan2] = useState<string>('Catalog');

    const [heroLayout, setHeroLayout] = useState<number | null>(null);
    const [dataHero, setDataHero] = useState<ResHero | null>(null);
    const [deleteImage, setDeleImage] = useState<boolean>(true);
    useEffect(() => {
        getCalog();
    }, []);
    const getCalog = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: Catalog }>('/catalog');

            if (res?.success) {
                setDataHeader(res?.data?.header)
                setHeaderLayout(res?.data?.header?.theme ?? 0)
                setThemeMode(res?.data?.header?.theme === 1 ? "Dark" : "Light")
                if (res?.data?.header?.frame) {
                    setFrameLogo(res?.data?.header?.frame)
                }
                if (res?.data?.header?.logo) {
                    setLogo(res?.data?.header?.logo)
                }
                if (res?.data?.header?.span_one) {
                    setSpan1(res?.data?.header?.span_one)
                }
                if (res?.data?.header?.span_two) {
                    setSpan2(res?.data?.header?.span_two)
                }

                setDataHero(res?.data?.hero)
            }
        } finally {
            setLoading(false);
        }
    };

    const colors = useMemo(() => {
        // 1. Logika untuk warna Hero
        const heroColor = (dataHero?.color && dataHero.color in ThemeColor)
            ? ThemeColor[dataHero.color as keyof typeof ThemeColor]
            : ThemeColor.orange;

        // 2. Logika untuk warna Header
        const headerColor = (dataHeader?.color && dataHeader.color in ThemeColor)
            ? ThemeColor[dataHeader.color as keyof typeof ThemeColor]
            : ThemeColor.orange;

        // 3. Mengembalikan objek yang berisi keduanya
        return {
            hero: heroColor,
            header: headerColor
        };
    }, [dataHero, dataHeader]);
    const hero = useMemo(() => {
        setHeroLayout(dataHero?.theme ?? 0)
        setDeleImage(dataHero?.image ? false : true)
        const hero: Hero = {
            title: dataHero?.title,
            sub_title: dataHero?.subtitle,
            description: dataHero?.desc,
            cta: dataHero?.cta,
            image: dataHero?.image ? dataHero?.image : '',
            isFrame: dataHero?.frame ? true : false,
            frame: dataHero?.frame ? dataHero?.frame : '',
            iconDefault: dataHero?.image ? false : true,
            color: dataHero?.color ?? 'orange'
        }
        return hero
    }, [dataHero])


    return (
        <main className='h-[100vh] relative'>
            {
                headerLayout &&
                <HeaderConfig theme={headerLayout} color={colors?.header} themeMode={themeMode} logo={logo} span1={span1}
                    span2={span2} setThemeMode={setThemeMode} frameLogo={frameLogo} />
            }
            <div className={`flex items-start justify-center py-24  ${themeMode === "Dark" ? "bg-gray-900" : "bg-slate-50"} h-full`}>
                <div className='w-7xl px-2 sm:px-0'>
                    {
                        heroLayout &&
                        <HeroConfig
                            theme={heroLayout}
                            color={colors?.hero}
                            themeMode={themeMode}
                            dataHero={hero}
                            setThemeMode={setThemeMode}
                            deleteImage={deleteImage}
                        />
                    }
                </div>
            </div>
            <div onClick={() => router.replace('/panel/catalog')} className={`hidden sm:grid ${themeMode === "Dark" ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-gray-100"} absolute cursor-pointer top-4 left-6 p-1 rounded-full z-21`}>
                <ChevronLeftCircle size={36} />
            </div>
            <div onClick={() => router.replace('/panel/catalog')} className={`sm:hidden ${themeMode === "Dark" ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-gray-100"} absolute cursor-pointer bottom-12 right-6 p-1 rounded-full z-21`}>
                <ChevronLeftCircle size={36} />
            </div>
        </main>
    )
}

export default PreviewPage