import GoBackBtn from '@/components/ui/goBackBtn'
import Skeleton from '@/components/ui/skeleton/skeleton'
import React from 'react'

export default function loading() {
    return (
        <main className='p-5 space-y-5'>
            <GoBackBtn className='outline-btn btn' title='Back' />
            <h4>Schedule Settings</h4>

            <ul className='rounded-2xl bg-white p-5 w-full max-w-2xl space-y-10'>
                {
                    Array.from({ length: 7 }).map((_, idx) => (
                        <li key={idx} className='flex justify-between gap-20'>
                            <Skeleton className='h-4! flex-1!' />
                            <ul className='text-grey-400 flex items-center gap-4 flex-1'>
                                <Skeleton className='h-4! w-10' />
                                <Skeleton className='h-4! w-10' />
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}
