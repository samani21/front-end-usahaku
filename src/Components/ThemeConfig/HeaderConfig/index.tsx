import React from 'react'
import One from './One';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import Two from './Two';
import Three from './Theree';
import Four from './Four';
import Five from './Five';
import Six from './Six';
import Seven from './Seven';
import Eight from './Eight';
import Nine from './Nine';
import Ten from './Ten';
import Eleven from './Eleven';
import Twelve from './Twelve';

type Props = {
    theme: number;
    color: ThemeColorSet;
    themeMode: string;
    logo: string | null;
    span1: string;
    span2: string;
    frameLogo: string;
    setThemeMode: (val: string) => void;
}

const HeaderConfig = ({ theme, color, themeMode, logo, span1, span2, setThemeMode, frameLogo }: Props) => {
    const bg = themeMode === "Dark" ? 'bg-gray-900' : 'bg-gray-100'
    const text = themeMode === "Dark" ? 'text-gray-50' : 'text-gray-900'

    const commonProps = {
        color,
        bg,
        text,
        logo,
        span1,
        span2,
        themeMode,
        setThemeMode,
        frameLogo
    };

    /* ===================== Numeric Theme ===================== */
    switch (theme) {
        case 1:
            return <One {...commonProps} />;
        case 2:
            return <Two {...commonProps} />;
        case 3:
            return <Three {...commonProps} />;
        case 4:
            return <Four {...commonProps} />;
        case 5:
            return <Five {...commonProps} />;
        case 6:
            return <Six {...commonProps} />;
        case 7:
            return <Seven {...commonProps} />;
        case 8:
            return <Eight {...commonProps} />;
        case 9:
            return <Nine {...commonProps} />;
        case 10:
            return <Ten {...commonProps} />;
        case 11:
            return <Eleven {...commonProps} />;
        case 12:
            return <Twelve {...commonProps} />;
        default:
            return null;
    }
}

export default HeaderConfig