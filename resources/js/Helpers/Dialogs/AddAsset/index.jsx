import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from '@headlessui/react';
import { FaSearch, FaChevronDown } from "react-icons/fa";

const AddAsset = ({ currencies, onSubmit, onCancel }) => {
    const { control, register, handleSubmit, formState: { errors } } = useForm();
    const [query, setQuery] = useState('');

    const filteredCurrencies = useMemo(() => {
        const sorted = [...currencies].sort((a, b) => a.name.localeCompare(b.name));
        if (query === '') {
            return sorted.slice(0, 50);
        }
        const lowerQuery = query.toLowerCase();
        const matches = sorted.filter((currency) =>
            currency.name.toLowerCase().includes(lowerQuery) ||
            currency.symbol.toLowerCase().includes(lowerQuery)
        );

        matches.sort((a, b) => {
            const aNameLower = a.name.toLowerCase();
            const aSymbolLower = a.symbol.toLowerCase();
            const bNameLower = b.name.toLowerCase();
            const bSymbolLower = b.symbol.toLowerCase();

            const aExact = aNameLower === lowerQuery || aSymbolLower === lowerQuery;
            const bExact = bNameLower === lowerQuery || bSymbolLower === lowerQuery;

            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;

            const aStarts = aNameLower.startsWith(lowerQuery) || aSymbolLower.startsWith(lowerQuery);
            const bStarts = bNameLower.startsWith(lowerQuery) || bSymbolLower.startsWith(lowerQuery);

            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;

            return a.name.localeCompare(b.name);
        });

        return matches.slice(0, 50);
    }, [currencies, query]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6 space-y-5">
                <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Cryptocurrency
                    </label>
                    <Controller
                        name="currency"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Combobox
                                value={field.value || ''}
                                onChange={(value) => field.onChange(value)}
                                invalid={!!errors.currency}
                            >
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FaSearch className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <ComboboxInput
                                        autoFocus
                                        className="block w-full pl-11 pr-10 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-slate-600 transition-colors duration-150"
                                        displayValue={(symbol) => {
                                            const currency = currencies.find(c => c.symbol === symbol);
                                            return currency ? currency.name : '';
                                        }}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="Search cryptocurrencies..."
                                    />
                                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <FaChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                    </ComboboxButton>
                                    <ComboboxOptions className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-slate-700 py-2 shadow-lg ring-1 ring-gray-200 dark:ring-slate-600 focus:outline-none">
                                    {filteredCurrencies.length === 0 && query !== '' ? (
                                        <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">No cryptocurrencies found</div>
                                    ) : (
                                        filteredCurrencies.map((currency) => (
                                            <ComboboxOption
                                                key={currency.id}
                                                value={currency.symbol}
                                                className={({ active }) =>
                                                    `cursor-pointer select-none px-4 py-2.5 flex items-center gap-3 transition-colors duration-100 ${active ? 'bg-primary/5 dark:bg-primary/10 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`
                                                }
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <span className="text-primary font-bold text-xs">{currency.symbol.slice(0, 2)}</span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className={`text-sm ${selected ? 'font-semibold' : 'font-medium'}`}>{currency.name}</p>
                                                            <p className="text-xs text-gray-400 dark:text-gray-500">{currency.symbol}</p>
                                                        </div>
                                                    </>
                                                )}
                                            </ComboboxOption>
                                        ))
                                    )}
                                    </ComboboxOptions>
                                </div>
                            </Combobox>
                        )}
                    />
                    {errors.currency && (
                        <p className="mt-1.5 text-sm text-danger" role="alert">
                            Please select a cryptocurrency
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Amount
                    </label>
                    <input
                        type="number"
                        placeholder="0.00"
                        min="0"
                        max="99999999.99999999"
                        step="0.00000001"
                        {...register('amount', {
                            required: 'Amount is required',
                            min: { value: 0.00000001, message: 'Amount must be greater than 0' }
                        })}
                        aria-invalid={errors.amount ? 'true' : 'false'}
                        aria-describedby={errors.amount ? 'amount-error' : undefined}
                        className={`block w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-slate-600 transition-colors duration-150 ${errors.amount ? 'border-danger' : 'border-gray-200 dark:border-slate-600'}`}
                    />
                    {errors.amount && (
                        <p id="amount-error" className="mt-1.5 text-sm text-danger" role="alert">
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
                    Add Asset
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
