import { ThemeContextType } from "@/lib/Types/Theme/Nine";
import { createContext, useContext } from "react";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook kustom untuk menggunakan Context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};