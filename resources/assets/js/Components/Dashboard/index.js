import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateWalletItem, deleteWalletItem} from '../../actions';

import Wallet from '../Wallet';
import AddWalletItem from '../../Helpers/Dialogs/AddWalletItem';

function _updateWallet(values) {
  updateWalletItem(values, 'add').then(() => $('#addCurrencyModal').modal('hide'));
}

function _deleteWalletItem(id) {
  deleteWalletItem(id);
}

export default function () {
  const currencyTypes = useSelector(state => state.currencies.types);
  const wallet = useSelector(state => state.wallet);

  const dispatch = useDispatch();

  return (
    <div>

      <div className="container">
        <div className="row">
          <div className="col-sm">

            <div className="d-flex">
              <h1 className="mr-auto">Cryptoview</h1>
              <button className="btn btn-primary ml-auto" data-toggle="modal" data-target="#addCurrencyModal"><i className="fa fa-plus" aria-hidden="true"></i></button>
            </div>

            <p>View your cryptocurrency balances</p>
            <Wallet items={wallet} editItem={() => {}} deleteItem={() => dispatch(_deleteWalletItem())} />

          </div>
        </div>
      </div>

      <AddWalletItem currencies={currencyTypes} onSubmit={values => dispatch(_updateWallet(values))} />

    </div>
  );
}
