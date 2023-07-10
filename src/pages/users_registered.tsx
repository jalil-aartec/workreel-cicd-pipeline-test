import React, { useEffect, useState } from 'react'
import { AppLayout } from '@/components/layouts/AppLayout'
import { Table } from '@/components/common/Table/Table'
import { axios } from '@/lib/axios'
import { Pagination } from '@/components/common/Table/Paginations'

const UsersRegistered = () => {
    const columns = [
        {
            title: 'S.No',
            dbColName: 'index',
            key: '1',
        },
        {
            title: 'First Name',
            dbColName: 'first_name',
            render: (first_name: any) => {
                return (
                    <>
                        <span>{first_name}</span>
                    </>
                )
            },
            key: '2',
        },
        {
            title: 'Last Name',
            dbColName: 'last_name',
            render: (last_name: any) => {
                return (
                    <>
                        <span>{last_name}</span>
                    </>
                )
            },
            key: '3',
        },
        {
            title: 'Email',
            dbColName: 'email',
            render: (email: any) => {
                return (
                    <>
                        <span>{email}</span>
                    </>
                )
            },
            key: '4',
        },
        {
            title: 'Message',
            dbColName: 'message',
            render: (item: any) => {
                return (
                    <>
                        <div
                            onClick={() => {
                                // console.log('item', item)
                                setMessageOnModal(item)
                                openModal(item)
                            }}
                            className="cursor-pointer">
                            <span className="text-bold">View Message</span>
                        </div>
                    </>
                )
            },
            key: '5',
        },
    ]

    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<any>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage, setItemsPerPage] = useState<number>(10)
    const [message, setMessage] = useState<string>('')
    const [messageOnModal, setMessageOnModal] = useState({})

    const openModal = (mId: any) => {
        setShowModal(true)
        setMessage(mId)
    }

    useEffect(() => {
        setLoading(true)
        axios
            .get('/api/admin/contact-info')
            .then(({ data }) => {
                // console.log('Contact Info:', data)
                setLoading(false)
                setData(
                    data?.map((item: any, index: number) => ({
                        index: ++index,
                        user: item,
                        ...item,
                    })),
                )
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const filteredData = data?.filter((item: any) => {
        return (
            item?.first_name
                ?.toLowerCase()
                ?.includes(searchText?.toLowerCase()) ||
            item?.last_name
                ?.toLowerCase()
                ?.includes(searchText?.toLowerCase()) ||
            item?.email?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            item?.phone?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
    })

    const last = currentPage * itemsPerPage
    const first = last - itemsPerPage
    const current = filteredData?.slice(first, last)

    return (
        <section>
            <AppLayout>
                <div
                    className={
                        'flex w-full items-center justify-start py-8 px-4'
                    }>
                    <h1
                        className={
                            'text-2xl text-background2 font-semibold antialiased tracking-wide'
                        }>
                        WorkReel Web User's Messages
                    </h1>
                </div>
                <Table
                    data={filteredData}
                    loadingData={loading}
                    columns={columns}
                />
                {showModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-xl font-semibold">
                                            Message
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}>
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-8 flex-auto">
                                        <p className="my-4 text-slate-500 text-md leading-relaxed">
                                            {messageOnModal}
                                        </p>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent hover:bg-blue-200 rounded-2xl font-semibold capitalize px-4 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black" />
                    </>
                ) : null}
                <Pagination
                    totalItems={40}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    showingData={current}
                />
            </AppLayout>
        </section>
    )
}

export default UsersRegistered
