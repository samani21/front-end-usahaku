import React from 'react';
import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColor, ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';

/* ===================== Headers ===================== */
import HeaderOne from './HeaderOne';
import HeaderTwo from './HeaderTwo';
import HeaderThree from './HeaderThree';
import HeaderDarkLight from './HeaderDarkLight';
import HeaderFive from './HeaderFive';
import HeaderSix from './HeaderSix';
import HeaderSevent from './HeaderSevent';
import HeaderEight from './HeaderEight';
import HeaderNine from './HeaderNine';
import HeaderTen from './HeaderTen';
import HeaderEleven from './HeaderEleven';
import HeaderTwelve from './HeaderTwelve';
import { Header } from '@/lib/Types/Theme/theme';

/* ===================== Props ===================== */
type Props = {
    theme: number | string;
    color?: string;
    openDrawer: (val: DrawerType) => void;
    favoriteProducts: Product[];
    cart: OrderItem[];
    history: OrderItem[];
    toggleTheme?: () => void;
    isService?: boolean;
    handleChangeBusiness?: (val: boolean) => void;
    themeMode: 'Dark' | 'Light';
    header: Header | null
};

const HeaderSeaction = ({
    theme,
    color,
    openDrawer,
    favoriteProducts,
    cart,
    history,
    toggleTheme,
    isService,
    handleChangeBusiness,
    themeMode,
    header
}: Props) => {

    const colors: ThemeColorSet = ThemeColor[color as keyof typeof ThemeColor];
    const commonProps = {
        colors,
        openDrawer,
        favoriteProducts,
        cart,
        history,
        isService,
        handleChangeBusiness,
        themeMode,
        header
    };
    /* ===================== Numeric Theme ===================== */
    switch (theme) {
        case 1:
            return <HeaderOne {...commonProps} color={colors} />;
        case 2:
            return <HeaderTwo {...commonProps} color={colors} />;
        case 3:
            return <HeaderThree {...commonProps} color={colors} />;
        case 4:
            return <HeaderDarkLight {...commonProps} themeMode={themeMode}
                onThemeToggle={toggleTheme} color={colors} />;
        case 5:
            return <HeaderFive {...commonProps} color={colors} />;
        case 6:
            return <HeaderSix {...commonProps} color={colors} />;
        case 7:
            return <HeaderSevent {...commonProps} color={colors} />;
        case 8:
            return <HeaderEight {...commonProps} color={colors} />;
        case 9:
            return <HeaderNine {...commonProps} color={colors} />;
        case 10:
            return <HeaderTen {...commonProps} color={colors} />;
        case 11:
            return <HeaderEleven {...commonProps} color={colors} />;
        case 12:
            return <HeaderTwelve {...commonProps} color={colors} />;
        default:
            return null;
    }
};

export default HeaderSeaction;
