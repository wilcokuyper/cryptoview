import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWalletItem, setSelectedAsset } from '../../actions';

import Wallet from '../Wallet';
import AddAsset from '../../Helpers/Dialogs/AddAsset';
import EditAsset from '../../Helpers/Dialogs/EditAsset';
import Modal from '../Modal';
import useModal from '../../Helpers/useModal';
import {ViewListIcon, TableIcon} from "@heroicons/react/solid";

const Dashboard = () => {
    const dispatch = useDispatch();

    const currencyTypes = useSelector(state => state.currencies.types);
    const selectedAsset = useSelector(state => state.wallet.selectedAsset);

    const [showingAddModal, toggleAddModal] = useModal();
    const [showingEditModal, toggleEditModal] = useModal();
    const [isListView, toggleListView] = useState(true);

    const updateWallet = (values, update = false) => {
        dispatch(updateWalletItem(values, update));

        if (update) {
            toggleEditModal();
        } else {
            toggleAddModal();
        }
    };

    const handleEditItem = values => {
        dispatch(setSelectedAsset(values));
        toggleEditModal();
    };

    const activeBtnClass = 'btn btn-info';
    const inactiveBtnClass = 'btn btn-light';

    return (
        <>
            <div className="container mx-auto">
                <div className="flex mb-3">
                    <div className="flex-grow">
                        <h1 className="text-3xl">Cryptoview</h1>
                        <p>View your cryptocurrency balances</p>
                    </div>
                    <div className="flex-grow-0">
                        <button
                            type="button"
                            className={`${isListView ? "bg-blue-400 hover:bg-blue-500 text-white" : "text-black bg-white hover:bg-gray-200"} px-3 py-2 rounded-l-lg transition`}
                            onClick={() => toggleListView(true)}
                        ><ViewListIcon className="h-5" /></button>
                        <button
                            type="button"
                            className={`${isListView ? "text-black bg-white hover:bg-gray-200" : "bg-blue-400 hover:bg-blue-500 text-white"} px-3 py-2 rounded-r-lg transition`}
                            onClick={() => toggleListView(false)}
                        ><TableIcon className="h-5" /></button>
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
                    initialValues={{
                        amount: selectedAsset.amount,
                        currency: selectedAsset.currency
                    }}
                    onSubmit={values => updateWallet(values, true)}
                    onCancel={toggleEditModal}
                />
            </Modal>
        </>
    );
};

export default Dashboard;
