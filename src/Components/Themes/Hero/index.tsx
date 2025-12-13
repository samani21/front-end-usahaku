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
import HeroNine from './HeroNine';
import HeroTen from './HeroTen';

type Props = {
    theme: number | string;
    color: ThemeColorSet;
    hero: Hero | null;
    clientQueueNumber?: number;
    currentQueueNumber?: number;
    handleNextQueue?: () => void;
}

const HeroSection = ({ color, hero, theme, clientQueueNumber, currentQueueNumber, handleNextQueue }: Props) => {
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
                                        <HeroEight color={color} hero={hero} /> :
                                        theme === 9 ?
                                            <HeroNine color={color} hero={hero} clientQueueNumber={clientQueueNumber} currentQueueNumber={currentQueueNumber} handleNextQueue={handleNextQueue} /> :
                                            theme === 10 ?
                                                <HeroTen color={color} hero={hero} clientQueueNumber={clientQueueNumber} currentQueueNumber={currentQueueNumber} handleNextQueue={handleNextQueue} /> : ''

    )
}

export default HeroSection