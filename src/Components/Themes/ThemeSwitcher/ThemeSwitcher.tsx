import React, { useState } from "react";
import { ChevronDown, Palette } from "lucide-react";
import { Theme } from "@/lib/Types/Theme/theme";


interface ThemeColorSet {
    text700: string;
}

interface ThemeSwitcherLightProps {
    themeName: string;
    setThemeName: (val: string) => void;
    listTheme: Theme[];
    color: ThemeColorSet;
}

export default function ThemeSwitcherLight({
    themeName,
    setThemeName,
    listTheme,
    color
}: ThemeSwitcherLightProps) {
    const [open, setOpen] = useState(false);
    const [opencategorie, setOpenCatgeorie] = useState<number | null>(null);
    return (
        <section className="flex justify-end items-center space-x-3">
            <Palette size={20} className="text-gray-500 dark:text-gray-400" />

            <span className={`text-sm ${color?.text700} font-medium`}>
                Pilih Tema:
            </span>

            {/* Tombol buka modal */}
            <button
                className="px-3 py-1 rounded-lg border text-sm shadow-sm hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setOpen(true)}
            >
                Coba ganti warna
            </button>

            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-gray-700 rounded-xl shadow-lg p-5 max-w-140 ">

                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-semibold">Pilih Warna Tema</h2>
                            <button onClick={() => setOpen(false)}>✕</button>
                        </div>
                        <div className="space-y-2 overflow-y-auto h-[80vh] no-scrollbar">
                            {listTheme?.map((t, i) => (
                                <div className="bg-gray-600 p-2 rounded-[8px]">
                                    <div className="flex items-center justify-between" onClick={() => setOpenCatgeorie(opencategorie === t?.id ? null : t?.id)}>
                                        <p className="font-[600]">{t?.style_category}</p>
                                        <ChevronDown className={`transform ${opencategorie === t?.id && 'rotate-180'}`} />
                                    </div>
                                    <p onClick={() => setOpenCatgeorie(opencategorie === t?.id ? null : t?.id)}>{t?.description}</p>
                                    <div className={`${opencategorie === t?.id ? 'grid grid-cols-10 gap-0' : 'hidden'} mt-4`}>
                                        {t?.categorie_maps?.map((c, index) => {
                                            const ringClass = `ring-${c.primary}-600`;
                                            const borderActive = `border-${color}-900`;

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => setThemeName(c.name)}
                                                    className={`w-6 h-6 bg-${c?.name}-500 rounded-full border-2 transition duration-200 
            ${themeName === c.name ? `${borderActive} dark:border-white ring-2 ring-offset-2 ${ringClass}`
                                                            : 'border-gray-300'}
            `}
                                                    aria-label={`Pilih tema ${c?.name}`}   // ← ini aman dan wajib
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
