import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import React from 'react'
import One from './One';
import Two from './Two';
import Three from './Three';
import Four from './Four';
import Five from './Five';
import Six from './Six';
import Sevent from './Sevent';
import Eight from './Eight';
import Nine from './Nine';
import Ten from './Ten';
import Elevent from './Elevent';
import Twelve from './Twelve';
import Thirteen from './Thirteen';
import Fourteen from './Fourteen';
import Fiveteen from './Fiveteen';
type Props = {
    theme: number;
    color: ThemeColorSet;
    themeMode: string;
    spanOne?: string;
    spanTwo?: string;
    setSidebarOpen: (val: boolean) => void;
    toggleTheme: () => void;
    frameType: "circle" | "square" | "none";
    frameTheme: "dark" | "light";
    logoImage: string | null
    isBuild?: boolean;
}

const HeroConfig = ({ theme, color, themeMode, spanOne, spanTwo, setSidebarOpen, toggleTheme, frameType, frameTheme, logoImage, isBuild }: Props) => {

    const commonProps = {
        color,
        themeMode,
        spanOne,
        spanTwo,
        setSidebarOpen,
        toggleTheme,
        frameType,
        frameTheme,
        logoImage,
        isBuild
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
        case 9:
            return <Nine {...commonProps} />
        case 10:
            return <Ten {...commonProps} />
        case 11:
            return <Elevent {...commonProps} />
        case 12:
            return <Twelve {...commonProps} />
        case 13:
            return <Thirteen {...commonProps} />
        case 14:
            return <Fourteen {...commonProps} />
        case 15:
            return <Fiveteen {...commonProps} />
        default:
            return null;
    }
}

export default HeroConfig