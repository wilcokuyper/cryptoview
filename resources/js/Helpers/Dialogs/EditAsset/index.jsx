import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import useWalletStore from '../../../stores/walletStore';

const EditAsset = ({ onSubmit, onCancel }) => {
    const asset = useWalletStore(state => state.selectedAsset);
    const { register, handleSubmit } = useForm({
        defaultValues: {
            currency: asset?.currency ?? '',
            amount: asset?.amount ?? 0
        }
    });

    if (!asset) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register('currency')} />
            <div className="p-4">
                <div className="mb-4">
                    <span className="text-gray-700">Selected currency: </span>
                    <strong>{asset.currency}</strong>
                </div>
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Amount
                    </label>
                    <input
                        type="number"
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
                    Update
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

EditAsset.propTypes = {
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
};

export default EditAsset;
