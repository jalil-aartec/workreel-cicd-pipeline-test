import React, { FC, useEffect, useState } from 'react'
import { AppLayout } from '@/components/layouts/AppLayout'
import { Table } from '@/components/common/Table/Table'
import { axios } from '@/lib/axios'
import { Protected } from '@/hooks/protected'
import Toggle from '@/components/Toggle'
import { Pagination } from '@/components/common/Table/Paginations'
import swal from 'sweetalert'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { CSVLink } from 'react-csv'

const Talent: FC = () => {
    const columns = [
        {
            title: 'S.No',
            dbColName: 'index',
            key: '1',
        },
        {
            title: 'Avatar',
            dbColName: 'avatar',
            render: avatar => {
                if (avatar === null) {
                    return (
                        <div className="w-12 h-12">
                            <img
                                src="/assets/images/avatar.png"
                                alt=""
                                className="rounded-full"
                            />
                        </div>
                    )
                } else {
                    return (
                        <div className="w-12 h-12 rounded-2xl">
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
            render: first_name => {
                let displayFirstName =
                    first_name?.length > 5
                        ? first_name?.substring(0, 5) + '...'
                        : first_name
                if (fullFirstName === first_name) {
                    displayFirstName = first_name
                }
                if (displayFirstName !== null) {
                    return (
                        <span
                            className={
                                displayFirstName?.length > 5
                                    ? 'cursor-pointer'
                                    : null
                            }
                            onClick={() => showFullFirstName(first_name)}>
                            {displayFirstName}
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
            render: last_name => {
                let displayLastName =
                    last_name?.length > 5
                        ? last_name?.substring(0, 5) + '...'
                        : last_name
                if (fullLastName === last_name) {
                    displayLastName = last_name
                }
                if (displayLastName !== null) {
                    return (
                        <span
                            className={
                                displayLastName?.length > 5
                                    ? 'cursor-pointer'
                                    : null
                            }
                            onClick={() => showFullLastName(last_name)}>
                            {displayLastName}
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
            render: email => {
                let displayEmail =
                    email?.length > 10 ? email?.substring(0, 10) + '...' : email
                if (fullEmail === email) {
                    displayEmail = email
                }
                if (displayEmail !== null) {
                    return (
                        <>
                            <span
                                className={
                                    displayEmail?.length > 10
                                        ? 'cursor-pointer'
                                        : null
                                }
                                onClick={() => showEmail(email)}>
                                {displayEmail}
                            </span>
                        </>
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
            title: 'Phone no',
            dbColName: 'phone',
            render: phoneNumber => {
                if (phoneNumber === null) {
                    return (
                        <div>
                            <h1>__</h1>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <h1>{phoneNumber}</h1>
                        </div>
                    )
                }
            },
            key: '7',
        },
        {
            title: 'WorkReel visibility',
            dbColName: 'user',
            render: (user: { is_show: number }) => {
                if (user?.is_show === 1) {
                    return (
                        <Toggle
                            defaultValue={user?.is_show}
                            onChange={() => handleChange(user)}
                        />
                    )
                } else {
                    return (
                        <Toggle
                            defaultValue={false}
                            onChange={() => handleChange(user)}
                        />
                    )
                }
            },
            key: '8',
        },
        {
            title: 'action',
            dbColName: 'id',
            render: (id: number) => {
                return (
                    <div className="flex">
                        <button type="button" onClick={() => editFunction(id)}>
                            <PencilAltIcon className="text-blue-500 h-8 w-8" />
                        </button>
                        <button
                            type="button"
                            onClick={() => deleteFunction(id)}>
                            <TrashIcon className="text-red-500 h-8 w-8" />
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
    const [showModal, setShowModal] = useState(false)
    const [emailVerification, setEmailVerification] = useState('')
    const [totalNoOfData, setTotalNoOfData] = useState()
    const [editData, setEditData] = useState({})
    const [newPassword, setNewPassword] = useState('')
    const [reloadData, setReloadData] = useState(false)
    // Show Full firstName, lastName, Email States
    const [fullEmail, setFullEmail] = useState('')
    const [fullLastName, setFullLastName] = useState('')
    const [fullFirstName, setFullFirstName] = useState('')

    useEffect(() => {
        setLoading(true)
        axios
            .get(`/api/v1/admin/employees?page=${currentPage}`)
            .then(({ data: { data } }) => {
                setLoading(false)
                setData(
                    data?.data.map((item, index) => ({
                        index: ++index,
                        user: item,
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
                ?.includes(searchText?.toLowerCase()) ||
            item?.last_name
                ?.toLowerCase()
                ?.includes(searchText?.toLowerCase()) ||
            item?.email?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            item?.phone?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
    })

    const handleChange = async user => {
        if (emailVerification?.email !== null) {
            await axios
                .get(`/api/v1/admin/change-user-visibility/${user?.id}`)
                .then(response => {
                    if (response?.data?.is_show === 1) {
                        swal({
                            title: 'Success!',
                            text: `${response?.data?.first_name} profile is set to public`,
                            icon: 'success',
                            button: 'Ok',
                        })
                        setEmailVerification('')
                        setReloadData(!reloadData)
                        setShowModal(false)
                    } else {
                        swal({
                            title: 'Success!',
                            text: `${response?.data?.first_name} profile is set to private`,
                            icon: 'success',
                            button: 'Ok',
                        })
                        setEmailVerification('')
                        setReloadData(!reloadData)
                        setShowModal(false)
                    }
                })
                .catch(e => console.log(e?.response?.data))
        } else {
            await swal({
                title: 'Invalid Email!',
                text: "It seems like your email does't exist in our Data please retry with another email",
                icon: 'warning',
                button: 'Ok',
            })
            setShowModal(false)
            setEditData({})
        }
    }

    const last = currentPage * itemsPerPage
    const first = last - itemsPerPage
    const current = filteredData?.slice(first, last)

    const openModal = emailData => {
        setEmailVerification(emailData)
        setShowModal(true)
    }

    const editFunction = id => {
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
            setEditData({})
            setShowModal(false)
        }
    }

    const deleteFunction = async id => {
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
                        // logError(e)
                    })
            }
        })
    }

    // Show Email function
    const showEmail = email => {
        if (fullEmail === email) {
            setFullEmail('')
        } else {
            setFullEmail(email)
        }
    }
    // Show FirstName function
    const showFullFirstName = name => {
        if (fullFirstName === name) {
            setFullFirstName('')
        } else {
            setFullFirstName(name)
        }
    }
    // show FullLastName function
    const showFullLastName = name => {
        if (fullLastName === name) {
            setFullLastName('')
        } else {
            setFullLastName(name)
        }
    }

    const headers = [
        { label: 'First Name', key: 'details.firstName' },
        { label: 'Last Name', key: 'details.lastName' },
        { label: 'Email', key: 'email' },
        { label: 'Phone No', key: 'phone' },
    ]
    const csvFile = data?.map(item => {
        return {
            details: {
                firstName: `${item?.first_name}`,
                lastName: `${item?.last_name}`,
            },
            email: `${item?.email}`,
            phone: `${item?.phone}`,
        }
    })
    return (
        <AppLayout>
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-2xl mb-2 ml-4 mt-2">Talent</h1>
                <div className="mb-2 mr-4 mt-2">
                    <CSVLink
                        data={csvFile}
                        headers={headers}
                        filename={'Talent'}
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
                />
            </div>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    {Object?.keys(editData)?.length !== 0 ? (
                                        <h3 className="text-xl font-semibold">
                                            {editData?.email}
                                        </h3>
                                    ) : (
                                        <h3 className="text-xl font-semibold">
                                            {emailVerification?.email}
                                        </h3>
                                    )}
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}>
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex flex-col justify-between w-[400px]">
                                    {Object?.keys(editData)?.length !== 0 ? (
                                        <div className=" flex flex-row items-center justify-between w-[400px] h-[48px]">
                                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                New Password
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
                                        Close
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
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
                totalItems={totalNoOfData}
                showingData={current}
            />
        </AppLayout>
    )
}

export default Protected(Talent)
