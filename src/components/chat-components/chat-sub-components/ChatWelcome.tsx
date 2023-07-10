import React from 'react'

export const ChatWelcome = () => {
    return (
        <div className={'flex flex-col w-full items-center justify-center'}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-device-desktop"
                width="400"
                height="400"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <rect x="3" y="4" width="18" height="12" rx="1" />
                <line x1="7" y1="20" x2="17" y2="20" />
                <line x1="9" y1="16" x2="9" y2="20" />
                <line x1="15" y1="16" x2="15" y2="20" />
            </svg>
            <h1
                className={
                    'lg:text-2xl md:text-2xl text-center text-background2 font-semibold font-poppins antialiased'
                }>
                WorkReel Desktop Chat
            </h1>
            <div className={'flex-1 w-3/5 items-center justify-center'}>
                <p
                    className={
                        'lg:text-sm md:text-md text-center text-gray-500 font-semibold font-poppins antialiased'
                    }>
                    Welcome to WorkReel Chat you may send messages, video &
                    Audio Call to any of employer in WorkReel Platform. You can
                    also send PDF, PNG, JPEG, GIf and much more.
                </p>
            </div>
        </div>
    )
}
