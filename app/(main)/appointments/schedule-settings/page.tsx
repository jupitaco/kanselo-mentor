import { AppointmentSettings } from '@/components/main/booking/settings/appointmentSettings'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Schdule Settings"
}

export default function page() {
    return (
        <main className='p-5'>
            <AppointmentSettings />
        </main>
    )
}
