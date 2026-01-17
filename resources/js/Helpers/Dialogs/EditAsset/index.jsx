import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import useWalletStore from '../../../stores/walletStore';

const EditAsset = ({ onSubmit, onCancel }) => {
    const asset = useWalletStore(state => state.selectedAsset);
    const { register, handleSubmit, formState: { errors } } = useForm({
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
            <div className="p-6 space-y-5">
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold">{asset.currency.slice(0, 2)}</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Editing</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{asset.currency}</p>
                    </div>
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Amount
                    </label>
                    <input
                        type="number"
                        min="0"
                        max="99999999.99999999"
                        step="0.00000001"
                        autoFocus
                        {...register('amount', {
                            required: 'Amount is required',
                            min: { value: 0.00000001, message: 'Amount must be greater than 0' }
                        })}
                        aria-invalid={errors.amount ? 'true' : 'false'}
                        aria-describedby={errors.amount ? 'edit-amount-error' : undefined}
                        className={`block w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-slate-600 transition-colors duration-150 ${errors.amount ? 'border-danger' : 'border-gray-200 dark:border-slate-600'}`}
                    />
                    {errors.amount && (
                        <p id="edit-amount-error" className="mt-1.5 text-sm text-danger" role="alert">
                            {errors.amount.message}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-700">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2.5 text-gray-600 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors duration-150"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover shadow-sm transition-colors duration-150"
                >
                    Update
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
