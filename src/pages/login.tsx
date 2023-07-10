import Link from 'next/link'
import { FC, FormEvent, SetStateAction, useEffect, useState } from 'react'
import { Input } from '@/components/common/form/Input'
import { Label } from '@/components/common/form/Label'
import { useAuth } from '@/hooks/auth'
import { Button } from '@/components/common/button/Button'
import { AuthCard } from '@/components/common/auth/AuthCard'
import { GuestLayout } from '@/components/layouts/GuestLayout'
import { ApplicationLogo } from '@/components/common/ApplicationLogo'
import { AuthSessionStatus } from '@/components/common/auth/AuthSessionStatus'
import { AuthValidationErrors } from '@/components/common/auth/AuthValidationErrors'
import { useRouter } from 'next/router'

const Login: FC = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (router.query.reset?.length > 0 && errors.length == 0) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setStatus(Buffer.from(router.query.reset, 'base64'))
        } else {
            setStatus(null)
        }
    })
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await login({
            email,
            password,
            setErrors,
            setLoading,
            // setStatus,
        })
    }

    return (
        <>
            {/*<Header setShowModal={setShowModal} showModal={showModal} />*/}
            <GuestLayout>
                <AuthCard
                    logo={
                        <Link href="/">
                            <a>
                                <ApplicationLogo
                                    width={200}
                                    height={150}
                                    className="w-96 h-full fill-current text-gray-500"
                                />
                            </a>
                        </Link>
                    }>
                    {/* Session Status */}
                    <AuthSessionStatus className="mb-4" status={status} />

                    {/* Validation Errors */}
                    <AuthValidationErrors className="mb-4" errors={errors} />

                    <form onSubmit={onSubmit}>
                        {/* Email Address */}
                        <div>
                            <Label className="label" htmlFor="email">
                                Email
                            </Label>

                            <Input
                                id="email"
                                className="block mt-1 w-full"
                                type="email"
                                placeholder={'Your Email'}
                                onChange={(event: {
                                    target: { value: SetStateAction<string> }
                                }) => setEmail(event.target.value)}
                                value={email}
                                required
                                autoFocus
                                disabled={false}
                            />
                        </div>

                        {/* Password */}
                        <div className="mt-4">
                            <Label className="label" htmlFor="password">
                                Password
                            </Label>

                            <Input
                                id="password"
                                className="block mt-1 w-full"
                                type="password"
                                placeholder={'Your Password'}
                                onChange={(event: {
                                    target: { value: SetStateAction<string> }
                                }) => setPassword(event.target.value)}
                                value={password}
                                disabled={false}
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        {/* Remember Me */}
                        <div className="block mt-4">
                            <label
                                htmlFor="remember_me"
                                className="inline-flex items-center">
                                <input
                                    id="remember_me"
                                    type="checkbox"
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    name="remember"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <Link href="/forgot-password">
                                <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                    Forgot your password?
                                </a>
                            </Link>

                            <Button className="ml-3">
                                {loading ? 'Loading...' : 'Login'}
                            </Button>
                        </div>
                    </form>
                </AuthCard>
            </GuestLayout>
        </>
    )
}

export default Login
