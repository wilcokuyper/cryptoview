import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';

const Modal = ({ title, isShowing, hide, children }) => (
    <Transition show={isShowing}>
        <Dialog as="div" className="relative z-50" onClose={hide}>
            <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/50" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <TransitionChild
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <DialogPanel className="w-full max-w-md bg-white rounded-lg shadow-xl">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                                <DialogTitle className="text-lg font-medium text-gray-900">
                                    {title}
                                </DialogTitle>
                                <button
                                    onClick={hide}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            {children}
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </Transition>
);

export default Modal;
