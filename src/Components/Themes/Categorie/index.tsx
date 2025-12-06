import { Category } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
import CategorieOne from './CategorieOne';
import CategorieTwo from './CategorieTwo';

type Props = {
    color: ThemeColorSet;
    theme: number;
    categorie: Category[];
    setActiveCategory: (val: string) => void;
    activeCategory: string
}

const Categorie = ({ color, theme, categorie, setActiveCategory, activeCategory }: Props) => {
    return (
        theme === 1 ?
            <CategorieOne
                color={color}
                categorie={categorie}
                setActiveCategory={setActiveCategory}
                activeCategory={activeCategory} /> :
            theme === 2 ?
                <CategorieTwo
                    color={color}
                    categorie={categorie}
                    setActiveCategory={setActiveCategory}
                    activeCategory={activeCategory} /> : ''
    )
}

export default Categorie