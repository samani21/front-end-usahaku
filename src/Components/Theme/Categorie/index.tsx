import React from 'react'
import CategorieOne from './CategorieOne';
import CategorieTwo from './CategorieTwo';
import { Category } from '@/lib/Types/Theme/Theme';
import CategorieThree from './CategorieThree';

type Props = {
    theme: number;
    categorie: Category[];
    setActiveCategory: (val: string) => void;
    activeCategory: string;
    color?: string
}

const Categorie = ({ theme, setActiveCategory, activeCategory, categorie, color }: Props) => {
    return (
        theme === 1 ?
            <CategorieOne categorie={categorie} setActiveCategory={setActiveCategory} activeCategory={activeCategory} /> :
            theme === 2 ? <CategorieTwo categorie={categorie} setActiveCategory={setActiveCategory} activeCategory={activeCategory} color={color} /> :
                theme === 3 ? <CategorieThree categorie={categorie} setActiveCategory={setActiveCategory} activeCategory={activeCategory} color={color} /> : ''
    )
}

export default Categorie