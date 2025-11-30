import { NotificationState } from '@/lib/Types/Theme/Theme';
import React from 'react'
import NotificationOne from './NotificationOne';

type Props = {
    theme: number;
    notification: NotificationState;
}

const Notification = ({ theme, notification }: Props) => {
    return (
        theme === 1 ?
            <NotificationOne notification={notification} /> : ''
    )
}

export default Notification