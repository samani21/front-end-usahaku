import React from 'react'
import MainLayout from '../Layout/MainLayout'
import HeaderConfigPage from './header'

type Props = {}

const CatalogPage = (props: Props) => {
    return (
        <MainLayout>
            <HeaderConfigPage />
        </MainLayout>
    )
}

export default CatalogPage