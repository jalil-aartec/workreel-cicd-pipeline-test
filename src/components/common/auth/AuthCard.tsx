import { FC, ReactElement, ReactNode } from 'react'

type Props = {
    logo: object | any
    children: ReactNode | ReactElement
}

export const AuthCard: FC<Props> = ({ logo, children }) => (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-white dark:bg-gray-900">
        <div>{logo}</div>

        <div className="w-full sm:max-w-lg my-3 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            {children}
        </div>
    </div>
)
