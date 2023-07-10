import React from 'react'
import Image from 'next/image'

export const ChatHeader = () => {
    return (
        <div
            className={
                'flex flex-col items-center justify-start w-full bg-[#EBF2F5]'
            }>
            <div
                className={
                    'flex w-full items-center justify-between h-20 shadow-xl bg-white'
                }>
                <div className={'flex h-full items-center justify-center'}>
                    <div
                        className={
                            'relative flex w-16 h-16 mx-4 rounded-2xl border border border-gray-600'
                        }>
                        <Image
                            src={'/static/photo4.jpeg'}
                            width={'100%'}
                            height={'100%'}
                            alt={'User Image'}
                            className={'absolute'}
                            objectFit={'cover'}
                        />
                        <div
                            className={
                                'absolute flex rounded-full bg-green-500 h-4 w-4 -right-2 -top-1 border-transparent border-2'
                            }
                        />
                    </div>
                    <div className={'flex flex-col justify-center items-start'}>
                        <p
                            className={
                                'text-background2 text-lg font-poppins font-semibold antialiased py-1'
                            }>
                            Nick Benz
                        </p>
                        <p
                            className={
                                'text-background2 text-md font-poppins font-semibold antialiased py-px'
                            }>
                            Chef
                        </p>
                    </div>
                </div>
                <div className={'flex h-full items-center justify-center mx-4'}>
                    <div
                        className={
                            'flex relative w-11 h-11 mx-4 rounded-full object-cover items-center justify-center hover:shadow-xl active:bg-gray-200'
                        }>
                        <svg
                            className={'absolute'}
                            width="58"
                            height="58"
                            viewBox="0 0 58 58"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_8862_93424)">
                                <rect
                                    x="8"
                                    y="6"
                                    width="42"
                                    height="42"
                                    rx="21"
                                    fill="white"
                                />
                            </g>
                            <path
                                d="M34.45 37.75C33.32 37.75 32.13 37.48 30.9 36.96C29.7 36.45 28.49 35.75 27.31 34.9C26.14 34.04 25.01 33.08 23.94 32.03C22.88 30.96 21.92 29.83 21.07 28.67C20.21 27.47 19.52 26.27 19.03 25.11C18.51 23.87 18.25 22.67 18.25 21.54C18.25 20.76 18.39 20.02 18.66 19.33C18.94 18.62 19.39 17.96 20 17.39C20.77 16.63 21.65 16.25 22.59 16.25C22.98 16.25 23.38 16.34 23.72 16.5C24.11 16.68 24.44 16.95 24.68 17.31L27 20.58C27.21 20.87 27.37 21.15 27.48 21.43C27.61 21.73 27.68 22.03 27.68 22.32C27.68 22.7 27.57 23.07 27.36 23.42C27.21 23.69 26.98 23.98 26.69 24.27L26.01 24.98C26.02 25.01 26.03 25.03 26.04 25.05C26.16 25.26 26.4 25.62 26.86 26.16C27.35 26.72 27.81 27.23 28.27 27.7C28.86 28.28 29.35 28.74 29.81 29.12C30.38 29.6 30.75 29.84 30.97 29.95L30.95 30L31.68 29.28C31.99 28.97 32.29 28.74 32.58 28.59C33.13 28.25 33.83 28.19 34.53 28.48C34.79 28.59 35.07 28.74 35.37 28.95L38.69 31.31C39.06 31.56 39.33 31.88 39.49 32.26C39.64 32.64 39.71 32.99 39.71 33.34C39.71 33.82 39.6 34.3 39.39 34.75C39.18 35.2 38.92 35.59 38.59 35.95C38.02 36.58 37.4 37.03 36.68 37.32C35.99 37.6 35.24 37.75 34.45 37.75ZM22.59 17.75C22.04 17.75 21.53 17.99 21.04 18.47C20.58 18.9 20.26 19.37 20.06 19.88C19.85 20.4 19.75 20.95 19.75 21.54C19.75 22.47 19.97 23.48 20.41 24.52C20.86 25.58 21.49 26.68 22.29 27.78C23.09 28.88 24 29.95 25 30.96C26 31.95 27.08 32.87 28.19 33.68C29.27 34.47 30.38 35.11 31.48 35.57C33.19 36.3 34.79 36.47 36.11 35.92C36.62 35.71 37.07 35.39 37.48 34.93C37.71 34.68 37.89 34.41 38.04 34.09C38.16 33.84 38.22 33.58 38.22 33.32C38.22 33.16 38.19 33 38.11 32.82C38.08 32.76 38.02 32.65 37.83 32.52L34.51 30.16C34.31 30.02 34.13 29.92 33.96 29.85C33.74 29.76 33.65 29.67 33.31 29.88C33.11 29.98 32.93 30.13 32.73 30.33L31.97 31.08C31.58 31.46 30.98 31.55 30.52 31.38L30.25 31.26C29.84 31.04 29.36 30.7 28.83 30.25C28.35 29.84 27.83 29.36 27.2 28.74C26.71 28.24 26.22 27.71 25.71 27.12C25.24 26.57 24.9 26.1 24.69 25.71L24.57 25.41C24.51 25.18 24.49 25.05 24.49 24.91C24.49 24.55 24.62 24.23 24.87 23.98L25.62 23.2C25.82 23 25.97 22.81 26.07 22.64C26.15 22.51 26.18 22.4 26.18 22.3C26.18 22.22 26.15 22.1 26.1 21.98C26.03 21.82 25.92 21.64 25.78 21.45L23.46 18.17C23.36 18.03 23.24 17.93 23.09 17.86C22.93 17.79 22.76 17.75 22.59 17.75ZM30.95 30.01L30.79 30.69L31.06 29.99C31.01 29.98 30.97 29.99 30.95 30.01Z"
                                fill="#1B1B1B"
                            />
                            <defs>
                                <filter
                                    id="filter0_d_8862_93424"
                                    x="0"
                                    y="0"
                                    width="58"
                                    height="58"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB">
                                    <feFlood
                                        floodOpacity="0"
                                        result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        result="hardAlpha"
                                    />
                                    <feOffset dy="2" />
                                    <feGaussianBlur stdDeviation="4" />
                                    <feComposite
                                        in2="hardAlpha"
                                        operator="out"
                                    />
                                    <feColorMatrix
                                        type="matrix"
                                        values="0 0 0 0 0.396111 0 0 0 0 0.408167 0 0 0 0 0.516667 0 0 0 0.2 0"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in2="BackgroundImageFix"
                                        result="effect1_dropShadow_8862_93424"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="effect1_dropShadow_8862_93424"
                                        result="shape"
                                    />
                                </filter>
                            </defs>
                        </svg>
                    </div>
                    <div
                        className={
                            'flex relative w-11 h-11 mx-4 rounded-full object-cover items-center justify-center hover:shadow-xl active:bg-gray-200'
                        }>
                        <svg
                            className={'absolute'}
                            width="58"
                            height="58"
                            viewBox="0 0 58 58"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_b_8862_93420)">
                                <rect
                                    x="8"
                                    y="6"
                                    width="42"
                                    height="42"
                                    rx="21"
                                    fill="#444444"
                                    fillOpacity="0.4"
                                />
                            </g>
                            <g filter="url(#filter1_d_8862_93420)">
                                <rect
                                    x="8"
                                    y="6"
                                    width="42"
                                    height="42"
                                    rx="21"
                                    fill="white"
                                />
                            </g>
                            <path
                                d="M32 27.95H25C24.59 27.95 24.25 27.61 24.25 27.2C24.25 26.79 24.59 26.45 25 26.45H32C32.41 26.45 32.75 26.79 32.75 27.2C32.75 27.61 32.41 27.95 32 27.95Z"
                                fill="#1B1B1B"
                            />
                            <path
                                d="M29.38 31.95H25C24.59 31.95 24.25 31.61 24.25 31.2C24.25 30.79 24.59 30.45 25 30.45H29.38C29.79 30.45 30.13 30.79 30.13 31.2C30.13 31.61 29.79 31.95 29.38 31.95Z"
                                fill="#1B1B1B"
                            />
                            <path
                                d="M31 21.75H27C26.04 21.75 24.25 21.75 24.25 19C24.25 16.25 26.04 16.25 27 16.25H31C31.96 16.25 33.75 16.25 33.75 19C33.75 19.96 33.75 21.75 31 21.75ZM27 17.75C26.01 17.75 25.75 17.75 25.75 19C25.75 20.25 26.01 20.25 27 20.25H31C32.25 20.25 32.25 19.99 32.25 19C32.25 17.75 31.99 17.75 31 17.75H27Z"
                                fill="#1B1B1B"
                            />
                            <path
                                d="M32 37.75H26C20.38 37.75 19.25 35.17 19.25 31V25C19.25 20.44 20.9 18.49 24.96 18.28C25.36 18.26 25.73 18.57 25.75 18.99C25.77 19.41 25.45 19.75 25.04 19.77C22.2 19.93 20.75 20.78 20.75 25V31C20.75 34.7 21.48 36.25 26 36.25H32C36.52 36.25 37.25 34.7 37.25 31V25C37.25 20.78 35.8 19.93 32.96 19.77C32.55 19.75 32.23 19.39 32.25 18.98C32.27 18.57 32.63 18.25 33.04 18.27C37.1 18.49 38.75 20.44 38.75 24.99V30.99C38.75 35.17 37.62 37.75 32 37.75Z"
                                fill="#1B1B1B"
                            />
                            <defs>
                                <filter
                                    id="filter0_b_8862_93420"
                                    x="2"
                                    y="0"
                                    width="54"
                                    height="54"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB">
                                    <feFlood
                                        floodOpacity="0"
                                        result="BackgroundImageFix"
                                    />
                                    <feGaussianBlur
                                        in="BackgroundImageFix"
                                        stdDeviation="3"
                                    />
                                    <feComposite
                                        in2="SourceAlpha"
                                        operator="in"
                                        result="effect1_backgroundBlur_8862_93420"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="effect1_backgroundBlur_8862_93420"
                                        result="shape"
                                    />
                                </filter>
                                <filter
                                    id="filter1_d_8862_93420"
                                    x="0"
                                    y="0"
                                    width="58"
                                    height="58"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB">
                                    <feFlood
                                        floodOpacity="0"
                                        result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        result="hardAlpha"
                                    />
                                    <feOffset dy="2" />
                                    <feGaussianBlur stdDeviation="4" />
                                    <feComposite
                                        in2="hardAlpha"
                                        operator="out"
                                    />
                                    <feColorMatrix
                                        type="matrix"
                                        values="0 0 0 0 0.396111 0 0 0 0 0.408167 0 0 0 0 0.516667 0 0 0 0.2 0"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in2="BackgroundImageFix"
                                        result="effect1_dropShadow_8862_93420"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="effect1_dropShadow_8862_93420"
                                        result="shape"
                                    />
                                </filter>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
