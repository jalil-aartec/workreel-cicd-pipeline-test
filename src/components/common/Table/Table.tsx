import React, { FC } from 'react'
import { TableBody } from './TableBody'
import { TableHeader } from './TableHeader'

interface Props {
    data: any
    handleAllCheck?: () => void
    className?: string
    rowSelection?: boolean
    handleSingleCheck?: () => void
    onEdit?: () => void
    handleDelete?: () => void
    columns: {
        title: string
        render?: any
        dbColName?: string
        key?: string
    }[]
    loadingData?: boolean
}

export const Table: FC<Props> = ({
    data,
    columns,
    handleAllCheck,
    loadingData,
    handleSingleCheck,
    className,
    rowSelection,
}) => {
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table
                            className={`${className} bg-white min-w-full divide-y divide-gray-200 w-6/12`}>
                            <TableHeader
                                rowSelection={rowSelection}
                                columns={columns}
                                handleAllCheck={handleAllCheck}
                            />
                            <TableBody
                                rowSelection={rowSelection}
                                columns={columns}
                                loadingData={loadingData}
                                data={data}
                                handleSingleCheck={handleSingleCheck}
                            />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
