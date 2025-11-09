import Loading from '@/Components/component/Loading';
import { getToken } from '@/store/authStore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

type Props = {}

const index = (props: Props) => {
    const route = useRouter();
    const token = getToken();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!token) {
            route?.push('/auth/login')
        }
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <div>index</div>
    )
}

export default index