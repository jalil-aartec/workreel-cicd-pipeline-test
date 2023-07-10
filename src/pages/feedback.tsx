import React, { FC, useEffect, useState } from 'react'
import { AppLayout } from '@/components/layouts/AppLayout'
import { Table } from '@/components/common/Table/Table'
import { axios } from '@/lib/axios'
import { Protected } from '@/hooks/protected'
import { Pagination } from '@/components/common/Table/Paginations'

const Feedback: FC = () => {
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
                return <span>{first_name}</span>
            },
            key: '2',
        },
        {
            title: 'Last Name',
            dbColName: 'last_name',
            render: (last_name: any) => {
                return <span>{last_name}</span>
            },
            key: '3',
        },
        {
            title: 'Email',
            dbColName: 'email',
            render: (email: any) => {
                return <span>{email}</span>
            },
            key: '4',
        },
        {
            title: 'Phone No',
            dbColName: 'phone',
            render: (phone: any) => {
                if (phone === null) {
                    return (
                        <div>
                            <h1>__</h1>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <h1>{phone}</h1>
                        </div>
                    )
                }
            },
            key: '5',
        },
        {
            title: 'Feedback',
            dbColName: 'item',
            render: (item: { feedback: string }) => {
                return (
                    <div
                        onClick={() => openModal(item)}
                        className="cursor-pointer">
                        <span className="text-bold">View Feedback</span>
                    </div>
                )
            },
            key: '6',
        },
        {
            title: 'Rating',
            dbColName: 'rating',
            key: '7',
        },
    ]

    const [data, setData] = useState<Array<object>>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [showModal, setShowModal] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [modalFeedback, setModalFeedback] = useState('')
    console.log('ModalFeedBack:::', modalFeedback)
    const openModal = (fId: any) => {
        setShowModal(true)
        setModalFeedback(fId)
    }

    useEffect(() => {
        setLoading(true)
        axios
            .get('/api/v1/admin/user-feedback')
            .then(({ data: { data } }) => {
                console.log('FeedBackData:', data)
                setLoading(false)
                setData(
                    data?.map((item: any, index: number) => ({
                        index: ++index,
                        rating: item?.rating,
                        item: item,
                        ...item?.user,
                    })),
                )
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const filteredData = data?.filter(item => {
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
        <AppLayout>
            <h1 className="text-2xl mb-2 ml-4 mt-2">Feedback</h1>
            <div className="flex w-full align-items-end justify-end">
                <form>
                    <label
                        htmlFor="search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                        Search
                    </label>
                    <div className="relative flex my-4">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none rounded-full">
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-400 dark:text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="search"
                            className="block mr-4 w-80 pl-10 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-[#9A9ACE] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search"
                            onChange={e => setSearchText(e?.target?.value)}
                        />
                    </div>
                </form>
            </div>
            <div className="w-full mx-2">
                <Table data={current} loadingData={loading} columns={columns} />
            </div>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-xl font-semibold">
                                        {`Feedback from ${modalFeedback?.user?.first_name} ${modalFeedback?.user?.last_name}`}
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
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        {modalFeedback?.feedback}
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
                totalItems={filteredData.length}
                showingData={current}
            />
        </AppLayout>
    )
}

export default Protected(Feedback)
