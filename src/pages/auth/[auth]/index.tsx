"use client";
import FormPanel from '@/Components/Auth/FormPanel'
import VisalPanel from '@/Components/Auth/VisalPanel'
import { getToken } from '@/store/authStore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'


const index = () => {
    const token = getToken();
    const router = useRouter();
    useEffect(() => {
        if (token) {
            router?.push('/')
        }
    }, [])
    return (
        <div className='font-sans text-gray-800 antialiased min-h-screen flex'>
            <VisalPanel />
            <FormPanel />
        </div>
    )
}

export default index