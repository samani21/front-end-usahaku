import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
import DrawerContentRendererOne from './DrawerContentRendererOne';
import DrawerContentRendererTwo from './DrawerContentRendererTwo';
import DrawerContentRendererThree from './DrawerContentRendererThree';

type Props = {
    theme: number
    type: DrawerType;
    color: ThemeColorSet;
    favoriteProducts: Product[];
    cart: OrderItem[];
    history: OrderItem[];
    cartTotal: number;
    handleToggleFavorite: (id: number) => void;
    handleRemoveFromCart: (index: number) => void;
    activeDrawer: DrawerType;
}

const DrawerContentRenderer = ({ theme, activeDrawer, type, color, favoriteProducts, cart, history, cartTotal, handleToggleFavorite, handleRemoveFromCart }: Props) => {
    return (
        theme === 1 ?
            <DrawerContentRendererOne
                type={activeDrawer}
                color={color}
                favoriteProducts={favoriteProducts}
                cart={cart}
                history={history}
                cartTotal={cartTotal}
                handleToggleFavorite={handleToggleFavorite}
                handleRemoveFromCart={handleRemoveFromCart} /> :
            theme === 2 ?
                <DrawerContentRendererTwo
                    type={activeDrawer}
                    color={color}
                    favoriteProducts={favoriteProducts}
                    cart={cart}
                    history={history}
                    cartTotal={cartTotal}
                    handleToggleFavorite={handleToggleFavorite}
                    handleRemoveFromCart={handleRemoveFromCart} /> :
                theme === 3 ?
                    <DrawerContentRendererThree
                        type={activeDrawer}
                        color={color}
                        favoriteProducts={favoriteProducts}
                        cart={cart}
                        history={history}
                        cartTotal={cartTotal}
                        handleToggleFavorite={handleToggleFavorite}
                        handleRemoveFromCart={handleRemoveFromCart} /> : ''
    )
}

export default DrawerContentRenderer