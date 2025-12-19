import React from 'react'
import One from './One';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import Two from './Two';

type Props = {
    theme: number;
    color: ThemeColorSet;
    themeMode: string;
    logo: string | null;
    span1: string;
    span2: string;
}

const HeaderConfig = ({ theme, color, themeMode, logo, span1, span2 }: Props) => {
    const bg = themeMode === "Dark" ? 'bg-gray-900' : 'bg-gray-100'
    const text = themeMode === "Dark" ? 'text-gray-50' : 'text-gray-900'
    return (
        theme === 1 ?
            <One color={color} bg={bg}
                text={text} logo={logo} span1={span1}
                span2={span2} /> :
            theme === 2 ?
                <Two color={color} bg={bg}
                    text={text} logo={logo} span1={span1}
                    span2={span2} /> : ""
    )
}

export default HeaderConfig