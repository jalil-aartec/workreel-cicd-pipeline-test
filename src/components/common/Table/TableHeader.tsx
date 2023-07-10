import React, { FC } from 'react'

interface Props {
    columns: {
        title: string
        render?: any
        key?: string
        dbColName?: string
        select?: boolean
    }[]
    rowSelection?: boolean
    handleAllCheck?: (arg: any) => void
}

export const TableHeader: FC<Props> = ({
    columns,
    rowSelection,
    handleAllCheck,
}) => {
    const handleCheck = () => {
        return columns?.every(current => current.select)
    }

    return (
        <thead className="bg-gray-100 ">
            <tr>
                {rowSelection
                    ? rowSelection && (
                          <th className="text-center">
                              <input
                                  type="checkbox"
                                  onClick={event =>
                                      handleAllCheck
                                          ? handleAllCheck(event)
                                          : null
                                  }
                                  className="checked:border-transparent rounded-md"
                                  onChange={handleCheck}
                                  checked={handleCheck()}
                              />
                          </th>
                      )
                    : true}

                {columns?.map((col, i) => (
                    <th
                        key={i}
                        scope="col"
                        className={`px-6 py-3 ${
                            col.key === 'action' ? 'text-left' : 'text-left'
                        } 
                        ${
                            col.key === 'key' ? 'flex' : ''
                        }  text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                        {col.title}
                    </th>
                ))}
            </tr>
        </thead>
    )
}
