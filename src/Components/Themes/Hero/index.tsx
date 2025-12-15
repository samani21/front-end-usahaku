import React from 'react';
import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';

/* ===================== Hero Variants ===================== */
import HeroOne from './HeroOne';
import HeroTwo from './HeroTwo';
import HeroThree from './HeroThree';
import HeroDarkLight from './HeroDarkLight';
import HeroFive from './HeroFive';
import HeroSix from './HeroSix';
import HeroSevent from './HeroSevent';
import HeroEight from './HeroEight';
import HeroTen from './HeroTen';

/* ===================== Props ===================== */
type Props = {
    theme: number | string;
    color: ThemeColorSet;
    hero: Hero | null;
    clientQueueNumber?: number;
    currentQueueNumber?: number;
    handleNextQueue?: () => void;
    themeMode: 'Dark' | 'Light';
};

const HeroSection = ({
    theme,
    color,
    hero,
    themeMode
}: Props) => {
    const commonProps = {
        color,
        hero,
    };


    /* ===================== Numeric Theme ===================== */
    switch (theme) {
        case 1:
            return <HeroOne {...commonProps} />;
        case 2:
            return <HeroTwo {...commonProps} />;
        case 3:
            return <HeroThree {...commonProps} />;
        case 4:
            return <HeroDarkLight {...commonProps}
                themeMode={themeMode}
            />;
        case 5:
            return <HeroFive {...commonProps} />;
        case 6:
            return <HeroSix {...commonProps} />;
        case 7:
            return <HeroSevent {...commonProps} />;
        case 8:
            return <HeroEight {...commonProps} />;
        case 10:
            return <HeroTen {...commonProps} />;
        default:
            return null;
    }
};

export default HeroSection;
