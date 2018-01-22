import React from 'react';
import { reduxForm, Field  } from 'redux-form';

const addWalletItem = ({ currencies, handleSubmit }) => {
  return (
    <div className="modal fade" id="addCurrencyModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Currency</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="currency">Currency</label>
                <Field component="select" className="form-control" name="currency" required>
                  { currencies.map( (currency, index) => <option key={currency.id} value={ currency.symbol }>{ currency.name}</option> ) }
                </Field>
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <Field component="input" className="form-control" type="number" name="amount" placeholder="1.000" min="0" max="99999999.99999999" step="0.00000001" required />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Add</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'addWalletItem'
})(addWalletItem);
