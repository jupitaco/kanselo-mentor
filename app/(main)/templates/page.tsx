import { TemplateStats } from '@/components/main/templates/templateStats'
import { TemplateTable } from '@/components/main/templates/templateTable';
import Button from '@/components/ui/button'
import React from 'react'
import { LuCirclePlus } from "react-icons/lu";

export default function Page() {
    return (
        <main className="p-5 space-y-7">
            <TemplateStats />

            <section className='p-4 bg-white rounded-xl space-y-10'>
                <header className='flex flex-wrap justify-between gap-4 items-center'>
                    <article className='space-y-2'>
                        <h4 className='font-semibold'>All Templates</h4>
                        <p>Manage your templates</p>
                    </article>

                    <Button link href='/templates/create' className='pry-btn w-full md:w-fit'> <LuCirclePlus /> Add New Template</Button>
                </header>

                <TemplateTable />
            </section>
        </main>
    )
}
