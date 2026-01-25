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

const Ten = ({ color, themeMode, spanOne, spanTwo, setSidebarOpen, toggleTheme, frameType, frameTheme, logoImage, isBuild }: Props) => {
    const isDarkMode = useMemo(() => {
        return themeMode === 'dark' ? true : false;
    }, [themeMode])
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>
            <div className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center gap-3">
                    <div className="flex items-center -space-x-2">
                        <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} className="z-10" />
                        <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-slate-800 border-slate-900' : "bg-slate-100 border-white"} border-2 `} />
                    </div>
                    <h2 className="text-lg font-bold">
                        <span className={color?.text600}>{spanOne}</span>
                        <span className={`${isDarkMode ? "text-slate-400" : 'text-slate-800'} ml-1`}>{spanTwo}</span>
                    </h2>
                </div>
                <NavIcons colorClass={`${color?.text900}`} setSidebarOpen={setSidebarOpen} toggleTheme={toggleTheme} themeMode={themeMode} />
            </div>
        </header>
    )
}

export default Ten