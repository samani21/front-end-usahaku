import React from 'react'
import CategorieOne from './CategorieOne';

type Props = {
    theme: number;
    categorie: string[] | undefined;
    setActiveCategory: (val: string) => void;
    activeCategory: string;
}

const Categorie = ({ theme, setActiveCategory, activeCategory, categorie }: Props) => {
    return (
        theme === 1 ?
            <CategorieOne categorie={categorie} setActiveCategory={setActiveCategory} activeCategory={activeCategory} /> : ''
    )
}

export default Categorie