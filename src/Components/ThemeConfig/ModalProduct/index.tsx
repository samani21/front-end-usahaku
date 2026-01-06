import React from 'react'
import One from './One';
import { Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import Two from './Two';
import Three from './Three';
import Four from './Four';
import Five from './Five';
import Six from './Six';
import Sevent from './Sevent';
import Eight from './Eight';
import Nine from './Nine';
import Ten from './Ten';
import Elevent from './Elevent';
import Twelve from './Twelve';

type Props = {
    theme: number;
    product: Product;
    onClose: () => void
    color: ThemeColorSet;
    themeMode: "Light" | "Dark"
}

const ModalProduct = ({ theme, product, onClose, color, themeMode }: Props) => {
    const component = {
        product,
        onClose,
        color,
        themeMode
    }
    switch (theme) {
        case 1:
            return <One {...component} />
        case 2:
            return <Two {...component} />
        case 3:
            return <Three {...component} />
        case 4:
            return <Four {...component} />
        case 5:
            return <Five {...component} />
        case 6:
            return <Six {...component} />
        case 7:
            return <Sevent {...component} />
        case 8:
            return <Eight {...component} />
        case 9:
            return <Nine {...component} />
        case 10:
            return <Ten {...component} />
        case 11:
            return <Elevent {...component} />
        case 12:
            return <Twelve {...component} />
        default:
            return null;
    }
}

export default ModalProduct