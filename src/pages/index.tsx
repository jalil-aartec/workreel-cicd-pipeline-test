import { useAuth } from '@/hooks/auth'
import Login from './login'
import Dashboard from '@/components/Dashboard'

// testing3
const Home = () => {
    const { user } = useAuth()

    if (user?.all_roles?.includes('admin')) {
        return <Dashboard />
    } else {
        return <Login />
    }
}

export default Home
