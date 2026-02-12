import { AppointmentSettings } from '@/components/main/booking/settings/appointmentSettings'
import GoBackBtn from '@/components/ui/goBackBtn';
import { getCurrentUserApi } from '@/services/apis/auth.api';
import { UserData } from '@/types/auths';
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Schdule Settings"
}

export default async function page() {


    return (
        <main className='p-5 space-y-5'>
            <GoBackBtn className='outline-btn btn' title='Back' />
            <h4>Schedule Settings</h4>

            <AppointmentSettings  />
        </main>
    )
}
