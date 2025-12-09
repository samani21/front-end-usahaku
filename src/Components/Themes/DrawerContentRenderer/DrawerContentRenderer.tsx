import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
import DrawerContentRendererOne from './DrawerContentRendererOne';
import DrawerContentRendererTwo from './DrawerContentRendererTwo';
import DrawerContentRendererThree from './DrawerContentRendererThree';
import DrawerContentRendererDarkLight from './DrawerContentRendererDarkLight';
import DrawerContentRendererFive from './DrawerContentRendererFive';
import DrawerContentRendererSix from './DrawerContentRendererSix';
import DrawerContentRendererSevent from './DrawerContentRendererSevent';

type Props = {
    theme: number | string
    type: DrawerType;
    color: ThemeColorSet;
    favoriteProducts: Product[];
    cart: OrderItem[];
    history: OrderItem[];
    cartTotal: number;
    handleToggleFavorite: (id: number) => void;
    handleRemoveFromCart: (index: number) => void;
    activeDrawer: DrawerType;
    openDetailModal?: (val: Product) => void
}

const DrawerContentRenderer = ({ theme, activeDrawer, type, color, favoriteProducts, cart, history, cartTotal, handleToggleFavorite, handleRemoveFromCart, openDetailModal }: Props) => {
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
                        handleRemoveFromCart={handleRemoveFromCart} /> :
                    typeof theme === "string" && (theme === "Dark" || theme === "Light") ?
                        <DrawerContentRendererDarkLight
                            type={activeDrawer}
                            color={color}
                            favoriteProducts={favoriteProducts}
                            cart={cart}
                            history={history}
                            cartTotal={cartTotal}
                            handleToggleFavorite={handleToggleFavorite}
                            handleRemoveFromCart={handleRemoveFromCart}
                            themeMode={theme}
                            openModal={openDetailModal} /> :
                        theme === 5 ?
                            <DrawerContentRendererFive
                                type={activeDrawer}
                                color={color}
                                favoriteProducts={favoriteProducts}
                                cart={cart}
                                history={history}
                                cartTotal={cartTotal}
                                handleToggleFavorite={handleToggleFavorite}
                                handleRemoveFromCart={handleRemoveFromCart} /> :
                            theme === 6 ?
                                <DrawerContentRendererSix
                                    type={activeDrawer}
                                    color={color}
                                    favoriteProducts={favoriteProducts}
                                    cart={cart}
                                    history={history}
                                    cartTotal={cartTotal}
                                    handleToggleFavorite={handleToggleFavorite}
                                    handleRemoveFromCart={handleRemoveFromCart} /> :
                                theme === 7 ?
                                    <DrawerContentRendererSevent
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