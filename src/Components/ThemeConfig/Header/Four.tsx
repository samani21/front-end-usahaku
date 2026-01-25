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

const Four = ({ color, themeMode, spanOne, spanTwo, setSidebarOpen, toggleTheme, frameType, frameTheme, logoImage, isBuild }: Props) => {
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>
            <div className={`flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white overflow-hidden relative`}>
                {/* Accent Background */}
                <div className={`absolute top-0 left-0 w-1 h-full ${color?.bg600}`} />
                <div className="flex items-center gap-3 min-w-0 relative z-10">
                    <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                    <h2 className="font-black italic text-xl truncate">
                        <span className="text-white">{spanOne}</span>
                        <span className={`${color?.text500} ml-1`}>{spanTwo}</span>
                    </h2>
                </div>
                <NavIcons colorClass={`${color?.text600}`} setSidebarOpen={setSidebarOpen} toggleTheme={toggleTheme} darkOnly={true} themeMode={themeMode} />
            </div>
        </header>
    )
}

export default Four