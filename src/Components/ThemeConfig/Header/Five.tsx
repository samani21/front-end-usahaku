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

const Five = ({ color, themeMode, spanOne, spanTwo, setSidebarOpen, toggleTheme, frameType, frameTheme, logoImage, isBuild }: Props) => {
    const isDarkMode = useMemo(() => {
        return themeMode === 'dark' ? true : false;
    }, [themeMode])
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>
            <div className={`flex items-center justify-between p-4 rounded-lg border-2 border-dashed transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700' : `${color?.bg50} border-slate-200`}`}>
                <div className="flex items-center gap-3">
                    <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                    <div className="flex flex-col leading-none">
                        <span className="text-[10px] font-bold text-slate-400 tracking-widest">{spanOne}</span>
                        <span className={`text-xl font-serif font-bold uppercase ${color?.text600}`}>{spanTwo}</span>
                    </div>
                </div>
                <NavIcons colorClass={`${color?.text700}`} setSidebarOpen={setSidebarOpen} toggleTheme={toggleTheme} themeMode={themeMode} />
            </div>
        </header>
    )
}

export default Five