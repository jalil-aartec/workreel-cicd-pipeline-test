import React, { FC, useEffect, useState } from 'react'
import { AppLayout } from '@/components/layouts/AppLayout'
import { Table } from '@/components/common/Table/Table'
import { axios } from '@/lib/axios'
import { Protected } from '@/hooks/protected'

const Subscription: FC = () => {
    const columns = [
        {
            title: 'First Name',
            dbColName: 'user',
            render: (user: { first_name: string }) => {
                return <span>{user.first_name}</span>
            },
            key: '1',
        },
        {
            title: 'Last Name',
            dbColName: 'user',
            render: (user: { last_name: string }) => {
                return <span>{user.last_name}</span>
            },
            key: '2',
        },
        {
            title: 'Email',
            dbColName: 'user',
            render: (user: { email: string }) => {
                return <span>{user.email}</span>
            },
            key: '3',
        },
        {
            title: 'Business',
            dbColName: 'business_name',
            key: '4',
        },
    ]

    const [data, setData] = useState<Array<object>>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        axios
            .get('/api/employees')
            .then(resp => {
                setLoading(false)
                setData(resp.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    return (
        <AppLayout>
            <h1 className="text-2xl mb-2 ml-4 mt-2">Subscription</h1>
            <Table data={data} loadingData={loading} columns={columns} />
        </AppLayout>
    )
}

export default Protected(Subscription)
