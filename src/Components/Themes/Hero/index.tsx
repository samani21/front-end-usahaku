import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
import HeroOne from './HeroOne';
import HeroTwo from './HeroTwo';
import HeroThree from './HeroThree';
import HeroDarkLight from './HeroDarkLight';
import HeroFive from './HeroFive';
import HeroSix from './HeroSix';
import HeroSevent from './HeroSevent';
import HeroEight from './HeroEight';

type Props = {
    theme: number | string;
    color: ThemeColorSet;
    hero: Hero | null;
}

const HeroSection = ({ color, hero, theme }: Props) => {
    return (
        theme === 1 ?
            <HeroOne color={color} hero={hero} /> :
            theme === 2 ?
                <HeroTwo color={color} hero={hero} /> :
                theme === 3 ?
                    <HeroThree color={color} hero={hero} /> :
                    typeof theme === "string" && (theme === "Dark" || theme === "Light") ?
                        <HeroDarkLight color={color} hero={hero} themeMode={theme} /> :
                        theme === 5 ?
                            <HeroFive color={color} hero={hero} /> :
                            theme === 6 ?
                                <HeroSix color={color} hero={hero} /> :
                                theme === 7 ?
                                    <HeroSevent color={color} hero={hero} /> :
                                    theme === 8 ?
                                        <HeroEight color={color} hero={hero} /> : ''

    )
}

export default HeroSection