import { AlertTriangle, ChevronLeft, Eye, EyeOff, Lock, LockOpen, LucideMessageCircleWarning, X } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'


const ForgotStepsThree = () => {
    const route = useRouter();
    return (<div className="max-w-sm mx-auto text-center">
        <div className="flex items-center">
            <LockOpen className="w-10 h-10 text-[var(--secondary-orange)] mx-auto mb-4" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
            Kata Sandi Berhasil Diubah!
        </h3>
        <p className="text-gray-600">
            Kata sandi Anda telah berhasil diperbarui.
            Sekarang Anda dapat masuk menggunakan kata sandi baru Anda.
        </p>
        <b className='mb-6 text-gray-600 '>Jaga kerahasiaan kata sandi Anda dan jangan bagikan kepada siapa pun untuk keamanan akun Anda.</b>
        <br />
        <button
            type="submit"
            className="w-full mt-4 py-3 cursor-pointer px-4 rounded-xl text-white font-bold bg-[var(--secondary-orange)] hover:bg-orange-500 transition shadow-md"
            onClick={() => route?.push('/auth/login')}
        >
            Login
        </button>
    </div>)
}

export default ForgotStepsThree