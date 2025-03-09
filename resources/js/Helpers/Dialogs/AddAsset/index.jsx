import PropTypes from 'prop-types';
import React from 'react';
import { reduxForm, Field  } from 'redux-form';

const addAsset = ({ currencies, handleSubmit, onCancel}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="currency">Currency</label>
                    <Field component="select" className="form-control" name="currency" required>
                        { currencies.map((currency) => <option key={currency.id} value={ currency.symbol }>{ currency.name}</option> ) }
                    </Field>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <Field 
                        component="input"
                        className="form-control"
                        type="number"
                        name="amount"
                        placeholder="1.000"
                        min="0"
                        max="99999999.99999999"
                        step="0.00000001"
                        required
                    />
                </div>
            </div>
            <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Add</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

addAsset.propTypes = {
    currencies: PropTypes.array,
    handleSubmit: PropTypes.func,
    onCancel: PropTypes.func
};

export default reduxForm({
    form: 'addAsset'
})(addAsset);
