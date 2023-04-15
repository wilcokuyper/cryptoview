import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListBulletIcon, TableCellsIcon } from '@heroicons/react/20/solid'
import { updateWalletItem, setSelectedAsset } from '../../actions'

import Wallet from '../Wallet'
import AddAsset from '../../Helpers/Dialogs/AddAsset'
import EditAsset from '../../Helpers/Dialogs/EditAsset'
import Modal from '../Modal'
import useModal from '../../Helpers/useModal'

function Dashboard() {
  const dispatch = useDispatch()

  const selectedAsset = useSelector((state) => state.wallet.selectedAsset)

  const [showingAddModal, toggleAddModal] = useModal()
  const [showingEditModal, toggleEditModal] = useModal()
  const [isListView, toggleListView] = useState(true)

  const updateWallet = (values, update = false) => {
    dispatch(updateWalletItem(values, update))

    if (update) {
      toggleEditModal()
    } else {
      toggleAddModal()
    }
  }

  const handleEditItem = (values) => {
    dispatch(setSelectedAsset(values))
    toggleEditModal()
  }

  const activeBtnClass = 'btn btn-info'
  const inactiveBtnClass = 'btn btn-light'

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Cryptoview</h1>
            <p>View your cryptocurrency balances</p>
          </div>
          <div className="col-auto mb-2">
            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                className={isListView ? activeBtnClass : inactiveBtnClass}
                onClick={() => toggleListView(true)}
              >
                <ListBulletIcon style={{ width: '16px', height: '16px' }} />
              </button>
              <button
                type="button"
                className={!isListView ? activeBtnClass : inactiveBtnClass}
                onClick={() => toggleListView(false)}
              >
                <TableCellsIcon style={{ width: '16px', height: '16px' }} />
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
          onSubmit={(values) => updateWallet(values)}
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
            currency: selectedAsset.currency,
          }}
          onSubmit={(values) => updateWallet(values, true)}
          onCancel={toggleEditModal}
        />
      </Modal>
    </div>
  )
}

export default Dashboard
