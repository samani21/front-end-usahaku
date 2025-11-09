import React from 'react'

const Loading = () => {
    return (
        <div className="fixed inset-0 bg-[#000000]/50 flex items-center justify-center z-[9999] transition-opacity duration-300">
            <div className="bg-white p-8 rounded-xl shadow-2xl space-y-4  transform transition-all duration-300 scale-100">
                <img src={'/loading/clock.svg'} className='w-24' />
                {/* <h1 className='text-[#FF5F2E] text-center font-[500]'>Loading....</h1> */}
            </div>
        </div>
    )
}

export default Loading