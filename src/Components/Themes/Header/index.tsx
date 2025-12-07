import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
import HeaderOne from './HeaderOne';
import HeaderTwo from './HeaderTwo';
import HeaderThree from './HeaderThree';
import HeaderDarkLight from './HeaderDarkLight';

type Props = {
    theme: number | string;
    color: ThemeColorSet;
    openDrawer: (val: DrawerType) => void;
    favoriteProducts: Product[];
    cart: OrderItem[];
    history: OrderItem[];
    toggleTheme?: () => void;
}

const Header = ({ theme, color, openDrawer, favoriteProducts, cart, history, toggleTheme }: Props) => {
    return (
        theme === 1 ? <HeaderOne color={color}
            openDrawer={openDrawer}
            favoriteProducts={favoriteProducts}
            cart={cart}
            history={history} /> :
            theme === 2 ? <HeaderTwo color={color}
                openDrawer={openDrawer}
                favoriteProducts={favoriteProducts}
                cart={cart}
                history={history} /> :
                theme === 3 ? <HeaderThree color={color}
                    openDrawer={openDrawer}
                    favoriteProducts={favoriteProducts}
                    cart={cart}
                    history={history} /> :
                    typeof theme === "string" && (theme === "Dark" || theme === "Light") ?
                        <HeaderDarkLight
                            color={color}
                            onThemeToggle={toggleTheme}
                            openDrawer={openDrawer}
                            favoriteProducts={favoriteProducts}
                            cart={cart}
                            history={history}
                            themeMode={theme} /> : ''
    )
}

export default Header