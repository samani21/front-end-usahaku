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

const Fourteen = ({ color, themeMode, spanOne, spanTwo, setSidebarOpen, toggleTheme, frameType, frameTheme, logoImage, isBuild }: Props) => {
    const isDarkMode = useMemo(() => {
        return themeMode === 'dark' ? true : false;
    }, [themeMode])
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>

            <div className={`flex items-center justify-between p-4 rounded-xl border-t-4 ${color?.border600} transition-all ${isDarkMode ? 'bg-slate-900 shadow-xl' : 'bg-white '}`} >
                <div className="flex flex-col min-w-0">
                    <h2 className="text-2xl font-serif font-black leading-none italic">
                        <span className={color?.text600}>{spanOne}</span>
                    </h2>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold mt-1">{spanTwo}</span>
                </div>
                <div className="flex items-center gap-4">
                    <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                    <NavIcons colorClass={`${color?.text600}`} setSidebarOpen={setSidebarOpen} toggleTheme={toggleTheme} themeMode={themeMode} />
                </div>
            </div>
        </header>
    )
}

export default Fourteen