import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
import HeroOne from './HeroOne';
import HeroTwo from './HeroTwo';
import HeroThree from './HeroThree';

type Props = {
    theme: number
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
                    <HeroThree color={color} hero={hero} /> : ''
    )
}

export default HeroSection