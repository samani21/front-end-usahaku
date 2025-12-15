import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { Get } from '@/utils/Get';
import { Theme, ThemeSection } from '@/lib/Types/Theme/theme';
import Loading from '@/Components/component/Loading';
import ThemeComponents from './components/ThemeComponents';

const ThemePage = () => {
    const router = useRouter();
    const { theme } = router.query;

    const [loading, setLoading] = useState(false);
    const [themeName, setThemeName] = useState('zinc');
    const [listTheme, setListTheme] = useState<Theme[]>([]);

    /* ===================== FETCH COLOR THEME ===================== */
    const getColorTheme = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: Theme[] }>('/color-theme');

            if (res?.success) {
                setListTheme(res.data);
                setThemeName(res.data?.[0]?.categorie_maps?.[0]?.name);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getColorTheme();
    }, []);

    /* ===================== COLOR PRIMARY ===================== */
    const colorPrimary = useMemo(() => {
        const foundTheme = listTheme.find((t) =>
            t.categorie_maps?.some((cm) => cm.name === themeName)
        );

        return (
            foundTheme?.categorie_maps?.find((cm) => cm.name === themeName)
                ?.primary || listTheme?.[0]?.categorie_maps?.[0]?.primary
        );
    }, [listTheme, themeName]);

    /* ===================== THEME SECTION CONFIG ===================== */
    const themeSection: ThemeSection = useMemo(() => {
        switch (String(theme)) {
            case '1':
                return {
                    header: 1,
                    mapTable: 0,
                    productRecomended: 0,
                    hero: 1,
                    typeProduct: 0,
                    categorie: 1,
                    cardProduct: 1,
                    queue: 0,
                    modalProductDetail: 1,
                    drawer: 1,
                    drawerContentRenderer: 1,
                    isService: false,
                    dark: true
                };

            case '2':
                return {
                    header: 2,
                    mapTable: 0,
                    productRecomended: 0,
                    hero: 2,
                    typeProduct: 0,
                    categorie: 2,
                    cardProduct: 2,
                    queue: 0,
                    modalProductDetail: 2,
                    drawer: 2,
                    drawerContentRenderer: 2,
                    isService: false,
                    dark: false
                };
            case '3':
                return {
                    header: 3,
                    mapTable: 0,
                    productRecomended: 0,
                    hero: 3,
                    typeProduct: 0,
                    categorie: 3,
                    cardProduct: 3,
                    queue: 0,
                    modalProductDetail: 3,
                    drawer: 3,
                    drawerContentRenderer: 3,
                    isService: false,
                    dark: false
                };

            case '4':
                return {
                    header: 4,
                    mapTable: 0,
                    productRecomended: 0,
                    hero: 4,
                    typeProduct: 0,
                    categorie: 4,
                    cardProduct: 4,
                    queue: 0,
                    modalProductDetail: 4,
                    drawer: 4,
                    drawerContentRenderer: 4,
                    isService: false,
                    dark: true
                };

            case '5':
                return {
                    header: 5,
                    mapTable: 0,
                    productRecomended: 0,
                    hero: 5,
                    typeProduct: 0,
                    categorie: 5,
                    cardProduct: 5,
                    queue: 0,
                    modalProductDetail: 5,
                    drawer: 5,
                    drawerContentRenderer: 5,
                    isService: false,
                    dark: false
                };

            case '6':
                return {
                    header: 6,
                    mapTable: 0,
                    productRecomended: 0,
                    hero: 6,
                    typeProduct: 0,
                    categorie: 6,
                    cardProduct: 6,
                    queue: 0,
                    modalProductDetail: 6,
                    drawer: 6,
                    drawerContentRenderer: 6,
                    isService: false,
                    dark: false
                };

            case '7':
                return {
                    header: 7,
                    mapTable: 0,
                    productRecomended: 0,
                    hero: 7,
                    typeProduct: 0,
                    categorie: 7,
                    cardProduct: 7,
                    queue: 0,
                    modalProductDetail: 7,
                    drawer: 7,
                    drawerContentRenderer: 7,
                    isService: true,
                    dark: false,
                };

            case '8':
                return {
                    header: 8,
                    mapTable: 0,
                    productRecomended: 0,
                    hero: 8,
                    typeProduct: 1,
                    categorie: 7,
                    cardProduct: 8,
                    queue: 0,
                    modalProductDetail: 8,
                    drawer: 8,
                    drawerContentRenderer: 8,
                    isService: false,
                    dark: false
                };

            case '9':
                return {
                    header: 9,
                    mapTable: 3,
                    productRecomended: 0,
                    hero: 9,
                    typeProduct: 1,
                    categorie: 9,
                    cardProduct: 9,
                    queue: 0,
                    modalProductDetail: 10,
                    drawer: 8,
                    drawerContentRenderer: 8,
                    isService: true,
                    dark: false
                };

            case '10':
                return {
                    header: 10,
                    mapTable: 0,
                    productRecomended: 0,
                    hero: 10,
                    typeProduct: 1,
                    categorie: 2,
                    cardProduct: 10,
                    queue: 1,
                    modalProductDetail: 11,
                    drawer: 9,
                    drawerContentRenderer: 9,
                    isService: true,
                    dark: false
                };

            case '11':
                return {
                    header: 11,
                    mapTable: 1,
                    productRecomended: 0,
                    hero: 11,
                    typeProduct: 1,
                    categorie: 9,
                    cardProduct: 11,
                    queue: 1,
                    modalProductDetail: 12,
                    drawer: 9,
                    drawerContentRenderer: 9,
                    isService: false,
                    dark: false
                };

            case '12':
                return {
                    header: 12,
                    mapTable: 2,
                    productRecomended: 1,
                    hero: 11,
                    typeProduct: 1,
                    categorie: 9,
                    cardProduct: 12,
                    queue: 1,
                    modalProductDetail: 12,
                    drawer: 9,
                    drawerContentRenderer: 9,
                    isService: false,
                    dark: false
                };

            default:
                return {
                    header: 0,
                    mapTable: 0,
                    productRecomended: 0,
                    hero: 0,
                    typeProduct: 0,
                    categorie: 0,
                    cardProduct: 0,
                    queue: 0,
                    modalProductDetail: 0,
                    drawer: 0,
                    isService: false,
                    dark: false,
                    drawerContentRenderer: 0,
                };
        }
    }, [theme]);


    /* ===================== LOADING ===================== */
    if (loading) {
        return <Loading />;
    }

    /* ===================== RENDER ===================== */
    return (
        <ThemeComponents
            themeName={themeName}
            listTheme={listTheme}
            color={colorPrimary}
            setThemeName={setThemeName}
            themeSections={themeSection}
            theme={Number(theme)}
        />
    );
};

export default ThemePage;
