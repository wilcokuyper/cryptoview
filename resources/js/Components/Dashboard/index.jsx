import { useState } from 'react';
import useCurrencyStore from '../../stores/currencyStore';
import useWalletStore from '../../stores/walletStore';

import Wallet from '../Wallet';
import AddAsset from '../../Helpers/Dialogs/AddAsset';
import EditAsset from '../../Helpers/Dialogs/EditAsset';
import Modal from '../Modal';
import useModal from '../../Helpers/useModal';
import { FaList, FaTable } from "react-icons/fa";

const Dashboard = () => {
    const currencyTypes = useCurrencyStore(state => state.types);
    const { updateWalletItem, setSelectedAsset } = useWalletStore();

    const [showingAddModal, toggleAddModal] = useModal();
    const [showingEditModal, toggleEditModal] = useModal();
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

    const activeBtnClass = 'inline-flex items-center px-3 py-2 bg-brand-cyan text-white font-medium hover:bg-brand-cyan/90';
    const inactiveBtnClass = 'inline-flex items-center px-3 py-2 bg-gray-100 text-gray-800 font-medium hover:bg-gray-200';

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap items-center mb-4">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">Cryptoview</h1>
                        <p className="text-gray-600">View your cryptocurrency balances</p>
                    </div>
                    <div className="mb-2">
                        <div className="inline-flex rounded-md shadow-sm" role="group" aria-label="View toggle">
                            <button
                                type="button"
                                className={`${isListView ? activeBtnClass : inactiveBtnClass} rounded-l-md`}
                                onClick={() => toggleListView(true)}
                            >
                                <FaList />
                            </button>
                            <button
                                type="button"
                                className={`${!isListView ? activeBtnClass : inactiveBtnClass} rounded-r-md`}
                                onClick={() => toggleListView(false)}
                            >
                                <FaTable />
                            </button>
                        </div>
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
                title="Add a currency to your wallet"
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
                title="Edit your wallet"
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
