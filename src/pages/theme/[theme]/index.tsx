import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react'
import ThemeOne from './components/ThemeOne';
import { Get } from '@/utils/Get';
import { Theme } from '@/lib/Types/Theme/theme';
import Loading from '@/Components/component/Loading';
import ThemeTwo from './components/ThemeTwo';

const ThemePage = () => {
    const router = useRouter();
    const { theme } = router.query;
    const [loading, setLoading] = useState<boolean>(false);
    const [themeName, setThemeName] = useState('Jingga');
    const [listTheme, setListTheme] = useState<Theme[]>([]);
    useEffect(() => {
        getColorTheme()
    }, [])
    const getColorTheme = async () => {
        try {
            setLoading(true)
            const res = await Get<{ success: boolean; data: Theme[] }>(
                `/color-theme`
            );

            if (res?.success) {
                setListTheme(res?.data)
                setThemeName(res?.data[0]?.name)
            }
        } catch (err: any) {
            setLoading(false)
        }
        setLoading(false)
    }
    const ColorPrimary = useMemo(() => {
        const color = listTheme?.find((t) => t?.name === themeName)?.primary
        return color || listTheme[0]?.primary
    }, [listTheme, themeName]);
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        theme === '1' ?
            <ThemeOne themeName={themeName}
                listTheme={listTheme} color={ColorPrimary} setThemeName={setThemeName} /> :
            theme === '2' ?
                <ThemeTwo themeName={themeName}
                    listTheme={listTheme} color={ColorPrimary} setThemeName={setThemeName} /> : ''
    )
}

export default ThemePage