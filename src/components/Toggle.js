import React, { useEffect, useState } from 'react'

function Toggle({ onChange, defaultValue }) {
    const [toggle, setToggle] = useState(defaultValue)

    useEffect(() => {
        setToggle(defaultValue)
    }, [defaultValue])

    const handleToggle = () => {
        setToggle(!toggle)
        onChange(!toggle)
    }

    return (
        <>
            {toggle ? (
                <div
                    onClick={handleToggle}
                    className="mt-2 inline-flex cursor-pointer">
                    <span className="relative">
                        <span className="block w-10 h-6 bg-green-400 rounded-full shadow-inner" />
                        <button type="button">
                            <span className="absolute block w-4 h-4 mt-1 ml-1 rounded-full bg-white shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out  transform translate-x-full">
                                <input
                                    id="checked"
                                    type="checkbox"
                                    className="absolute opacity-0 w-0 h-0"
                                />
                            </span>
                        </button>
                    </span>
                </div>
            ) : (
                <div
                    className="mt-2 inline-flex cursor-pointer"
                    onClick={handleToggle}>
                    <span className="relative">
                        <span className="block w-10 h-6 bg-gray-300 rounded-full shadow-inner" />
                        <button type="button">
                            <span className="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out">
                                <input
                                    id="unchecked"
                                    type="checkbox"
                                    className="absolute opacity-0 w-0 h-0"
                                />
                            </span>
                        </button>
                    </span>
                </div>
            )}
        </>
    )
}

export default Toggle
