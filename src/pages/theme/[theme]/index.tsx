import { useRouter } from 'next/router';
import React from 'react'
import ThemeOne from './Components/ThemeOne';
import ThemeTwo from './Components/ThemeTwo';

type Props = {}

const ThemePage = (props: Props) => {
    const router = useRouter();
    const { theme } = router.query;
    return (
        theme === '1' ?
            <ThemeOne /> :
            theme === '2' ?
                <ThemeTwo /> : ''
    )
}

export default ThemePage