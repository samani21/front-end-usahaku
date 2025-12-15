import React from 'react';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';

/* ===================== Components ===================== */
import QueueOne from './QueueOne';

/* ===================== Props ===================== */
type Props = {
    theme: number;
    color: ThemeColorSet;
    clientQueueNumber?: number;
    currentQueueNumber?: number;
    handleNextQueue?: () => void;
};

const Queue = ({
    theme,
    color,
    clientQueueNumber,
    currentQueueNumber,
    handleNextQueue,
}: Props) => {
    const commonProps = {
        color,
        clientQueueNumber,
        currentQueueNumber,
        handleNextQueue,
    };

    switch (theme) {
        case 1:
            return <QueueOne {...commonProps} />;
        default:
            return null;
    }
};

export default Queue;
