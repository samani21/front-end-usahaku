import React from 'react';
import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';

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

/* ===================== Props ===================== */
type Props = {
    theme: number | string;
    color: ThemeColorSet;
    openDrawer: (val: DrawerType) => void;
    favoriteProducts: Product[];
    cart: OrderItem[];
    history: OrderItem[];
    toggleTheme?: () => void;
    isService?: boolean;
    handleChangeBusiness?: (val: boolean) => void;
    themeMode: 'Dark' | 'Light';
};

const Header = ({
    theme,
    color,
    openDrawer,
    favoriteProducts,
    cart,
    history,
    toggleTheme,
    isService,
    handleChangeBusiness,
    themeMode
}: Props) => {
    const commonProps = {
        color,
        openDrawer,
        favoriteProducts,
        cart,
        history,
        isService,
        handleChangeBusiness,
        themeMode
    };

    /* ===================== Numeric Theme ===================== */
    switch (theme) {
        case 1:
            return <HeaderOne {...commonProps} />;
        case 2:
            return <HeaderTwo {...commonProps} />;
        case 3:
            return <HeaderThree {...commonProps} />;
        case 4:
            return <HeaderDarkLight {...commonProps} themeMode={themeMode}
                onThemeToggle={toggleTheme} />;
        case 5:
            return <HeaderFive {...commonProps} />;
        case 6:
            return <HeaderSix {...commonProps} />;
        case 7:
            return <HeaderSevent {...commonProps} />;
        case 8:
            return <HeaderEight {...commonProps} />;
        case 9:
            return <HeaderNine {...commonProps} />;
        case 10:
            return <HeaderTen {...commonProps} />;
        case 11:
            return <HeaderEleven {...commonProps} />;
        case 12:
            return <HeaderTwelve {...commonProps} />;
        default:
            return null;
    }
};

export default Header;
