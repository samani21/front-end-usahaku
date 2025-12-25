import React from 'react';
import { DrawerType } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';

/* ===================== Drawer Variants ===================== */
import DrawerOne from './DrawerOne';
import DrawerTwo from './DrawerTwo';
import DrawerThree from './DrawerThree';
import DrawerDarkLight from './DrawerDarkLight';
import DrawerFive from './DrawerFive';
import DrawerSix from './DrawerSix';
import DrawerSevent from './DrawerSevent';
import DrawerEight from './DrawerEight';
import DrawerNine from './DrawerNine';

/* ===================== Props ===================== */
type Props = {
    theme: number | string;
    activeDrawer: DrawerType;
    closeDrawer: () => void;
    drawerTitle: string;
    children: React.ReactNode;
    color?: ThemeColorSet;
    themeMode: 'Dark' | 'Light';
};

const Drawer = ({
    theme,
    activeDrawer,
    closeDrawer,
    drawerTitle,
    children,
    color,
    themeMode
}: Props) => {
    const commonProps = {
        isOpen: activeDrawer !== null,
        onClose: closeDrawer,
        title: drawerTitle,
        children,
        color,
        activeDrawer
    };

    /* ===================== Numeric Theme ===================== */
    switch (theme) {
        case 1:
            return <DrawerOne {...commonProps} />;
        case 2:
            return <DrawerTwo {...commonProps} />;
        case 3:
            return <DrawerThree {...commonProps} />;
        case 4:
            return <DrawerDarkLight
                {...commonProps}
                themeMode={themeMode}
            />;
        case 5:
            return <DrawerFive {...commonProps} />;
        case 6:
            return <DrawerSix {...commonProps} />;
        case 7:
            return <DrawerSevent {...commonProps} />;
        case 8:
            return <DrawerEight {...commonProps} />;
        case 9:
            return <DrawerNine {...commonProps} />;
        default:
            return null;
    }
};

export default Drawer;
