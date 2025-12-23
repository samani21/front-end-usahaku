import React from 'react'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import One from './One';
import { Hero } from '@/lib/Types/Theme/theme';
import Two from './Two';
import Three from './Three';
import Four from './Four';
import Five from './Five';
import Six from './Six';
import Eight from './Eight';
import Nine from './Nine';
type Props = {
    theme: number;
    color: ThemeColorSet;
    themeMode: string;
    setThemeMode: (val: string) => void
}

const CategorieConfig = ({ theme, color, themeMode, setThemeMode }: Props) => {

    const commonProps = {
        color,
        themeMode,
        setThemeMode
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
        case 8:
            return <Eight {...commonProps} />
        case 9:
            return <Nine {...commonProps} />
        default:
            return null;
    }
}

export default CategorieConfig