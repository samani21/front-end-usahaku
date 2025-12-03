import { NotificationState } from '@/lib/Types/Theme/Theme';
import React from 'react'
import NotificationOne from './NotificationOne';
import NotificationThree from './NotificationThree';

type Props = {
    theme: number;
    notification: NotificationState;
}

const Notification = ({ theme, notification }: Props) => {
    return (
        theme === 1 ?
            <NotificationOne notification={notification} /> :
            theme === 3 ?
                <NotificationThree /> : ''
    )
}

export default Notification