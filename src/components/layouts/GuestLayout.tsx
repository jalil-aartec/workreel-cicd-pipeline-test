import { FC, ReactElement, ReactNode } from 'react'

type Props = {
    children: ReactNode | ReactElement
}
export const GuestLayout: FC<Props> = ({ children }) => {
    return (
        <>
            <div className="font-poppins text-gray-900 antialiased">
                {children}
            </div>
        </>
    )
}
