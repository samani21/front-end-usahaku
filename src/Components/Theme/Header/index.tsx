import { UIState } from '@/lib/Types/Theme/Theme';
import React from 'react'
import HeaderOne from './HeaderOne';

type Props = {
    theme: number,
    onIconClick: (drawerName: keyof UIState) => void;
}

const Header = ({ theme, onIconClick }: Props) => {
    return (
        theme === 1 ?
            <HeaderOne onIconClick={onIconClick} /> : ''
    )
}

export default Header