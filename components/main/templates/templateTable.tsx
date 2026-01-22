'use client'
import TableComponent from '@/components/ui/tableComponent/tableComponent'
import { templateColData, templateData } from '@/mock'
import React from 'react'

export const TemplateTable = () => {
    return (
        <TableComponent title='Templates' columns={templateColData} data={templateData} />
    )
}


