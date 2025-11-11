import React from 'react'

const CardMain = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            {children}
        </div>
    )
}

export default CardMain