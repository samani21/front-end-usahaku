import React from 'react';
import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';

/* ===================== Renderer Variants ===================== */
import DrawerContentRendererOne from './DrawerContentRendererOne';
import DrawerContentRendererTwo from './DrawerContentRendererTwo';
import DrawerContentRendererThree from './DrawerContentRendererThree';
import DrawerContentRendererDarkLight from './DrawerContentRendererDarkLight';
import DrawerContentRendererFive from './DrawerContentRendererFive';
import DrawerContentRendererSix from './DrawerContentRendererSix';
import DrawerContentRendererSevent from './DrawerContentRendererSevent';
import DrawerContentRendererEight from './DrawerContentRendererEight';
import DrawerContentRendererNine from './DrawerContentRendererNine';

/* ===================== Props ===================== */
type Props = {
    theme: number | string;
    type: DrawerType;
    color: ThemeColorSet;
    favoriteProducts: Product[];
    cart: OrderItem[];
    history: OrderItem[];
    cartTotal: number;
    handleToggleFavorite: (id: number) => void;
    handleRemoveFromCart: (index: number) => void;
    activeDrawer: DrawerType;
    openDetailModal?: (val: Product) => void;
    handleCheckout: () => void;
    themeMode: 'Dark' | 'Light';
};

const DrawerContentRenderer = ({
    theme,
    activeDrawer,
    color,
    favoriteProducts,
    cart,
    history,
    cartTotal,
    handleToggleFavorite,
    handleRemoveFromCart,
    openDetailModal,
    handleCheckout,
    themeMode
}: Props) => {
    const commonProps = {
        type: activeDrawer,
        color,
        favoriteProducts,
        cart,
        history,
        cartTotal,
        handleToggleFavorite,
        handleRemoveFromCart,
        handleCheckout
    };

    /* ===================== Numeric Theme ===================== */
    switch (theme) {
        case 1:
            return <DrawerContentRendererOne {...commonProps} />;
        case 2:
            return <DrawerContentRendererTwo {...commonProps} />;
        case 3:
            return <DrawerContentRendererThree {...commonProps} />;
        case 4:
            return <DrawerContentRendererDarkLight
                {...commonProps}
                themeMode={themeMode}
                openModal={openDetailModal}
                handleCheckout={handleCheckout}
            />;
        case 5:
            return <DrawerContentRendererFive {...commonProps} />;
        case 6:
            return <DrawerContentRendererSix {...commonProps} />;
        case 7:
            return <DrawerContentRendererSevent {...commonProps} />;
        case 8:
            return <DrawerContentRendererEight {...commonProps} />;
        case 9:
            return <DrawerContentRendererNine {...commonProps} />;
        default:
            return null;
    }
};

export default DrawerContentRenderer;
