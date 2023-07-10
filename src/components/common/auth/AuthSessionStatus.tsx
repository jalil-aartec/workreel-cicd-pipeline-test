import { FC } from 'react'

type Props = {
    status: boolean | null
    className: string
}

export const AuthSessionStatus: FC<Props> = ({
    status,
    className,
    ...props
}) => (
    <>
        {status && (
            <div
                className={`${className} font-medium text-sm text-green-600`}
                {...props}>
                {status}
            </div>
        )}
    </>
)
