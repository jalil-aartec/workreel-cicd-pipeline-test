import { AppLayout } from '@/components/layouts/AppLayout'
import React, { FC, useEffect, useState } from 'react'
import { axios } from '@/lib/axios'
import { Table } from '@/components/common/Table/Table'
import { ChatAltIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { Protected } from '@/hooks/protected'
import { Pagination } from '@/components/common/Table/Paginations'
import swal from 'sweetalert'
import Toggle from '@/components/Toggle'
import { useRouter } from 'next/router'
import { CSVLink } from 'react-csv'

const Employer: FC = () => {
    const columns = [
        {
            title: 'S.No',
            dbColName: 'index',
            key: '1',
        },
        {
            title: 'Avatar',
            dbColName: 'avatar',
            render: (avatar: any) => {
                if (avatar === null) {
                    return (
                        <div className="flex-shrink-0 w-12 h-12">
                            <img
                                src="/assets/images/avatar.png"
                                alt=""
                                className="rounded-full"
                            />
                        </div>
                    )
                } else {
                    return (
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl">
                            <img
                                src={avatar}
                                alt=""
                                className="rounded-full w-12 h-12"
                            />
                        </div>
                    )
                }
            },
            key: '2',
        },
        {
            title: 'First Name',
            dbColName: 'first_name',
            render: (first_name: any) => {
                let displayFullName =
                    first_name?.length > 5
                        ? first_name?.substring(0, 5) + '...'
                        : first_name
                if (fullFirstName === first_name) {
                    displayFullName = first_name
                }
                if (displayFullName !== null) {
                    return (
                        <span
                            className={
                                displayFullName?.length > 5
                                    ? 'cursor-pointer'
                                    : null
                            }
                            onClick={() => showFirstName(first_name)}>
                            {displayFullName}
                        </span>
                    )
                } else {
                    return <span>__</span>
                }
            },
            key: '3',
        },
        {
            title: 'Last Name',
            dbColName: 'last_name',
            render: (last_name: any) => {
                let displayFullLastName =
                    last_name?.length > 5
                        ? last_name?.substring(0, 5) + '...'
                        : last_name
                if (fullLastName === last_name) {
                    displayFullLastName = last_name
                }
                if (displayFullLastName !== null) {
                    return (
                        <span
                            className={
                                displayFullLastName?.length > 5
                                    ? 'cursor-pointer'
                                    : null
                            }
                            onClick={() => showLastFullName(last_name)}>
                            {displayFullLastName}
                        </span>
                    )
                } else {
                    return <span>__</span>
                }
            },
            key: '4',
        },
        {
            title: 'Email',
            dbColName: 'email',
            render: (email: any) => {
                let displayEmail =
                    email?.length > 10 ? email?.substring(0, 10) + '...' : email
                if (fullEmail === email) {
                    displayEmail = email
                }
                if (displayEmail !== null) {
                    return (
                        <span
                            className={
                                displayEmail?.length > 10
                                    ? 'cursor-pointer'
                                    : null
                            }
                            onClick={() => showFullEmail(email)}>
                            {displayEmail}
                        </span>
                    )
                } else {
                    return <span>__</span>
                }
            },
            key: '5',
        },
        {
            title: 'Email Verification',
            dbColName: 'user',
            render: (user: { email_verified_at: string }) => {
                return user?.email_verified_at === null ? (
                    <span
                        onClick={() => openModal(user)}
                        className="px-2 inline-flex text-xs cursor-pointer leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Pending
                    </span>
                ) : (
                    <span className="px-2 inline-flex text-xs cursor-pointer leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Verified
                    </span>
                )
            },
            key: '6',
        },
        {
            title: 'Phone No',
            dbColName: 'phone',
            render: phone => {
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
            key: '7',
        },
        {
            title: 'business Name',
            dbColName: 'business_name',
            // render: business_name => {
            //     let displayBusinessName = business_name.substring(0, 10) + '...'
            //     if (fullBusinessName === business_name) {
            //         displayBusinessName = business_name
            //     }
            //     if (displayBusinessName !== null) {
            //         return (
            //             <span
            //                 onClick={() => showFullBusinessName(business_name)}>
            //                 {displayBusinessName}
            //             </span>
            //         )
            //     } else {
            //         return <span>__</span>
            //     }
            // },
            key: '8',
        },
        {
            title: 'action',
            dbColName: 'id',
            render: (id: number) => {
                return (
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => handleChat(id)}
                            className={'p-2'}>
                            <ChatAltIcon className="text-cyan-500 h-10 w-10 hover:shadow hover:bg-yellow-100 rounded-lg" />
                        </button>
                        <button
                            className={'p-2'}
                            type="button"
                            onClick={() => editFunction(id)}>
                            <PencilAltIcon className="text-blue-500 h-10 w-10 hover:shadow hover:bg-yellow-100 rounded-lg" />
                        </button>
                        <button
                            className={'p-2'}
                            type="button"
                            onClick={() => deleteAccount(id)}>
                            <TrashIcon className="text-red-500 h-10 w-10 hover:shadow hover:bg-yellow-100 rounded-lg" />
                        </button>
                    </div>
                )
            },
            key: '9',
        },
    ]

    const [data, setData] = useState<Array<object>>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [searchText, setSearchText] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(50)
    const [totalNoOfData, setTotalNoOfData] = useState()
    const [showModal, setShowModal] = useState(false)
    const [editData, setEditData] = useState({})
    const [newPassword, setNewPassword] = useState('')
    const [reloadData, setReloadData] = useState(false)
    const [emailVerification, setEmailVerification] = useState('')
    // Show FirstName, lastName, Email States
    const [fullFirstName, setFullFirstName] = useState('')
    const [fullLastName, setFullLastName] = useState('')
    const [fullEmail, setFullEmail] = useState('')
    const [fullBusinessName, setFullBusinessName] = useState('')
    const router = useRouter()
    const handleChat = async (id: any) => {
        try {
            const { data } = await axios.post(`/api/v1/admin/create-chat`, {
                participant_id: id,
                chat_Id: id,
            })
            if (data?.partner_id && id === id) {
                await router.push('/chat/', id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setLoading(true)
        axios
            .get(`/api/v1/admin/employers?page=${currentPage}`)
            .then(({ data: { data } }) => {
                setLoading(false)
                setData(
                    data?.data.map((item: any, index: number) => ({
                        index: ++index,
                        user: item,
                        business_name: item?.employers?.map(
                            (ele: any) => ele?.business_name,
                        ),
                        ...item,
                    })),
                )
                setTotalNoOfData(data?.total)
            })
            .catch(error => {
                console.log(error)
            })
    }, [currentPage, reloadData])

    const filteredData = data?.filter(item => {
        return (
            item?.first_name
                ?.toLowerCase()
                ?.includes(searchText.toLowerCase()) ||
            item?.last_name
                ?.toLowerCase()
                ?.includes(searchText?.toLowerCase()) ||
            item?.email?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            item?.phone?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
    })

    // const searchData = filteredData
    const openModal = (emailData: any) => {
        setEmailVerification(emailData)
        setShowModal(true)
    }
    const handleChange = async () => {
        if (emailVerification?.email !== null) {
            await axios
                .get(`/api/v1/admin/verify-email/${emailVerification?.email}`)
                .then(() => {
                    swal({
                        title: 'Success!',
                        text: 'Your email has been verified!',
                        icon: 'success',
                        button: 'Ok',
                    })
                    setEmailVerification('')
                    setReloadData(!reloadData)
                    setShowModal(false)
                })
                .catch(e => console.log(e?.response?.data))
        } else {
            await swal({
                title: 'Invalid Email!',
                text: "It seems like your email doesn't exist in our Data please retry with another email",
                icon: 'warning',
                button: 'Ok',
            })
            setShowModal(false)
        }
    }

    const editFunction = (id: number) => {
        setShowModal(true)
        const editItem = data?.find(item => {
            return item?.id === id
        })
        setEditData(editItem)
    }

    const changePassword = async () => {
        const data = {
            id: editData?.id,
            password: newPassword,
        }
        const response = await axios.post('/api/v1/admin/change-password', data)
        if (response?.status === 200) {
            swal({
                title: `${response?.data}`,
                icon: 'success',
                buttons: 'Ok',
            })
            setShowModal(false)
            setEditData({})
        }
    }

    const deleteAccount = async (id: number) => {
        swal({
            title: 'Are you sure?',
            text: 'Do you want to delete this account',
            icon: 'warning',
            buttons: ['Cancel', 'Delete'],
            dangerMode: true,
        }).then(willDelete => {
            if (willDelete) {
                axios
                    .delete(`/api/v1/admin/delete-account/${id}`)
                    .then(() => {
                        swal({
                            title: 'Deleted Successfully',
                            icon: 'success',
                            buttons: 'ok',
                        })
                        const responseData = data?.filter(
                            item => item?.id !== id,
                        )
                        setData([...responseData])
                    })
                    .catch(e => {
                        console.log(e?.response?.data?.message)
                        swal({
                            title: e?.response?.data?.message,
                            icon: 'error',
                            buttons: 'ok',
                        })
                    })
            }
        })
    }

    const last = currentPage * itemsPerPage
    const first = last - itemsPerPage
    const current = filteredData?.slice(first, last)

    // show FirstFullName Function
    const showFirstName = (name: string) => {
        if (fullFirstName === name) {
            setFullFirstName('')
        } else {
            setFullFirstName(name)
        }
    }
    // show fullLastName Function
    const showLastFullName = (name: string) => {
        if (fullLastName === name) {
            setFullLastName('')
        } else {
            setFullLastName(name)
        }
    }
    // show FullEmail Function
    const showFullEmail = (email: string) => {
        if (fullEmail === email) {
            setFullEmail('')
        } else {
            setFullEmail(email)
        }
    }
    // show FullBusinessName function
    const showFullBusinessName = (business: string) => {
        if (fullBusinessName === business) {
            setFullBusinessName('')
        } else {
            setFullBusinessName(business)
        }
    }

    // const handleChatNavigation = async () => {
    //     const response: any = await axios
    //         .get('http://localhost:8000/api/v1/admin/employer-chats/all')
    //         .then(res => res.status === 200)
    //         .catch(error => console.log('dataaaaaaa', response))
    // }

    const headers = [
        { label: 'First Name', key: 'details.firstName' },
        { label: 'Last Name', key: 'details.lastName' },
        { label: 'Email', key: 'email' },
        { label: 'Phone No', key: 'phone' },
        { label: 'Business Name', key: 'business' },
    ]
    const csvFile = data?.map(item => {
        return {
            details: {
                firstName: `${item?.first_name}`,
                lastName: `${item?.last_name}`,
            },
            email: `${item?.email}`,
            phone: `${item?.phone}`,
            business: `${item?.business_name}`,
        }
    })

    return (
        <AppLayout>
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-2xl mb-2 ml-4 mt-2">Employers</h1>
                <div className="mb-2 mr-4 mt-2">
                    <CSVLink
                        data={csvFile}
                        headers={headers}
                        filename={'Employer'}
                        target={'_blank'}>
                        <button className="text-xl bg-blue-400 font-semibold rounded-xl p-2 text-white">
                            Import to CSV
                        </button>
                    </CSVLink>
                </div>
            </div>
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
                <Table
                    data={filteredData}
                    loadingData={loading}
                    columns={columns}
                />{' '}
            </div>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
                totalItems={totalNoOfData}
                showingData={current}
            />
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                                    {Object?.keys(editData)?.length !== 0 ? (
                                        <h3 className="text-xl font-semibold self-center">
                                            {editData?.email}
                                        </h3>
                                    ) : (
                                        <h3 className="text-xl font-semibold self-center">
                                            {emailVerification?.email}
                                        </h3>
                                    )}
                                    <button
                                        className="p-1 ml-auto bg-red-500 border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}>
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex flex-col justify-between w-[400px]">
                                    {/*<p className="flex self-end">Pending</p>*/}
                                    {Object?.keys(editData)?.length !== 0 ? (
                                        <div className=" flex flex-row items-center justify-between w-[400px] h-[48px]">
                                            <p className="mt-2 text-slate-500 text-lg leading-relaxed">
                                                New Password:
                                            </p>
                                            <div className="h-[30px] mr-14">
                                                <input
                                                    type={'text'}
                                                    className="h-10 w-48 border-slate-300 rounded-lg text-sm"
                                                    placeholder="Enter new password"
                                                    onChange={e =>
                                                        setNewPassword(
                                                            e?.target?.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className=" flex flex-row items-center justify-between w-[400px] h-[48px]">
                                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                Status
                                            </p>
                                            <div className="h-[30px] mr-14">
                                                <Toggle
                                                    defaultValue={
                                                        emailVerification?.email_verified_at
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            setEditData({})
                                            setEmailVerification('')
                                            setShowModal(false)
                                        }}>
                                        Cancel
                                    </button>
                                    {Object?.keys(editData)?.length !== 0 ? (
                                        <button
                                            className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={changePassword}>
                                            Submit
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black" />
                </>
            ) : null}
        </AppLayout>
    )
}

export default Protected(Employer)
