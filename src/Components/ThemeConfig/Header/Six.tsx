import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import React, { useMemo } from 'react'
import LogoContainer from './LogoContainer';
import NavIcons from './NavIcons';

type Props = {
    color: ThemeColorSet;
    themeMode: string;
    spanOne?: string;
    spanTwo?: string;
    setSidebarOpen: (val: boolean) => void;
    toggleTheme: () => void;
    frameType: "circle" | "square" | "none";
    frameTheme: "dark" | "light";
    logoImage: string | null;
    isBuild?: boolean
}

const Six = ({ color, themeMode, spanOne, spanTwo, setSidebarOpen, toggleTheme, frameType, frameTheme, logoImage, isBuild }: Props) => {
    const isDarkMode = useMemo(() => {
        return themeMode === 'dark' ? true : false;
    }, [themeMode])
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>

            <div className={`flex items-center justify-between p-3 rounded-2xl border-l-[6px] ${color?.border600} transition-all ${isDarkMode ? 'bg-slate-900  shadow-lg' : 'bg-white  shadow-sm'}`}>
                <div className="flex items-center gap-3">
                    <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                    <h2 className="text-lg font-bold">
                        <span className={color?.text600}>{spanOne}</span>
                        <span className={`${isDarkMode ? "text-slate-300" : 'text-slate-800'} ml-1`}>{spanTwo}</span>
                    </h2>
                </div>
                <NavIcons colorClass={`${color?.text600}`} setSidebarOpen={setSidebarOpen} toggleTheme={toggleTheme} themeMode={themeMode} />
            </div>
        </header>
    )
}

export default Six