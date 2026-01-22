import { CreateTemplate } from '@/components/main/templates/templateForm'
import GoBackBtn from '@/components/ui/goBackBtn'
import React from 'react'

export default function page() {
    return (
        <main className="p-5 space-y-7">
            <GoBackBtn className='outline-btn btn' title='Back' />
            <h4>Add Template</h4>
            <section className='rounded-xl bg-white px-5 py-10 w-full max-w-2xl'>
                <CreateTemplate />
            </section>
        </main>
    )
}
