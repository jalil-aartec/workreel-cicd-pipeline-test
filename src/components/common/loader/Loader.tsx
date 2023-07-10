import React from 'react'
import Image from 'next/image'

export const Loader = () => {
    return (
        <div className="relative min-h-screen w-full flex justify-center items-center">
            <span className="animate-bounce relative flex h-16 w-16 rounded-lg bg-white dark:bg-gray-900">
                <Image
                    src={'/static/workreelW.svg'}
                    height={'100%'}
                    width={'100%'}
                    className={'absolute'}
                    layout={'fill'}
                    objectFit={'contain'}
                />
            </span>
        </div>
    )
}
