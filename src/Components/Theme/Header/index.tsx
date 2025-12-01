import { UIState } from '@/lib/Types/Theme/Theme';
import React from 'react'
import HeaderOne from './HeaderOne';
import HeaderTwo from './HeaderTwo';

type Props = {
    theme: number,
    onIconClick: (drawerName: keyof UIState) => void;
    color?: string
}

const Header = ({ theme, onIconClick, color }: Props) => {
    return (
        theme === 1 ?
            <HeaderOne onIconClick={onIconClick} /> :
            theme === 2 ?
                <HeaderTwo color={color} onIconClick={onIconClick}/> : ''
    )
}

export default Header