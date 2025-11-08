import FormPanel from '@/Components/Auth/FormPanel'
import VisalPanel from '@/Components/Auth/VisalPanel'
import React from 'react'


const index = () => {
    return (
        <div className='font-sans text-gray-800 antialiased min-h-screen flex'>
            <VisalPanel />
            <FormPanel />
        </div>
    )
}

export default index