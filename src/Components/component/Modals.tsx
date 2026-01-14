import { X } from 'lucide-react';
import React from 'react'
type Props = {
    open: boolean;
    children: React.ReactNode;
    onClose: () => void;
};

const Modals = ({ open, children, onClose }: Props) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0  bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white relative rounded-xl shadow-2xl min-w-xs mx-auto transform transition-all duration-300 scale-100">
                <div className=' fixed right-0 p-4 pb-0'>
                    <X onClick={onClose} className='cursor-pointer' />
                </div>
                <div className='p-4 mt-8'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modals