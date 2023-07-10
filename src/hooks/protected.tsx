import { useAuth } from '@/hooks/auth'
import { Loader } from '@/components/common/loader/Loader'

export const Protected = (Component: any) => {
    const Auth = (props: any) => {
        const { user } = useAuth()

        if (!user) {
            return <Loader />
        }

        return <Component {...props} />
    }

    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps
    }

    return Auth
}
