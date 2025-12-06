import React from 'react'
import DrawerOne from './DrawerOne';
import { DrawerType } from '@/hooks/Theme/useProductCatalog';
import DrawerTwo from './DrawerTwo';

type Props = {
    theme: number;
    activeDrawer: DrawerType;
    closeDrawer: () => void;
    drawerTitle: string
    children: React.ReactNode;
}

const Drawer = ({ theme, activeDrawer, closeDrawer, drawerTitle, children }: Props) => {
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
                    children={children} /> : ''
    )
}

export default Drawer