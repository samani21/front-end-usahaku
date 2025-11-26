import { Palette } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
    themes: any;
    activeColor: string;
    onSelect: Dispatch<SetStateAction<string>>;
}

const ColorThemePicker = ({ themes, activeColor, onSelect }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 rounded-full text-slate-600 hover:bg-gray-100 transition border border-gray-100 flex items-center"
                aria-label="Pilih Tema Warna"
            >
                <Palette className="w-6 h-6" />
            </button>

            {/* Dropdown/Modal */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-3">
                    <p className="text-sm font-bold text-slate-700 mb-2">Pilih Tema Warna:</p>
                    <div className="space-y-2">
                        {Object.keys(themes).map((key) => {
                            const theme = themes[key];
                            return (
                                <button
                                    key={key}
                                    onClick={() => {
                                        onSelect(key);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left p-2 rounded-lg transition duration-150 flex items-center ${activeColor === key ? `bg-${theme.color}-100 text-${theme.color}-700 font-semibold shadow-sm` : 'text-slate-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <span
                                        className={`w-4 h-4 rounded-full mr-3`}
                                        style={{ backgroundColor: theme.hex }}
                                    ></span>
                                    {theme.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColorThemePicker