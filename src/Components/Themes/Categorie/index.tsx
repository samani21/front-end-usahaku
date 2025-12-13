import { Category } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
import CategorieOne from './CategorieOne';
import CategorieTwo from './CategorieTwo';
import CategorieThree from './CategorieThree';
import CategorieDarkLight from './CategorieDarkLight';
import CategorieSix from './CategorieSix';
import CategorieFive from './CategorieFive';
import CategorieSevent from './CategorieSevent';
import CategorieEight from './CategorieEight';
import CategorieNine from './CategorieNine';

type Props = {
    color: ThemeColorSet;
    theme: number | string;
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
                    activeCategory={activeCategory} /> :
                theme === 3 ?
                    <CategorieThree
                        color={color}
                        categorie={categorie}
                        setActiveCategory={setActiveCategory}
                        activeCategory={activeCategory} /> :
                    typeof theme === "string" && (theme === "Dark" || theme === "Light") ?
                        <CategorieDarkLight
                            color={color}
                            categorie={categorie}
                            setActiveCategory={setActiveCategory}
                            activeCategory={activeCategory}
                            themeMode={theme} /> :
                        theme === 5 ?
                            <CategorieFive
                                color={color}
                                categorie={categorie}
                                setActiveCategory={setActiveCategory}
                                activeCategory={activeCategory} /> :
                            theme === 6 ?
                                <CategorieSix
                                    color={color}
                                    categorie={categorie}
                                    setActiveCategory={setActiveCategory}
                                    activeCategory={activeCategory} /> :
                                theme === 7 ?
                                    <CategorieSevent
                                        color={color}
                                        categorie={categorie}
                                        setActiveCategory={setActiveCategory}
                                        activeCategory={activeCategory} /> :
                                    theme === 8 ?
                                        <CategorieEight
                                            color={color}
                                            categorie={categorie}
                                            setActiveCategory={setActiveCategory}
                                            activeCategory={activeCategory} /> :
                                        theme === 9 ?
                                            <CategorieNine
                                                color={color}
                                                categorie={categorie}
                                                setActiveCategory={setActiveCategory}
                                                activeCategory={activeCategory} /> : ""
    )
}

export default Categorie