import React, { useState, useMemo } from 'react';
import { ThemeContext } from '@/Components/Theme/Nine/useTheme';
import CatalogAppCore from '@/Components/Theme/Nine/CatalogAppCore';
import { THEME_COLORS } from '@/lib/Types/Theme/Nine';

export const ThemeNine: React.FC = () => {
    // State untuk menyimpan tema yang dipilih
    const [theme, setTheme] = useState(THEME_COLORS[0]); // Default: Indigo

    const themeContextValue = useMemo(() => ({ theme, setTheme }), [theme]);

    return (
        <ThemeContext.Provider value={themeContextValue}>
            <CatalogAppCore />
        </ThemeContext.Provider>
    );
};

export default ThemeNine;