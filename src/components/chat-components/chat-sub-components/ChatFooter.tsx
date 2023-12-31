import React from 'react'

export const ChatFooter = ({ sendMessage, handleSubmit, handleInput }) => {
    return (
        <div
            className={
                'flex w-full py-4 rounded-t-3xl bg-white shadow-xl items-center justify-center'
            }>
            <div className={'flex w-full items-center justify-center'}>
                <div
                    className={
                        'flex w-20 h-16 items-center justify-center rounded-2xl mx-4 bg-gray-100 shadow-md hover:shadow-lg focus:shadow-xl'
                    }>
                    <div
                        className={
                            'flex w-20 h-16 items-center justify-center transform transition delay-150 duration-300 hover:rotate-90'
                        }>
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
                                fill="#1B1B1B"
                            />
                            <path
                                d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
                                fill="#1B1B1B"
                            />
                        </svg>
                    </div>
                </div>
                <div
                    className={
                        'relative flex w-full mr-4 items-center justify-center'
                    }>
                    <textarea
                        draggable={false}
                        placeholder={'Send your message'}
                        value={sendMessage}
                        className={
                            'h-16 w-full pr-12 text-background2 rounded-xl ring-gray-300 border-gray-300 focus:border-gray-200 focus:ring-gray-200'
                        }
                        onChange={handleInput}
                    />
                    <div
                        onClick={handleSubmit}
                        className={
                            'absolute flex w-12 h-full items-center justify-center right-0 rounded-tr-xl active:shadow-xl'
                        }>
                        <svg
                            width="35"
                            height="35"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.40995 21.75C4.28995 21.75 3.57995 21.37 3.12995 20.92C2.24995 20.04 1.62995 18.17 3.60995 14.2L4.47995 12.47C4.58995 12.24 4.58995 11.76 4.47995 11.53L3.60995 9.80002C1.61995 5.83002 2.24995 3.95002 3.12995 3.08002C3.99995 2.20002 5.87995 1.57002 9.83995 3.56002L18.3999 7.84002C20.5299 8.90002 21.6999 10.38 21.6999 12C21.6999 13.62 20.5299 15.1 18.4099 16.16L9.84995 20.44C7.90995 21.41 6.46995 21.75 5.40995 21.75ZM5.40995 3.75002C4.86995 3.75002 4.44995 3.88002 4.18995 4.14002C3.45995 4.86002 3.74995 6.73002 4.94995 9.12002L5.81995 10.86C6.13995 11.51 6.13995 12.49 5.81995 13.14L4.94995 14.87C3.74995 17.27 3.45995 19.13 4.18995 19.85C4.90995 20.58 6.77995 20.29 9.17995 19.09L17.7399 14.81C19.3099 14.03 20.1999 13 20.1999 11.99C20.1999 10.98 19.2999 9.95002 17.7299 9.17002L9.16995 4.90002C7.64995 4.14002 6.33995 3.75002 5.40995 3.75002Z"
                                fill="#1B1B1B"
                            />
                            <path
                                d="M10.8399 12.75H5.43994C5.02994 12.75 4.68994 12.41 4.68994 12C4.68994 11.59 5.02994 11.25 5.43994 11.25H10.8399C11.2499 11.25 11.5899 11.59 11.5899 12C11.5899 12.41 11.2499 12.75 10.8399 12.75Z"
                                fill="#1B1B1B"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
