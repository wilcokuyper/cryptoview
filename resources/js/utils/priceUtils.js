/**
 * Get the EUR price for a given currency from the prices array
 * @param {string} currency - The currency symbol/name to look up
 * @param {Array} prices - Array of price objects with name and prices.EUR
 * @returns {number} The EUR price or 0 if not found
 */
export const getPriceForCurrency = (currency, prices) => {
    const asset = prices.find(p => p.name === currency);
    return asset?.prices?.EUR ?? 0;
};

/**
 * Calculate the total value of all assets in EUR
 * @param {Array} assets - Array of asset objects with currency and amount
 * @param {Array} prices - Array of price objects
 * @returns {number} Total value in EUR
 */
export const calculateTotalValue = (assets, prices) => {
    return assets.reduce((sum, item) => {
        const price = getPriceForCurrency(item.currency, prices);
        return sum + item.amount * price;
    }, 0);
};
