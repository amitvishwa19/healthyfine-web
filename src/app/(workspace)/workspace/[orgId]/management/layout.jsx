import React from 'react'
import { ManagementModalProvider } from './_provider/ManagementModalProvider'

export default function ManagementLayout({ children }) {
    return (
        <div className='p-2'>
            <ManagementModalProvider />
            {children}
        </div>
    )
}
