import { MOCK_APP_ID, MOCK_USER_ID, NAV_LINKS, THEMES } from '@/lib/Types/Theme/Ten';
import { Palette, X } from 'lucide-react';
import React, { FC } from 'react'

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    themeColor: string;
    getThemeClass: (intensity: number, prefix?: string) => void;
    setThemeColor: (value: string) => void
}
const SideDrawer: FC<SideDrawerProps> = ({ isOpen, onClose, themeColor, getThemeClass, setThemeColor }) => (
    <>
        {/* Overlay */}
        {isOpen && (
            <div className="fixed inset-0 bg-black/50 z-30" onClick={onClose}></div>
        )}
        {/* Drawer */}
        <div
            className={`fixed top-0 right-0 w-64 h-full bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-xl font-semibold ${getThemeClass(600)}`}>Menu</h2>
                    <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100" onClick={onClose} aria-label="Tutup Menu">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="space-y-3">
                    {NAV_LINKS.map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={onClose}
                            className={`flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:${getThemeClass(50, 'bg')} hover:${getThemeClass(600, 'text')} transition-colors`}
                        >
                            <link.icon className="w-5 h-5" />
                            <span>{link.name}</span>
                        </a>
                    ))}

                    {/* Pengaturan Tema */}
                    <div className="pt-4 border-t mt-4">
                        <h3 className={`text-md font-semibold ${getThemeClass(600)} flex items-center mb-3`}>
                            <Palette className="w-4 h-4 mr-2" /> Pengaturan Tema
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {THEMES.map(theme => (
                                <button
                                    key={theme.primary}
                                    onClick={() => setThemeColor(theme.primary)}
                                    className={`px-3 py-1 text-sm font-medium rounded-full border-2 transition-all duration-200
                            ${themeColor === theme.primary
                                            ? `border-${theme.primary}-600 bg-${theme.primary}-600 text-white shadow-md`
                                            : `border-gray-300 text-gray-700 bg-white hover:bg-${theme.primary}-50`
                                        }
                        `}
                                >
                                    {theme.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t mt-4">
                        <p className="text-xs break-all pl-1 mt-1 text-gray-800">User ID (Mock): {MOCK_USER_ID}</p>
                        <p className="text-xs break-all pl-1 text-gray-500">App ID (Mock): {MOCK_APP_ID}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default SideDrawer