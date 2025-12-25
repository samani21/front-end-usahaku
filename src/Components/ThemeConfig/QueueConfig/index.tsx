import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
import One from './One';
import Two from './Two';
import Three from './Three';
import Four from './Four';

type Props = {
    theme: number
    color: ThemeColorSet;
}

const QueueConfig = ({ theme, color }: Props) => {
    const commonProps = {
        color,
    };

    /* ===================== Numeric Theme ===================== */
    switch (theme) {
        case 1:
            return <One {...commonProps} />
        case 2:
            return <Two {...commonProps} />
        case 3:
            return <Three {...commonProps} />
        case 4:
            return <Four {...commonProps} />
        default:
            return null;
    }
}

export default QueueConfig