import React from 'react';
import { Category } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';

/* ===================== Components ===================== */
import CategorieOne from './CategorieOne';
import CategorieTwo from './CategorieTwo';
import CategorieThree from './CategorieThree';
import CategorieDarkLight from './CategorieDarkLight';
import CategorieFive from './CategorieFive';
import CategorieSix from './CategorieSix';
import CategorieSevent from './CategorieSevent';
import CategorieEight from './CategorieEight';
import CategorieNine from './CategorieNine';

/* ===================== Props ===================== */
type Props = {
    color: ThemeColorSet;
    theme: number | string;
    categorie: Category[];
    setActiveCategory: (val: string) => void;
    activeCategory: string;
    themeMode: 'Dark' | 'Light';
};

const Categorie = ({
    color,
    theme,
    categorie,
    setActiveCategory,
    activeCategory,
    themeMode
}: Props) => {
    const commonProps = {
        color,
        categorie,
        setActiveCategory,
        activeCategory,
    };


    /* ===================== Numeric Theme ===================== */
    switch (theme) {
        case 1:
            return <CategorieOne {...commonProps} />;
        case 2:
            return <CategorieTwo {...commonProps} />;
        case 3:
            return <CategorieThree {...commonProps} />;
        case 4:
            return <CategorieDarkLight {...commonProps}
                themeMode={themeMode}
            />;
        case 5:
            return <CategorieFive {...commonProps} />;
        case 6:
            return <CategorieSix {...commonProps} />;
        case 7:
            return <CategorieSevent {...commonProps} />;
        case 8:
            return <CategorieEight {...commonProps} />;
        case 9:
            return <CategorieNine {...commonProps} />;
        default:
            return null;
    }
};

export default Categorie;
