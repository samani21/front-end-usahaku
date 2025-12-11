import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react'
import ThemeOne from './components/ThemeOne';
import { Get } from '@/utils/Get';
import { Theme } from '@/lib/Types/Theme/theme';
import Loading from '@/Components/component/Loading';
import ThemeTwo from './components/ThemeTwo';
import ThemeThree from './components/ThemeThree';
import ThemeFour from './components/ThemeFour';
import ThemeFive from './components/ThemeFive';
import ThemeSix from './components/ThemeSix';
import ThemeSevent from './components/ThemeSevent';
import ThemeEight from './components/ThemeEight';
import ThemeNine from './components/ThemeNine';

const ThemePage = () => {
    const router = useRouter();
    const { theme } = router.query;
    const [loading, setLoading] = useState<boolean>(false);
    const [themeName, setThemeName] = useState('zinc');
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
                setThemeName(res?.data[0]?.categorie_maps[0]?.name)
            }
        } catch (err: any) {
            setLoading(false)
        }
        setLoading(false)
    }
    const ColorPrimary = useMemo(() => {
        const foundTheme = listTheme?.find((t) =>
            t?.categorie_maps?.some((cm) => cm?.name === themeName)
        );

        const foundColor = foundTheme?.categorie_maps?.find(
            (cm) => cm?.name === themeName
        )?.primary;

        return foundColor || listTheme?.[0]?.categorie_maps?.[0]?.primary;
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
                    listTheme={listTheme} color={ColorPrimary} setThemeName={setThemeName} /> :
                theme === '3' ?
                    <ThemeThree themeName={themeName}
                        listTheme={listTheme} color={ColorPrimary} setThemeName={setThemeName} /> :
                    theme === '4' ?
                        <ThemeFour themeName={themeName}
                            listTheme={listTheme} color={ColorPrimary} setThemeName={setThemeName} /> :
                        theme === '5' ?
                            <ThemeFive themeName={themeName}
                                listTheme={listTheme} color={ColorPrimary} setThemeName={setThemeName} /> :
                            theme === '6' ?
                                <ThemeSix themeName={themeName}
                                    listTheme={listTheme} color={ColorPrimary} setThemeName={setThemeName} /> :
                                theme === '7' ?
                                    <ThemeSevent themeName={themeName}
                                        listTheme={listTheme} color={ColorPrimary} setThemeName={setThemeName} /> :
                                    theme === '8' ?
                                        <ThemeEight themeName={themeName}
                                            listTheme={listTheme} color={ColorPrimary} setThemeName={setThemeName} /> :
                                        theme === '9' ?
                                            <ThemeNine themeName={themeName}
                                                listTheme={listTheme} color={ColorPrimary} setThemeName={setThemeName} /> : ''
    )
}

export default ThemePage