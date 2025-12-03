import React from 'react'

const NotificationThree = () => {
    return (
        <div id="message-modal" className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 hidden">
            <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-xl transition duration-300 ease-out">
                <span id="message-text" className="font-medium"></span>
            </div>
        </div>
    )
}

export default NotificationThree