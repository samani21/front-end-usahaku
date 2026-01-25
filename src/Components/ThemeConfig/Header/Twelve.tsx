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

const Twelve = ({ color, themeMode, spanOne, spanTwo, setSidebarOpen, toggleTheme, frameType, frameTheme, logoImage, isBuild }: Props) => {
    const isDarkMode = useMemo(() => {
        return themeMode === 'dark' ? true : false;
    }, [themeMode])
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>
            <div className={`flex items-center justify-between p-3 rounded-2xl border-2 ${color?.border600} transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-50 shadow-md'}`} >
                <div className="flex items-center gap-3">
                    <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} className="animate-bounce" />
                    <h2 className="text-xl font-black tracking-tight">
                        <span className={color?.text600}>{spanOne}</span>
                        <span className="text-slate-400 ml-1">{spanTwo}</span>
                    </h2>
                </div>
                <NavIcons colorClass={`${color?.text600}`} setSidebarOpen={setSidebarOpen} toggleTheme={toggleTheme} themeMode={themeMode} />
            </div>
        </header>
    )
}

export default Twelve