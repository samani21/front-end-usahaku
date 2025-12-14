import React from 'react'
import MapTableOne from './MapTableOne'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import MapTableTwo from './MapTableTwo';

type Props = {
    theme: number
    color: ThemeColorSet;
    clientQueueNumber?: number;
    currentQueueNumber?: number;
}

const MapTable = ({ theme, color, clientQueueNumber, currentQueueNumber }: Props) => {
    return (
        theme === 1 ? <MapTableOne color={color}
            clientQueueNumber={clientQueueNumber}
            currentQueueNumber={currentQueueNumber} /> :
            theme === 2 ? <MapTableTwo color={color}
                clientQueueNumber={clientQueueNumber}
                currentQueueNumber={currentQueueNumber} /> : ""
    )
}

export default MapTable