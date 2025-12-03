import React from 'react'
import HeroOne from './HeroOne';
import { Hero } from '@/lib/Types/Theme/Theme';
import HeroTwo from './HeroTwo';
import HeroThree from './HeroThree';

type Props = {
    theme: number;
    dataHero: Hero | null;
    color?: string;
}

const HeroSection = ({ theme, dataHero, color }: Props) => {
    return (
        theme === 1 ?
            <HeroOne dataHero={dataHero} /> :
            theme === 2 ?
                <HeroTwo color={color} dataHero={dataHero} /> :
                theme === 3 ?
                    <HeroThree color={color} dataHero={dataHero} /> : ''
    )
}

export default HeroSection