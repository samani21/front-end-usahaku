import React from 'react'
import QueueOne from './QueueOne';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';

type Props = {
    theme: number;
    color: ThemeColorSet;
    clientQueueNumber?: number;
    currentQueueNumber?: number;
    handleNextQueue?: () => void;
}

const Queue = ({ theme, clientQueueNumber, currentQueueNumber, handleNextQueue, color }: Props) => {
    return (
        theme === 1 ?
            <QueueOne
                clientQueueNumber={clientQueueNumber}
                currentQueueNumber={currentQueueNumber}
                handleNextQueue={handleNextQueue}
                color={color} /> : ""
    )
}

export default Queue