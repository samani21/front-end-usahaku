import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
import TypeProductOne from './TypeProductOne';

type Props = {
    theme: number
    color: ThemeColorSet;
    handlePackage: (val: boolean | string) => void;
    isPackage: boolean | string
}

const TypeProduct = ({ color, handlePackage, isPackage, theme }: Props) => {
    return (
        theme === 1 ? <TypeProductOne handlePackage={handlePackage}
            isPackage={isPackage}
            color={color} /> : ''
    )
}

export default TypeProduct