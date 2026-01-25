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

const Elevent = ({ color, themeMode, spanOne, spanTwo, setSidebarOpen, toggleTheme, frameType, frameTheme, logoImage, isBuild }: Props) => {
    const isDarkMode = useMemo(() => {
        return themeMode === 'dark' ? true : false;
    }, [themeMode])
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>
            <div className={`flex items-center justify-between p-4 rounded-none border-y-2 transition-all ${color?.border600} ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
                <div className="flex items-center gap-4">
                    <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                    <h2 className="text-xl font-serif">
                        <span className={`${isDarkMode ? "text-white" : "text-slate-900"} tracking-widest`}>{spanOne}</span>
                        <span className={`font-bold ml-2 underline decoration-2 underline-offset-4 ${color?.text600}`}>{spanTwo}</span>
                    </h2>
                </div>
                <NavIcons colorClass={`${color?.text700}`} setSidebarOpen={setSidebarOpen} toggleTheme={toggleTheme} themeMode={themeMode} />
            </div>
        </header>
    )
}

export default Elevent