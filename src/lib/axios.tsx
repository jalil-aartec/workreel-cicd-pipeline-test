import Axios from 'axios'

const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('workreel_token')
    }
}

const token = getToken()

export const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
        isAdmin: true,
    },
    withCredentials: true,
})

// Request interceptor for API calls
axios.interceptors.request.use(
    async config => {
        config.headers = {
            Authorization: `Bearer ${getToken()}`,
            Accept: 'application/json',
        }
        return config
    },
    error => {
        Promise.reject(error)
    },
)
