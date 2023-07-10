import { FC } from 'react'
import Link from 'next/link'

const NotFoundPage: FC = () => (
    <div className="relative flex flex-col items-top justify-center min-h-screen bg-white dark:bg-gray-900 sm:items-center sm:pt-0">
        <div className="px-4 my-8 text-lg text-gray-500 tracking-wider">
            <h1
                className={
                    'h2 text-gray-600 dark:text-white font-poppins font-bold'
                }>
                404
            </h1>
        </div>
        <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
            <div className="flex flex-row items-center pt-8 sm:justify-center sm:pt-0">
                <div className="ml-4 text-lg text-gray-500 tracking-wider">
                    <h1
                        className={
                            'text-2xl text-gray-600 dark:text-gray-800 font-poppins font-normal'
                        }>
                        Oops! The page you have requested could not be found
                    </h1>
                </div>
            </div>
        </div>
        <div className={'flex items-center justify-center my-14'}>
            <Link href={'/'}>
                <a
                    href="/"
                    className={
                        'px-12 py-3 rounded-full bg-teal-500 font-bold text-xl text-gray-600 dark:text-white'
                    }>
                    Try This
                </a>
            </Link>
        </div>
    </div>
)

export default NotFoundPage
