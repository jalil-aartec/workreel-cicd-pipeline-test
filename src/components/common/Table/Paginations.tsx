import React, { FC, Dispatch, SetStateAction } from 'react'

interface Props {
    totalItems: number
    itemsPerPage: number
    currentPage: number
    setCurrentPage: Dispatch<SetStateAction<number>>
    showingData: Array<any>
}

export const Pagination: FC<Props> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    showingData,
}) => {
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <div className="flex py-3 items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="disabled:opacity-50 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                    disabled={currentPage === pageNumber[0]}>
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === pageNumber.length}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                    Next
                </button>
            </div>
            {totalItems > 0 ? (
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between text-right">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing{' '}
                            <span className="font-medium">
                                {totalItems > 0 ? 1 : null}
                            </span>{' '}
                            to{' '}
                            <span className="font-medium">
                                {totalItems >= 10
                                    ? showingData?.length
                                    : totalItems}
                            </span>{' '}
                            {totalItems > 0 ? 'of' : null}{' '}
                            <span className="font-medium">{totalItems}</span>{' '}
                            result(s)
                        </p>
                    </div>

                    <div>
                        <nav
                            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-1"
                            aria-label="Pagination">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className={`${
                                    currentPage === pageNumber[0] &&
                                    'cursor-not-allowed'
                                } relative focus:outline-none inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
                                disabled={currentPage === pageNumber[0]}>
                                <span className="sr-only">Previous</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            {pageNumber.map((number, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(number)}
                                    className={`${
                                        currentPage === number
                                            ? 'bg-gray-600 text-white'
                                            : 'text-gray-900'
                                    } relative focus:outline-none inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium `}>
                                    {number}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className={`${
                                    currentPage === pageNumber.length &&
                                    'cursor-not-allowed'
                                } relative focus:outline-none inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
                                disabled={currentPage === pageNumber.length}>
                                <span className="sr-only">Next</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
