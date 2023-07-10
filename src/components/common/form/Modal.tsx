import React, {
    Dispatch,
    FC,
    Fragment,
    ReactElement,
    ReactNode,
    SetStateAction,
} from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface Props {
    showModal: boolean | undefined
    children: ReactNode | ReactElement
    // eslint-disable-next-line no-unused-vars
    setShowModal: Dispatch<SetStateAction<boolean>>
    // title: string,
    cancelButtonRef: any
    style: string
}
const Modal: FC<Props> = ({
    children,
    showModal,
    setShowModal,
    cancelButtonRef,
    // title,
    style,
}) => {
    return (
        <Transition.Root show={showModal} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-50 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                open={showModal}
                onClose={setShowModal}>
                <div className="flex items-end justify-center min-h-screen pt-4  pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <div
                            className={`${
                                style ? style : 'w-full md:w-2/4'
                            } inline-block align-bottom bg-white rounded-5xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle`}>
                            <div className="max-w-none mx-auto">
                                <div className="">
                                    <div className="">
                                        {/* <h3 className="mt-2 text-lg leading-6 font-medium text-gray-900 w">
                                            {title}
                                        </h3> */}
                                    </div>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
