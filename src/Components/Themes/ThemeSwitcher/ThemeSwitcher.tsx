import { Theme } from '@/lib/Types/Theme/theme';
import { ChevronDown, Palette } from 'lucide-react';
import React, { useState } from 'react'
interface ThemeSwitcherProps {
    themeName: string;
    setThemeName: (val: string) => void;
    listTheme: Theme[];
    onChangeColor: () => void
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ themeName, setThemeName, listTheme, onChangeColor }) => {

    const [open, setOpen] = useState(false);
    const [opencategorie, setOpenCatgeorie] = useState<number | null>(null);
    return (
        <section className="flex justify-end items-center space-x-3">
            <Palette size={20} className="text-gray-500 dark:text-gray-400" />

            <span className={`text-sm text-gray-100 font-medium`}>
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
                                    <div className={`${opencategorie === t?.id ? 'flex items-center bg-white py-1 px-4 rounded-lg' : 'hidden'} mt-4`}>
                                        {t?.categorie_maps?.map((c, index) => {
                                            const text = `text-${c?.primary}-600`
                                            const bg = `bg-${c?.primary}-600`
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        setThemeName(c.name)
                                                        onChangeColor()
                                                    }}
                                                    className={`font-bold  text-[14px] ${text} flex flex-col items-center w-full`}
                                                >
                                                    <div className={`${bg} w-6 h-6 rounded-full`} />
                                                    {c?.primary}
                                                </button>
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
    )
}



export default ThemeSwitcher