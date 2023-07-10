import useSWR from 'swr'
import { axios } from '@/lib/axios'
import { useEffect } from 'react'
import authenticatedRoutes from 'utils/authenticatedRoutes'
import { useRouter } from 'next/router'
import _, { difference } from 'lodash'
import {
    ForgotPassword,
    Login,
    Middleware,
    ResendEmailVerification,
    ResetPassword,
} from '@/types'

export const useAuth = ({
    middleware,
    redirectIfAuthenticated = '/',
}: Middleware = {}) => {
    const router = useRouter()

    const {
        data: user,
        error,
        mutate,
    } = useSWR('/user', () => {
        return axios
            .get('/api/v1/user')
            .then(response => {
                return response.data
            })
            .catch(error => {
                if (
                    error.response.status === 401 &&
                    authenticatedRoutes.includes(router.pathname)
                )
                    router.push('/')
                if (error?.response?.status !== 409) throw error
            })
    })

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const login = async ({ setErrors, setLoading, ...props }: Login) => {
        setLoading(true)
        await csrf()
        setErrors([])

        axios
            .post('/api/v1/login', props)
            .then(({ data: { token } }) => {
                localStorage.setItem('workreel_token', token)
                mutate()
            })
            .catch(error => {
                if (error?.response?.status !== 422) throw error
                setErrors(Object.values(error?.response?.data?.errors).flat())
                setLoading(false)
            })
    }

    const forgotPassword = async ({
        setErrors,
        setStatus,
        setLoading,
        email,
    }: ForgotPassword) => {
        setLoading(true)
        await csrf()

        setStatus(null)
        setErrors([])

        axios
            .post('/forgot-password', { email })
            .then(response => {
                setStatus(response?.data?.status)
                setLoading(false)
            })
            .catch(error => {
                if (error?.response?.status !== 422) throw error
                setErrors(Object.values(error?.response?.data?.errors).flat())
            })
    }

    const resetPassword = async ({
        setErrors,
        setStatus,
        ...props
    }: ResetPassword) => {
        await csrf()
        setStatus(null)
        setErrors([])
        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push(
                    '/login?reset=' +
                        Buffer.from(response?.data?.status, 'base64'),
                ),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error?.response?.data?.errors).flat())
            })
    }

    const resendEmailVerification = ({
        setStatus,
    }: ResendEmailVerification) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response?.data?.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/api/v1/logout')
            localStorage.removeItem('workreel_token')
        }

        window.location.pathname = '/'
    }

    useEffect(() => {
        if (middleware == 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (middleware == 'auth' && error) logout()
        // if (verifiedEmail() && router.pathname.includes('/complete-profile'))
        //     router.push('/')
        // if (!user && !loader) router.push('/')
    }, [user, error])

    /**
     * Check if user is authenticated
     */
    const check = (): boolean => {
        return !_.isEmpty(user)
    }

    /**
     *Check if user has verified email
     */
    const verifiedEmail = (): boolean => {
        return check() && user?.email_verified_at
    }

    /**
     * Get super admin role
     */
    const isSuperAdmin = (): boolean => {
        if (!check()) return false
        const roles = user.all_roles
        return roles.includes('admin')
    }

    /**
     * Check if user has role
     */
    const hasRole = (value: string | string[]): boolean => {
        if (!check()) return false
        const roles = user?.all_roles
        if (typeof value === 'string') {
            return roles.includes(value.trim())
        }
        return roles.includes(value)
    }

    /**
     * Check if user has any role
     */
    const hasAnyRole = (value: string | string[]): boolean => {
        const roles = user.all_roles
        if (!check()) return false
        if (typeof value === 'string') {
            return roles.includes(value.trim())
        }
        return !!roles.length
    }

    /**
     * Check if user has all role
     */
    const hasAllRole = (value: _.List<string> | null | undefined): boolean => {
        if (!check()) return false
        const roles = user.all_roles
        return difference(value, roles).length === 0
    }

    /**
     * Check if user has permission
     */
    const can = (value: string | string[]): boolean => {
        if (!check()) return false
        const permissions = user.all_permissions
        if (!_.isEmpty(permissions) && typeof value === 'string') {
            return permissions.includes(value.trim())
        }
        return permissions.includes(value)
    }

    /**
     * Check if user does not have permission
     */
    const cannot = (value: string | string[]): boolean => {
        return !can(value)
    }

    return {
        user,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        check,
        verifiedEmail,
        hasRole,
        hasAnyRole,
        csrf,
        hasAllRole,
        isSuperAdmin,
        can,
        cannot,
    }
}
