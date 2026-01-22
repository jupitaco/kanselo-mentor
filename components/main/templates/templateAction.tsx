'use client'
import { WarningIcon } from '@/components/logout/logout'
import Button from '@/components/ui/button'
import ActionModals from '@/components/ui/modals/actionModals'
import { useModalContext } from '@/context/modalContext'
import { Template } from '@/types/global'
import React from 'react'

export const TemplateAction = ({ data }: { data: Template }) => {

    const { isOpen, openModal } = useModalContext()
    return (
        <>
            <div className='grid grid-cols-2 gap-3'>
                <Button className='alt-btn' onClick={() => openModal(`delete-${data?.id}`)} >Delete</Button>
                <Button link href={`/templates/edit/${data?.id}`} className='pry-btn'>Edit</Button>
            </div>

            {isOpen[`delete-${data?.id}`] &&
                (<ActionModals
                    icon={<WarningIcon />}
                    id={`delete-${data?.id}`}
                    title='Delete template'
                    subTitle='Are you sure you want to delete this template?'
                    actionTitle="Yes, delete"
                    closeTitle='No, don’t delete'
                    btnSecClass='outline-btn'
                    action={() => { }}
                />)}
        </>
    )
}
