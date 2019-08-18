import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWalletItem, setSelectedAsset } from '../../actions';

import Wallet from '../Wallet';
import AddAsset from '../../Helpers/Dialogs/AddAsset';
import EditAsset from '../../Helpers/Dialogs/EditAsset';
import Modal from '../Modal';
import useModal from '../../Helpers/useModal';

export default () => {
  const dispatch = useDispatch();
  
  const currencyTypes = useSelector(state => state.currencies.types);
  const selectedAsset = useSelector(state => state.wallet.selectedAsset);

  const [showingAddModal, toggleAddModal] = useModal();
  const [showingEditModal, toggleEditModal] = useModal();

  const updateWallet = (values, update = false) => {
    dispatch(updateWalletItem(values, update));

    if (update) {
      toggleEditModal();
    } else {
      toggleAddModal();
    }
  }

  const handleEditItem = values => {
    dispatch(setSelectedAsset(values,));
    toggleEditModal();
  }

  return (
    <div>

      <div className="container">
        <div className="row">
          <div className="col-sm">

            <div className="d-flex">
              <h1 className="mr-auto">Cryptoview</h1>
              <button className="btn btn-primary ml-auto" onClick={toggleAddModal}>
                <i className="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>

            <p>View your cryptocurrency balances</p>
            <Wallet handleEditItem={handleEditItem} />

          </div>
        </div>
      </div>

      <Modal isShowing={showingAddModal} hide={toggleAddModal} title="Add a currency to your wallet">
        <AddAsset
          currencies={currencyTypes}
          onSubmit={values => updateWallet(values)}
          onCancel={toggleAddModal}
        />
      </Modal>

      <Modal isShowing={showingEditModal} hide={toggleEditModal} title="Edit your wallet">
        <EditAsset
        initialValues={{amount: selectedAsset.amount, currency: selectedAsset.currency}}
          onSubmit={values => updateWallet(values, true)}
          onCancel={toggleEditModal}
        />
      </Modal>
      
    </div>
  );
}
