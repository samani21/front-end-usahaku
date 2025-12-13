import React from 'react'
import DrawerOne from './DrawerOne';
import { DrawerType, OrderItem } from '@/hooks/Theme/useProductCatalog';
import DrawerTwo from './DrawerTwo';
import DrawerThree from './DrawerThree';
import DrawerDarkLight from './DrawerDarkLight';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import DrawerFive from './DrawerFive';
import DrawerSix from './DrawerSix';
import DrawerSevent from './DrawerSevent';
import DrawerEight from './DrawerEight';
import DrawerNine from './DrawerNine';

type Props = {
    theme: number | string;
    activeDrawer: DrawerType;
    closeDrawer: () => void;
    drawerTitle: string
    children: React.ReactNode;
    color?: ThemeColorSet;
}

const Drawer = ({ theme, activeDrawer, closeDrawer, drawerTitle, children, color }: Props) => {
    return (
        theme === 1 ?
            <DrawerOne
                isOpen={activeDrawer !== null}
                onClose={closeDrawer}
                title={drawerTitle}
                children={children} /> :
            theme === 2 ?
                <DrawerTwo
                    isOpen={activeDrawer !== null}
                    onClose={closeDrawer}
                    title={drawerTitle}
                    children={children} /> :
                theme === 3 ?
                    <DrawerThree
                        isOpen={activeDrawer !== null}
                        onClose={closeDrawer}
                        title={drawerTitle}
                        children={children} /> :
                    typeof theme === "string" && (theme === "Dark" || theme === "Light") ?
                        <DrawerDarkLight
                            isOpen={activeDrawer !== null}
                            onClose={closeDrawer}
                            title={drawerTitle}
                            children={children}
                            themeMode={theme}
                            color={color} /> :
                        theme === 5 ?
                            <DrawerFive
                                isOpen={activeDrawer !== null}
                                onClose={closeDrawer}
                                title={drawerTitle}
                                children={children}
                                color={color} /> :
                            theme === 6 ?
                                <DrawerSix
                                    isOpen={activeDrawer !== null}
                                    onClose={closeDrawer}
                                    title={drawerTitle}
                                    children={children}
                                    color={color} /> :
                                theme === 7 ?
                                    <DrawerSevent
                                        isOpen={activeDrawer !== null}
                                        onClose={closeDrawer}
                                        title={drawerTitle}
                                        children={children}
                                        color={color} /> :
                                    theme === 8 ?
                                        <DrawerEight
                                            isOpen={activeDrawer !== null}
                                            onClose={closeDrawer}
                                            title={drawerTitle}
                                            children={children}
                                            color={color} /> :
                                        theme === 9 ?
                                            <DrawerNine
                                                isOpen={activeDrawer !== null}
                                                onClose={closeDrawer}
                                                title={drawerTitle}
                                                children={children}
                                                color={color} /> : ''
    )
}

export default Drawer