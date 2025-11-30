import React from 'react'
import HeroOne from './HeroOne';
import { Hero } from '@/lib/Types/Theme/Theme';

type Props = {
    theme: number;
    dataHero: Hero | null;
}

const HeroSection = ({ theme, dataHero }: Props) => {
    return (
        theme === 1 ?
            <HeroOne dataHero={dataHero} /> : ''
    )
}

export default HeroSection