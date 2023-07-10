import { FC } from 'react'

type Props = {
    errors: Array<string>
    className?: string
}

export const AuthValidationErrors: FC<Props> = ({ errors = [], ...props }) => (
    <>
        {errors.length > 0 && (
            <div {...props}>
                <div className="font-medium text-red-600">
                    Oops! Something went wrong.
                </div>

                <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                    {errors?.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            </div>
        )}
    </>
)
