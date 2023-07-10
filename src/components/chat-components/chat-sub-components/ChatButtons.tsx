import React from 'react'

export const ChatButtons = ({
    handleEmployeeButtonSelect,
    handleEmployerButtonSelect,
    userEmployeeSelect,
    userEmployerSelect,
    chatSearch,
    handleInput,
}) => {
    return (
        <div className="flex h-40 flex-col flex-grow overflow-y-auto">
            <div className="flex-grow flex flex-col">
                <nav className="flex items-center justify-around my-4">
                    <div
                        onClick={handleEmployerButtonSelect}
                        className={
                            !userEmployerSelect
                                ? 'w-full p-2 text-md text-background2 bg-gradient-to-t from-amber-50 to-white text-center cursor-pointer font-normal font-poppins scale-x-105 transform transition delay-150 duration-300 shadow-md hover:shadow-xl rounded-xl mx-2'
                                : 'w-full p-2 text-md text-white bg-black to-white text-center cursor-pointer font-semibold font-poppins scale-x-105 transform transition delay-150 duration-300 shadow-md hover:shadow-xl rounded-xl mx-2'
                        }>
                        Employer
                    </div>
                    <div
                        onClick={handleEmployeeButtonSelect}
                        className={
                            !userEmployeeSelect
                                ? 'w-full p-2 text-md text-background2 bg-gradient-to-t from-amber-50 to-white text-center cursor-pointer font-normal font-poppins scale-x-105 transform transition delay-150 duration-300 shadow-md hover:shadow-xl rounded-xl mx-2'
                                : 'w-full p-2 text-md text-white bg-black to-white text-center cursor-pointer font-semibold font-poppins scale-x-105 transform transition delay-150 duration-300 shadow-md hover:shadow-xl rounded-xl mx-2'
                        }>
                        Talent
                    </div>
                </nav>
                <div
                    className={
                        'flex relative px-4 my-2 items-center justify-center'
                    }>
                    <input
                        placeholder={'Search'}
                        value={chatSearch}
                        type={'text'}
                        className={
                            'w-full text-sm text-background2 rounded-xl ring-gray-300 border-gray-300 focus:border-gray-200 focus:ring-gray-200 shadow-md'
                        }
                        onChange={handleInput}
                    />
                    <svg
                        className={'absolute right-8'}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
                            fill="#1B1B1B"
                        />
                        <path
                            d="M21.9998 22.75C21.8098 22.75 21.6198 22.68 21.4698 22.53L17.9397 19.06C17.6497 18.77 17.6497 18.29 17.9397 18C18.2297 17.71 18.7097 17.71 18.9997 18L22.5298 21.47C22.8198 21.76 22.8198 22.24 22.5298 22.53C22.3798 22.68 22.1898 22.75 21.9998 22.75Z"
                            fill="#1B1B1B"
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}
