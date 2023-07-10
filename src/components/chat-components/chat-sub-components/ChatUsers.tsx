import React from 'react'
import { Loader } from '@/components/common/loader/Loader'

export const ChatUsers = ({
    employeeChatUsers,
    employerChatUsers,
    userEmployerSelect,
    userEmployeeSelect,
    selectChat,
    loading,
    setLoading,
}) => {
    return (
        <div className={'flex flex-col items-center justify-start'}>
            {userEmployerSelect ? (
                <>
                    {loading ? (
                        <Loader />
                    ) : (
                        employerChatUsers.map((item: any, index: number) => {
                            setLoading(false)
                            return (
                                <>
                                    <div
                                        onClick={selectChat}
                                        key={index}
                                        className={
                                            'flex bg-white w-full items-center justify-start my-1 px-2 border-b border-b py-2 hover:bg-gray-50 active:bg-gray-50 cursor-pointer'
                                        }>
                                        <div
                                            className={
                                                'relative flex w-14 h-14 items-center justify-center object-fill'
                                            }>
                                            <div
                                                className={
                                                    'flex w-14 h-14 relative rounded-2xl shadow-xl overflow-hidden'
                                                }>
                                                <img
                                                    src={
                                                        item?.avatar
                                                            ? item?.avatar
                                                            : 'https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector.jpg'
                                                    }
                                                    className={'absolute'}
                                                    alt={'User Image'}
                                                    draggable={'false'}
                                                    width={'100%'}
                                                    height={'100%'}
                                                />
                                            </div>
                                            <div
                                                className={
                                                    'absolute flex rounded-full bg-green-500 h-4 w-4 -right-2 -top-1 border-white border-2'
                                                }
                                            />
                                        </div>
                                        <div
                                            className={
                                                'flex flex-col ml-4 items-start justify-center'
                                            }>
                                            <div
                                                className={
                                                    'flex items-center justify-center my-2'
                                                }>
                                                <p
                                                    className={
                                                        'text-sm text-background2 font-semibold font-poppins antialiased'
                                                    }>
                                                    {item?.first_name +
                                                        ' ' +
                                                        item?.last_name}
                                                </p>
                                                <div
                                                    className={
                                                        'bg-black w-2 h-2 rounded-full mx-4'
                                                    }
                                                />
                                                <p
                                                    className={
                                                        'text-sm text-background2 font-normal font-poppins antialiased'
                                                    }>
                                                    {item?.employer
                                                        ?.business_name ??
                                                        'Unknown'}
                                                </p>
                                            </div>
                                            <p
                                                className={
                                                    'text-sm text-background2 font-normal font-poppins antialiased'
                                                }>
                                                {item?.message?.body
                                                    ? item?.message?.body
                                                    : 'Continue chat...'}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    )}
                </>
            ) : (
                <>
                    {loading ? (
                        <Loader />
                    ) : (
                        employeeChatUsers.map((item: any, index: number) => {
                            return (
                                <>
                                    <div
                                        onClick={selectChat}
                                        key={index}
                                        className={
                                            'flex bg-white w-full items-center justify-start my-1 px-2 border-b border-b py-2 hover:bg-gray-50 active:bg-gray-50 cursor-pointer'
                                        }>
                                        <div
                                            className={
                                                'relative flex w-14 h-14 items-center justify-center'
                                            }>
                                            <div
                                                className={
                                                    'flex w-14 h-14 relative rounded-2xl shadow-xl overflow-hidden'
                                                }>
                                                <img
                                                    src={
                                                        item?.avatar ??
                                                        'https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector.jpg'
                                                    }
                                                    className={'absolute'}
                                                    alt={'Avatar'}
                                                    draggable={'false'}
                                                    width={'100%'}
                                                    height={'100%'}
                                                />
                                            </div>
                                            {item?.presence ? (
                                                <div
                                                    className={
                                                        'absolute flex rounded-full bg-green-500 h-4 w-4 -right-2 -top-1 border-white border-2'
                                                    }
                                                />
                                            ) : (
                                                <div
                                                    className={
                                                        'absolute flex rounded-full bg-gray-500 h-4 w-4 -right-2 -top-1 border-white border-2'
                                                    }
                                                />
                                            )}
                                        </div>
                                        <div
                                            className={
                                                'flex flex-col ml-4 items-start justify-center'
                                            }>
                                            <div
                                                className={
                                                    'flex items-center justify-center'
                                                }>
                                                <p
                                                    className={
                                                        'text-sm text-background2 font-semibold font-poppins antialiased'
                                                    }>
                                                    {item?.first_name
                                                        ? item?.first_name
                                                        : ''}
                                                </p>
                                                <div
                                                    className={
                                                        'bg-black w-2 h-2 rounded-full mx-4'
                                                    }
                                                />
                                                <p
                                                    className={
                                                        'text-sm text-background2 font-normal font-poppins antialiased'
                                                    }>
                                                    {item?.business_name
                                                        ? item?.business_name
                                                        : 'Unknown'}
                                                </p>
                                            </div>
                                            <p
                                                className={
                                                    'text-sm text-background2 font-normal font-poppins antialiased'
                                                }>
                                                {item?.message.body
                                                    ? item?.message.body
                                                    : ''}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    )}
                </>
            )}
        </div>
    )
}
