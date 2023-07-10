import {
    FC,
    Fragment,
    ReactElement,
    useState,
    ReactNode,
    useEffect,
} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
    BeakerIcon,
    ChartPieIcon,
    DocumentAddIcon,
    FlagIcon,
    MenuAlt2Icon,
    OfficeBuildingIcon,
    UserIcon, 
    XIcon,
} from '@heroicons/react/outline'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Sidebar } from '@/components/common/Sidebar'
import { useAuth } from '@/hooks/auth'
import { axios } from '@/lib/axios'
import moment from 'moment'
import { ToastContainer } from 'react-toastify'

type Props = {
    children: ReactNode | ReactElement
}
export const AppLayout: FC<Props> = ({ children }) => {
    const { pathname } = useRouter()
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    const [adminData, setAdminData] = useState<any>([])
    const [countNotification, setCountNotification] = useState(0)
    const [notification, setNotification] = useState([])

    const { logout } = useAuth({ middleware: 'auth' })

    const onLogout = () => {
        logout()
            .then(() => {
                router.push('/')
            })
            .catch(e => console.log('error', e))
    }
 
    // Admin function
    const adminApiData = async () => {
        const response = await axios.get('/api/v1/user')
        if (response?.status === 200) setAdminData(response?.data)
    }
    const markAsReadNotification = async (id: any) => {
        const response = await axios.get('/api/v1/mark-read-notification/' + id)
        if (response?.status === 200) {
            notifications()
        }
    }
    const notifications = async () => {
        const response = await axios.get('/api/v1/unread-notifications')
        if (response?.status === 200) {
            setCountNotification(response?.data.length)
            setNotification(response?.data)
        }
    }
    useEffect(() => {
        adminApiData()
        notifications()
        // var pusher = new Pusher('78a20a32c962c6509961', {
        //     cluster: 'eu',
        // });
        // var channel = pusher.subscribe('job-created');
        // channel.bind('event', function (data) {
        //     setNotification([...notification], data)
        // });
    }, [])

    return (
        <>
            <div className="w-full min-h-screen bg-gray-100">
                {/*<Navigation user={user} />*/}

                <div className="h-screen flex overflow-hidden bg-gray-100">
                    {/* Page Heading */}
                    {/*<header className="bg-white shadow">{header}</header>*/}
                    <Transition.Root show={sidebarOpen} as={Fragment}>
                        <Dialog
                            as="div"
                            static
                            className="fixed inset-0 flex z-40"
                            open={true}
                            onClose={setSidebarOpen}>
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full">
                                <div className="relative flex-1 flex flex-col max-w-xs w-full pt-14 pb-4 bg-white">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0">
                                        <div className="absolute top-2 right-1 text-black hover:text-white bg-gray-50 hover:bg-background2 rounded-full">
                                            <button
                                                className="flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                                onClick={() =>
                                                    setSidebarOpen(false)
                                                }>
                                                <XIcon
                                                    className="h-6 w-6 text-black hover:text-white"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/*<div className="flex-shrink-0 flex justify-center items-center px-4">*/}
                                    {/*    <ApplicationLogo />*/}
                                    {/*</div>*/}
                                    <div className="mt-2 flex-grow flex flex-col">
                                        <nav className="flex-1 px-1 bg-white space-y-1">
                                            <Link href="/">
                                                <a
                                                    className={`${
                                                        pathname === '/'
                                                            ? 'bg-gradient-to-tr from-[#00F0D1] to-[#03A4F5] font-light rounded-md shadow-md text-gray-50 px-4'
                                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                    } flex rounded-md  px-4 items-center group w-full`}>
                                                    <OfficeBuildingIcon
                                                        className={`${
                                                            pathname === '/'
                                                                ? 'text-white'
                                                                : 'text-gray-600'
                                                        } w6 h-6`}
                                                    />
                                                    <span className="p-3 text-sm font-poppins font-semibold rounded-md antialiased">
                                                        Home
                                                    </span>
                                                </a>
                                            </Link>
                                            <Link href="/talent">
                                                <a
                                                    className={`${
                                                        pathname ===
                                                        '/dashboard/talent'
                                                            ? 'bg-gradient-to-tr from-[#00F0D1] to-[#03A4F5] font-light rounded-md shadow-md text-gray-50 px-4'
                                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                    } flex rounded-md px-4 items-center group`}>
                                                    <FlagIcon
                                                        className={`${
                                                            pathname ===
                                                            '/talent'
                                                                ? 'text-white'
                                                                : 'text-gray-600'
                                                        } w-6 h-6`}
                                                    />
                                                    <span className="p-3 text-sm font-poppins font-semibold rounded-md antialiased">
                                                        Talent
                                                    </span>
                                                </a>
                                            </Link>
                                            <Link href="/employer">
                                                <a
                                                    className={`${
                                                        pathname === '/employer'
                                                            ? 'bg-gradient-to-tr from-[#00F0D1] to-[#03A4F5] font-light rounded-md shadow-md text-gray-50 px-4'
                                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                    } flex rounded-md px-4 items-center group`}>
                                                    <DocumentAddIcon
                                                        className={`${
                                                            pathname ===
                                                            '/employer'
                                                                ? 'text-white'
                                                                : 'text-gray-600'
                                                        } w-6 h-6`}
                                                    />{' '}
                                                    <span className="p-3 text-sm font-poppins font-semibold rounded-md antialiased">
                                                        Employer
                                                    </span>
                                                </a>
                                            </Link>
                                            <Link href="/link">
                                                <a
                                                    className={`${
                                                        pathname === '/link'
                                                            ? 'bg-gradient-to-tr from-[#00F0D1] to-[#03A4F5] font-light rounded-md shadow-md text-gray-50 px-4'
                                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                    } flex rounded-md px-4 items-center group`}>
                                                    <ChartPieIcon
                                                        className={`${
                                                            pathname === '/link'
                                                                ? 'text-white'
                                                                : 'text-gray-600'
                                                        } w-6 h-6`}
                                                    />
                                                    <span className="p-3 text-sm font-poppins font-semibold rounded-md antialiased">
                                                        Links
                                                    </span>
                                                </a>
                                            </Link>
                                            <Link href="/subscription">
                                                <a
                                                    className={`${
                                                        pathname ===
                                                        '/subscription'
                                                            ? 'bg-gradient-to-tr from-[#00F0D1] to-[#03A4F5] font-light rounded-md shadow-md text-gray-50 px-4'
                                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                    } flex rounded-md px-4 items-center group`}>
                                                    <BeakerIcon
                                                        className={`${
                                                            pathname ===
                                                            '/subscription'
                                                                ? 'text-white'
                                                                : 'text-gray-600'
                                                        } w-6 h-6`}
                                                    />
                                                    <span className="p-3 text-sm font-poppins font-semibold rounded-md antialiased">
                                                        Subscription
                                                    </span>
                                                </a>
                                            </Link>
                                            <Link href="/feedback">
                                                <a
                                                    className={`${
                                                        pathname === '/feedback'
                                                            ? 'bg-gradient-to-tr from-[#00F0D1] to-[#03A4F5] font-light rounded-md shadow-md text-gray-50 px-4'
                                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                    } flex rounded-md px-4 items-center group`}>
                                                    <UserIcon
                                                        className={`${
                                                            pathname ===
                                                            '/feedback'
                                                                ? 'text-white'
                                                                : 'text-gray-600'
                                                        } w-6 h-6`}
                                                    />
                                                    <span className="p-3 text-sm font-poppins font-semibold rounded-md antialiased">
                                                        Feedback
                                                    </span>
                                                </a>
                                            </Link>
                                            <Link href="/chat">
                                                <a
                                                    className={`${
                                                        pathname === '/chat'
                                                            ? 'bg-gradient-to-tr from-[#00F0D1] to-[#03A4F5] font-light rounded-md shadow-md text-gray-50 px-4'
                                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                    } flex rounded-md px-4 items-center group`}>
                                                    <UserIcon
                                                        className={`${
                                                            pathname === '/chat'
                                                                ? 'text-white'
                                                                : 'text-gray-600'
                                                        } w-6 h-6`}
                                                    />
                                                    <span className="p-3 text-sm font-poppins font-semibold rounded-md antialiased">
                                                        Chat
                                                    </span>
                                                </a>
                                            </Link>
                                            <Link href="/users_registered">
                                                <a
                                                    className={`${
                                                        pathname ===
                                                        '/users_registered'
                                                            ? 'bg-gradient-to-tr from-[#00F0D1] to-[#03A4F5] font-light rounded-md shadow-md text-gray-50 px-4'
                                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                    } flex rounded-md px-4 items-center group`}>
                                                    <DocumentAddIcon
                                                        className={`${
                                                            pathname ===
                                                            '/users_registered'
                                                                ? 'text-white'
                                                                : 'text-gray-600'
                                                        } w-6 h-6`}
                                                    />{' '}
                                                    <span className="p-3 text-sm font-poppins font-semibold rounded-md antialiased">
                                                        User's
                                                    </span>
                                                </a>
                                            </Link>
                                        </nav>
                                    </div>
                                </div>
                            </Transition.Child>
                            <div
                                className="flex-shrink-0 w-14"
                                aria-hidden="true">
                                {/* Dummy element to force sidebar to shrink to fit close icon */}
                            </div>
                        </Dialog>
                    </Transition.Root>

                    {/* Static sidebar for desktop */}
                    <Sidebar />
                    <div className="flex flex-col w-0 flex-1 overflow-hidden">
                        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
                            <button
                                className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 md:hidden"
                                onClick={() => setSidebarOpen(true)}>
                                <span className="sr-only">Open sidebar</span>
                                <MenuAlt2Icon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                            <div className="flex-1 px-4 flex justify-end bg-white">
                                {/*<p className="p-4 font-semibold text-lg">{title}</p>*/}
                                <div className="flex-1 flex items-center" />
                                <div className="relative flex items-center">
                                    <Menu as="div" className="ml-3">
                                        {({ open }) => (
                                            <>
                                                <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full mt-2 focus:outline-none mr-4">
                                                    <div
                                                        className={
                                                            'flex items-center justify-center w-10 h-10 hover:bg-blue-200 rounded-full'
                                                        }>
                                                        <button className="relative drop-shadow">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="w-6 h-6">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                                                />
                                                            </svg>

                                                            <span className="absolute top-0 right-0 px-2 translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full text-xs text-white">
                                                                {
                                                                    countNotification
                                                                }
                                                            </span>
                                                        </button>
                                                    </div>
                                                </Menu.Button>
                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95">
                                                    <Menu.Items
                                                        static
                                                        className="origin-top-right flex flex-col absolute right-4 mt-2 text-md w-auto py-2 rounded-md shadow-lg divide-y bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {notification.map(
                                                            (
                                                                item: any,
                                                                index: number,
                                                            ) => {
                                                                return (
                                                                    <a
                                                                        key={
                                                                            index
                                                                        }
                                                                        href={
                                                                            item
                                                                                ?.data
                                                                                ?.link
                                                                        }
                                                                        target="_blank"
                                                                        rel="noreferrer">
                                                                        <Menu.Item>
                                                                            <p
                                                                                className={
                                                                                    'py-2 bg-gray-200 px-2 mx-2 my-1'
                                                                                }
                                                                                onClick={() =>
                                                                                    markAsReadNotification(
                                                                                        item?.id,
                                                                                    )
                                                                                }>
                                                                                <span className="cursor-pointer">
                                                                                    {
                                                                                        item
                                                                                            .data
                                                                                            ?.data
                                                                                    }
                                                                                    <span className="text-xs pl-4">
                                                                                        {moment(
                                                                                            item.created_at,
                                                                                        ).format(
                                                                                            'DD/MM/YYYY',
                                                                                        )}
                                                                                    </span>
                                                                                </span>
                                                                            </p>
                                                                        </Menu.Item>
                                                                    </a>
                                                                )
                                                            },
                                                        )}
                                                        <button className="w-32 py-1 hover:bg-gray-100 text-center text-xs">
                                                            View all
                                                        </button>
                                                    </Menu.Items>
                                                </Transition>
                                            </>
                                        )}
                                    </Menu>
                                </div>
                                <div className="relative flex items-center">
                                    <div>
                                        {/* Profile dropdown */}
                                        <Menu as="div" className="">
                                            {({ open }) => (
                                                <>
                                                    <Menu.Button className="max-w-xs hover:bg-gray-200 bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-200 mr-4">
                                                        <span className="sr-only">
                                                            Open user menu
                                                        </span>
                                                        <img
                                                            className="h-10 w-10 rounded-full"
                                                            src={
                                                                adminData?.avatar ??
                                                                '/assets/images/avatar.png'
                                                            }
                                                            alt="Avatar"
                                                        />
                                                    </Menu.Button>
                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95">
                                                        <Menu.Items
                                                            static={true}
                                                            className="origin-top-right flex flex-col absolute right-0 mt-2 w-60 px-4 py-2 rounded-md shadow-lg divide-y bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            <Menu.Item>
                                                                <Link href="/admin_settings">
                                                                    <a className="p-2 text-sm text-gray-800 hover:bg-gray-100 font-poppins">
                                                                        Admin
                                                                        Settings
                                                                    </a>
                                                                </Link>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <button
                                                                    className={
                                                                        'flex-auto py-1 hover:bg-gray-100 text-left'
                                                                    }
                                                                    onClick={
                                                                        onLogout
                                                                    }>
                                                                    <span className="cursor-pointer font-medium font-poppins text-md px-2">
                                                                        Sign out
                                                                    </span>
                                                                </button>
                                                            </Menu.Item>
                                                        </Menu.Items>
                                                    </Transition>
                                                </>
                                            )}
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <main className="focus:outline-none overflow-auto bg-white sm:px-6 lg:px-0 font-poppins">
                            {children}
                        </main>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}
