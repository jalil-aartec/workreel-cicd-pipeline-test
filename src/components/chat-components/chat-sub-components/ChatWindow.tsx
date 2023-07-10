import React from 'react'

export const ChatWindow = ({ chatMessages }) => {
    return (
        <div
            className={
                'flex flex-col h-full w-full items-center justify-between px-4'
            }>
            <div className={'flex flex-col w-full items-center justify-start'}>
                <div className={'flex items-center justify-center my-4'}>
                    <p
                        className={
                            'text-gray-500 text-sm font-poppins font-semibold antialiased'
                        }>
                        10 DEC 2021
                    </p>
                </div>
                <div className={'flex w-full items-center justify-end'}>
                    <div
                        className={
                            'flex w-2/4 p-4 mx-4 my-4 rounded-b-3xl rounded-tl-3xl shadow-xl bg-background2 items-center justify-center'
                        }>
                        {chatMessages.map((item, index) => {
                            return (
                                <h1
                                    key={index}
                                    className={
                                        'text-white text-md font-poppins font-normal antialiased tracking-wide'
                                    }>
                                    {item?.data?.body.message.toString()}
                                    Hi Nick, I saw your terrific latte art on
                                    WorkReel. Would you be able for a call today
                                    at 4pm? Cheers, Peter (Manager, Brickwood)
                                </h1>
                            )
                        })}
                    </div>
                </div>
                <div className={'flex w-full items-center justify-start'}>
                    <div
                        className={
                            'flex w-2/4 p-4 mx-4 my-4 rounded-b-3xl rounded-tr-3xl shadow-xl bg-white items-center justify-center'
                        }>
                        <h1
                            className={
                                'text-black text-md font-poppins font-normal antialiased tracking-wide'
                            }>
                            Hi Peter, I also loved Brickwood's WorkReel - the
                            cafe looks so cute and like the vibe. I look forward
                            to your call soon. Thanks! Christina.
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
