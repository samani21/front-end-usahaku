import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
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

type Props = {
    theme: number | string;
    color: ThemeColorSet;
    openDrawer: (val: DrawerType) => void;
    favoriteProducts: Product[];
    cart: OrderItem[];
    history: OrderItem[];
    toggleTheme?: () => void;
    isService?: boolean
    handleChangeBusiness?: (val: boolean) => void;
}

const Header = ({ theme, color, openDrawer, favoriteProducts, cart, history, toggleTheme, isService, handleChangeBusiness }: Props) => {
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
                            themeMode={theme} /> :
                        theme === 5 ?
                            <HeaderFive color={color}
                                openDrawer={openDrawer}
                                favoriteProducts={favoriteProducts}
                                cart={cart}
                                history={history} /> :
                            theme === 6 ? <HeaderSix color={color}
                                openDrawer={openDrawer}
                                favoriteProducts={favoriteProducts}
                                cart={cart}
                                history={history} /> :
                                theme === 7 ? <HeaderSevent color={color}
                                    openDrawer={openDrawer}
                                    favoriteProducts={favoriteProducts}
                                    cart={cart}
                                    history={history} /> :
                                    theme === 8 ? <HeaderEight color={color}
                                        openDrawer={openDrawer}
                                        favoriteProducts={favoriteProducts}
                                        cart={cart}
                                        history={history}
                                        isService={isService}
                                        handleChangeBusiness={handleChangeBusiness} /> :
                                        theme === 9 ? <HeaderNine color={color}
                                            openDrawer={openDrawer}
                                            favoriteProducts={favoriteProducts}
                                            cart={cart}
                                            history={history}
                                            isService={isService}
                                            handleChangeBusiness={handleChangeBusiness} /> :
                                            theme === 10 ? <HeaderTen color={color}
                                                openDrawer={openDrawer}
                                                favoriteProducts={favoriteProducts}
                                                cart={cart}
                                                history={history}
                                                isService={isService}
                                                handleChangeBusiness={handleChangeBusiness} /> : ''
    )
}

export default Header