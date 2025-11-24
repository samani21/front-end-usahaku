import { ThemeColor, THEMES } from '@/lib/Types/Theme/Six';
import React from 'react'
import ModalWrapper from './ModalWrapper';
import { CheckCircle } from 'lucide-react';


const ThemeSelectorModal: React.FC<{ onClose: () => void; onSelectTheme: (theme: ThemeColor) => void; currentTheme: ThemeColor }> =
    ({ onClose, onSelectTheme, currentTheme }) => {
        return (
            <ModalWrapper onClose={onClose}>
                <div className="p-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-3">Pilih Tampilan Warna Aplikasi</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {THEMES.map((theme) => (
                            <button
                                key={theme.name}
                                onClick={() => { onSelectTheme(theme); onClose(); }}
                                className={`p-5 rounded-2xl shadow-xl transition duration-200 transform hover:scale-105 border-4 flex flex-col items-center justify-center h-40 ${currentTheme.name === theme.name ? `border-${theme.primary}-600 bg-white` : 'border-gray-100 bg-gray-50'
                                    }`}
                            >
                                <div className={`h-12 w-12 rounded-full mx-auto mb-3 bg-${theme.primary}-500 shadow-md`} />
                                <p className="font-extrabold text-lg text-gray-800 text-center">{theme.name}</p>
                                {currentTheme.name === theme.name && <CheckCircle className={`w-5 h-5 mt-2 text-${theme.primary}-600`} />}
                            </button>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-8 text-center">Warna akan diterapkan di semua elemen utama (Header, Banner, Tombol).</p>
                </div>
            </ModalWrapper>
        );
    };

export default ThemeSelectorModal