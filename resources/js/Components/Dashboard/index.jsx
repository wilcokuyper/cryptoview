import { useState } from 'react';
import useCurrencyStore from '../../stores/currencyStore';
import useWalletStore from '../../stores/walletStore';

import Wallet from '../Wallet';
import AddAsset from '../../Helpers/Dialogs/AddAsset';
import EditAsset from '../../Helpers/Dialogs/EditAsset';
import Modal from '../Modal';
import useModal from '../../Helpers/useModal';
import { FaThLarge, FaList } from "react-icons/fa";

const Dashboard = () => {
    const currencyTypes = useCurrencyStore(state => state.types);
    const { updateWalletItem, setSelectedAsset } = useWalletStore();

    const { isShowing: showingAddModal, toggle: toggleAddModal } = useModal();
    const { isShowing: showingEditModal, toggle: toggleEditModal } = useModal();
    const [isListView, toggleListView] = useState(true);

    const updateWallet = (values, update = false) => {
        updateWalletItem(values, update);

        if (update) {
            toggleEditModal();
        } else {
            toggleAddModal();
        }
    };

    const handleEditItem = values => {
        setSelectedAsset(values);
        toggleEditModal();
    };

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Track your cryptocurrency holdings</p>
                    </div>
                    <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-xl">
                        <button
                            type="button"
                            onClick={() => toggleListView(true)}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                                isListView
                                    ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                            aria-label="List view"
                        >
                            <FaList className="w-4 h-4" />
                            <span className="hidden sm:inline">List</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => toggleListView(false)}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                                !isListView
                                    ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                            aria-label="Card view"
                        >
                            <FaThLarge className="w-4 h-4" />
                            <span className="hidden sm:inline">Cards</span>
                        </button>
                    </div>
                </div>

                <Wallet
                    handleAddItem={toggleAddModal}
                    handleEditItem={handleEditItem}
                    list={isListView}
                />
            </div>

            <Modal
                isShowing={showingAddModal}
                hide={toggleAddModal}
                title="Add to Portfolio"
            >
                <AddAsset
                    currencies={currencyTypes}
                    onSubmit={values => updateWallet(values)}
                    onCancel={toggleAddModal}
                />
            </Modal>

            <Modal
                isShowing={showingEditModal}
                hide={toggleEditModal}
                title="Edit Holdings"
            >
                <EditAsset
                    onSubmit={values => updateWallet(values, true)}
                    onCancel={toggleEditModal}
                />
            </Modal>
        </div>
    );
};

export default Dashboard;
