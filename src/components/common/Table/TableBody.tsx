import React, { FC } from 'react'

interface Props {
    data: Array<any>
    columns: {
        title: string
        render?: any
        key?: string
        dbColName?: string
    }[]
    rowSelection?: boolean
    loadingData?: boolean
    handleSingleCheck?: (arg?: string, arg2?: number | undefined) => void
}

export const TableBody: FC<Props> = ({
    data,
    columns,
    rowSelection,
    loadingData,
    handleSingleCheck,
}) => {
    const renderTableColumnData = (
        col: { title: string; render?: any; key?: string; dbColName?: string },
        data: Array<any>,
    ) => {
        // eslint-disable-next-line no-prototype-builtins
        if (col.hasOwnProperty('render') && !col.hasOwnProperty('dbColName')) {
            return (
                <td
                    key={`${col.dbColName}`}
                    className="px-6 py-4 witespace-nowrap">
                    <div className="text-sm text-gray-900">
                        {col.render(data)}
                    </div>
                </td>
            )
        } else if (
            // eslint-disable-next-line no-prototype-builtins
            col.hasOwnProperty('render') &&
            // eslint-disable-next-line no-prototype-builtins
            col.hasOwnProperty('dbColName')
        ) {
            return (
                <td key={`${col.key}`} className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/*@ts-ignore*/}
                        {col.render(data[col?.dbColName])}
                    </div>
                </td>
            )
        } else {
            return (
                <td key={`${col.key}`} className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/*@ts-ignore*/}
                        {data[col?.dbColName]}
                    </div>
                </td>
            )
        }
    }
    return (
        <tbody className={`bg-white divide-y divide-gray-200`}>
            <tr>
                {data?.length === 0 && !loadingData && (
                    <td colSpan={10} className="text-center p-5">
                        <svg
                            className="w-16 h-16 mx-auto text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.2}
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                        </svg>
                        <p className="text-gray-900 font-medium mt-1">
                            No data found
                        </p>
                    </td>
                )}
                {loadingData && data?.length === 0 && (
                    <td colSpan={8} className="p-14 text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="animate-spin mx-auto icon text-black icon-tabler icon-tabler-refresh"
                            width="44"
                            height="44"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                        </svg>
                    </td>
                )}
            </tr>
            {data?.length !== 0 &&
                data?.map((d, index) => (
                    <tr
                        key={index}
                        className={`${
                            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        } hover:bg-gray-50`}>
                        {rowSelection && (
                            <td className="text-center px-2">
                                <input
                                    type="checkbox"
                                    checked={d.select}
                                    className="checked:bg-Teal-600 rounded-md checked:border-transparent"
                                    onChange={event =>
                                        handleSingleCheck
                                            ? handleSingleCheck(
                                                  event.target.value,
                                                  d.id ? d.id : undefined,
                                              )
                                            : null
                                    }
                                />
                            </td>
                        )}
                        {columns.map(col => renderTableColumnData(col, d))}
                    </tr>
                ))}
        </tbody>
    )
}
