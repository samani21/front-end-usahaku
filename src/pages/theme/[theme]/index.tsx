import { useRouter } from 'next/router';
import React from 'react'
import ThemeOne from './Components/ThemeOne';
import ThemeTwo from './Components/ThemeTwo';
import ThemeThree from './Components/ThemeThree';
import ThemeFour from './Components/ThemeFour';
import ThemeFive from './Components/ThemeFive';
import ThemeSix from './Components/ThemeSix';
import ThemeSeven from './Components/ThemeSevent';
import ThemeEight from './Components/ThemeEight';
import ThemeNine from './Components/ThemeNine';
import ThemeTen from './Components/ThemeTen';

const ThemePage = () => {
    const router = useRouter();
    const { theme } = router.query;
    return (
        theme === '1' ?
            <ThemeOne /> :
            theme === '2' ?
                <ThemeTwo /> :
                theme === '3' ?
                    <ThemeThree /> :
                    theme === '4' ?
                        <ThemeFour /> :
                        theme === '5' ?
                            <ThemeFive /> :
                            theme === '6' ?
                                <ThemeSix /> :
                                theme === '7' ?
                                    <ThemeSeven /> :
                                    theme === '8' ?
                                        <ThemeEight /> :
                                        theme === '9' ?
                                            <ThemeNine /> :
                                            theme === '10' ?
                                                <ThemeTen /> : ''
    )
}

export default ThemePage