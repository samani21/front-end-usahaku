import React from 'react'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import One from './One';
import Two from './Two';
import { Hero } from '@/lib/Types/Theme/theme';
import Three from './Three';
import Four from './Four';
import Five from './FIve';
import Six from './Six';
import Sevent from './Sevent';
import Eight from './Eight';
import Ten from './Ten';
type Props = {
    theme: number;
    color: ThemeColorSet;
    themeMode: string;
    dataHero: Hero;
    deleteImage: boolean;
    setThemeMode: (val: string) => void
}

const HeroConfig = ({ theme, color, themeMode, dataHero, setThemeMode, deleteImage }: Props) => {

    const commonProps = {
        color,
        dataHero,
        setThemeMode,
        themeMode,
        deleteImage
    };

    /* ===================== Numeric Theme ===================== */
    switch (theme) {
        case 1:
            return <One {...commonProps} />
        case 2:
            return <Two {...commonProps} />
        case 3:
            return <Three {...commonProps} />
        case 4:
            return <Four {...commonProps} />
        case 5:
            return <Five {...commonProps} />
        case 6:
            return <Six {...commonProps} />
        case 7:
            return <Sevent {...commonProps} />
        case 8:
            return <Eight {...commonProps} />
        case 10:
            return <Ten {...commonProps} />
        default:
            return null;
    }
}

export default HeroConfig