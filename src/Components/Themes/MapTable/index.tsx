import React from 'react';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';

/* ===================== Components ===================== */
import MapTableOne from './MapTableOne';
import MapTableTwo from './MapTableTwo';
import MapTableThree from './MapTableThree';

/* ===================== Props ===================== */
type Props = {
    theme: number;
    color: ThemeColorSet;
    clientQueueNumber?: number;
    currentQueueNumber?: number;
    handleNextQueue?: () => void;
};

const MapTable = ({
    theme,
    color,
    clientQueueNumber,
    currentQueueNumber,
    handleNextQueue
}: Props) => {
    const commonProps = {
        color,
        clientQueueNumber,
        currentQueueNumber,
        handleNextQueue
    };

    switch (theme) {
        case 1:
            return <MapTableOne {...commonProps} />;
        case 2:
            return <MapTableTwo {...commonProps} />;
        case 3:
            return <MapTableThree {...commonProps} />;
        default:
            return null;
    }
};

export default MapTable;
