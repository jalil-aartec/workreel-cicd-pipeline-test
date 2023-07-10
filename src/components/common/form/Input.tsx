import React from 'react'

type Props = {
    disabled?: boolean
    id?: string
    type: string
    className: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: string
    name?: string
    required?: boolean
    autoComplete?: string
    autoFocus?: boolean
    placeholder: string
    maxLength?: number
    onKeyDown?: any
}

export const Input: React.FC<Props> = ({
    disabled = false,
    onChange,
    value,
    name,
    className,
    required,
    autoComplete,
    autoFocus,
    placeholder,
    maxLength,
    onKeyDown,
    ...props
}) => {
    return (
        <input
            disabled={disabled}
            className={`${className} h-12 w-full rounded-xl shadow-sm  border-gray-300 focus:ring-0`}
            onChange={onChange}
            value={value}
            name={name}
            required={required}
            maxLength={maxLength}
            onKeyDown={onKeyDown}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            placeholder={placeholder}
            {...props}
        />
    )
}
