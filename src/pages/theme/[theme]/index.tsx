import { useRouter } from 'next/router';
import React from 'react'
import ThemeOne from './Components/ThemeOne';
import ThemeTwo from './Components/ThemeTwo';
import ThemeThree from './Components/ThemeThree';
import ThemeFour from './Components/ThemeFour';

type Props = {}

const ThemePage = (props: Props) => {
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
                        <ThemeFour /> : ''
    )
}

export default ThemePage