import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const AddAsset = ({ currencies, onSubmit, onCancel }) => {
    const { register, handleSubmit } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-4">
                <div className="mb-4">
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                        Currency
                    </label>
                    <select
                        {...register('currency', { required: true })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring focus:ring-brand-blue focus:ring-opacity-50"
                    >
                        {currencies.map((currency) => (
                            <option key={currency.id} value={currency.symbol}>
                                {currency.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Amount
                    </label>
                    <input
                        type="number"
                        placeholder="1.000"
                        min="0"
                        max="99999999.99999999"
                        step="0.00000001"
                        {...register('amount', { required: true })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring focus:ring-brand-blue focus:ring-opacity-50"
                    />
                </div>
            </div>
            <div className="flex justify-end gap-2 px-4 py-3 bg-gray-50 border-t border-gray-200">
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-brand-blue text-white font-medium rounded-md hover:bg-brand-blue/90"
                >
                    Add
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="inline-flex items-center px-4 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

AddAsset.propTypes = {
    currencies: PropTypes.array,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
};

export default AddAsset;
