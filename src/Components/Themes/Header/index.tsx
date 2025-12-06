import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
import HeaderOne from './HeaderOne';
import HeaderTwo from './HeaderTwo';
import HeaderThree from './HeaderThree';

type Props = {
    theme: number
    color: ThemeColorSet;
    openDrawer: (val: DrawerType) => void;
    favoriteProducts: Product[];
    cart: OrderItem[];
    history: OrderItem[];
}

const Header = ({ theme, color, openDrawer, favoriteProducts, cart, history }: Props) => {
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
                    history={history} /> : ''
    )
}

export default Header