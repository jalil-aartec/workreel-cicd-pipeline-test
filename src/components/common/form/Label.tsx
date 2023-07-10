import { FC, ReactElement, ReactNode } from 'react'

type Props = {
    className?: string
    htmlFor?: string
    children: ReactNode | ReactElement
}

export const Label: FC<Props> = ({
    children,
    className,
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    htmlFor,
    ...props
}) => (
    <label
        className={`${className} block font-medium text-sm text-gray-700`}
        {...props}>
        {children}
    </label>
)
