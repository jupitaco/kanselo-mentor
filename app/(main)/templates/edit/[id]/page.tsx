import { EditTemplate } from '@/components/main/templates/templateForm'
import GoBackBtn from '@/components/ui/goBackBtn'
import React, { use } from 'react'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    return (
        <main className="p-5 space-y-7">
            <GoBackBtn className='outline-btn btn' title='Back' />
            <h4>Edit Template</h4>
            <section className='rounded-xl bg-white px-5 py-10 w-full max-w-2xl'>
                <EditTemplate id={id} />
            </section>
        </main>
    )
}
