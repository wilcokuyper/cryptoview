import React from 'react';
import { useSelector } from 'react-redux';
import { reduxForm, Field  } from 'redux-form';

const editAsset = ({ handleSubmit, onCancel}) => {
  const asset = useSelector(state => state.wallet.selectedAsset);

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="currency" />
      <div className="modal-body">
        <div className="form-group">
          Selected currency: <strong>{asset.currency}</strong>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <Field component="input" className="form-control" type="number" name="amount" min="0" max="99999999.99999999" step="0.00000001" required />
        </div>
      </div>
      <div className="modal-footer">
        <button type="submit" className="btn btn-primary">Update</button>
        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'editAsset'
})(editAsset);
