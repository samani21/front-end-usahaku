import { Product } from '@/hooks/Theme/useProductCatalog'
import React from 'react'
import One from './One'
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
import Twelve from './Twelve';
import Elevent from './Elevent';

type Props = {
    theme: number;
    color: ThemeColorSet;
    product: Product;
    handleFav: (id: number) => void;
    onClick: () => void;
    themeMode: "Light" | "Dark"
}


const ProductConfig = ({ theme, color, product, handleFav, onClick, themeMode }: Props) => {
    const component = {
        product,
        color,
        handleFav,
        onClick,
        themeMode
    }
    switch (theme) {
        case 1:
            return <One {...component} />;
        case 2:
            return <Two {...component} />;
        case 3:
            return <Three {...component} />;
        case 4:
            return <Four {...component} />;
        case 5:
            return <Five {...component} />;
        case 6:
            return <Six {...component} />;
        case 7:
            return <Sevent {...component} />;
        case 8:
            return <Eight {...component} />;
        case 9:
            return <Nine {...component} />;
        case 10:
            return <Ten {...component} />;
        case 11:
            return <Elevent {...component} />;
        case 12:
            return <Twelve {...component} />;
        default:
            return null;
    }
}

export default ProductConfig