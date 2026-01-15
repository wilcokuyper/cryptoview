import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from '@headlessui/react';

const AddAsset = ({ currencies, onSubmit, onCancel }) => {
    const { control, register, handleSubmit } = useForm();
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

        // Sort exact matches before partial matches
        matches.sort((a, b) => {
            const aNameLower = a.name.toLowerCase();
            const aSymbolLower = a.symbol.toLowerCase();
            const bNameLower = b.name.toLowerCase();
            const bSymbolLower = b.symbol.toLowerCase();

            const aExact = aNameLower === lowerQuery || aSymbolLower === lowerQuery;
            const bExact = bNameLower === lowerQuery || bSymbolLower === lowerQuery;

            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;

            // Secondary: starts with query before contains
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
            <div className="p-4">
                <div className="mb-4">
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                        Currency
                    </label>
                    <Controller
                        name="currency"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Combobox
                                value={field.value || ''}
                                onChange={(value) => field.onChange(value)}
                            >
                                <div className="relative">
                                    <ComboboxInput
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring focus:ring-brand-blue focus:ring-opacity-50"
                                        displayValue={(symbol) => {
                                            const currency = currencies.find(c => c.symbol === symbol);
                                            return currency ? currency.name : '';
                                        }}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="Search for a currency..."
                                    />
                                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </ComboboxButton>
                                    <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {filteredCurrencies.length === 0 && query !== '' ? (
                                        <div className="px-4 py-2 text-gray-500">No currencies found</div>
                                    ) : (
                                        filteredCurrencies.map((currency) => (
                                            <ComboboxOption
                                                key={currency.id}
                                                value={currency.symbol}
                                                className={({ active }) =>
                                                    `cursor-pointer select-none px-4 py-2 ${active ? 'bg-brand-blue text-white' : 'text-gray-900'}`
                                                }
                                            >
                                                {currency.name}
                                            </ComboboxOption>
                                        ))
                                    )}
                                    </ComboboxOptions>
                                </div>
                            </Combobox>
                        )}
                    />
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
