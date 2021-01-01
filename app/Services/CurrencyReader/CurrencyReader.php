<?php

namespace App\Services\CurrencyReader;

use App\Services\CurrencyReader\Contracts\CryptoCurrencyDataContract;
use App\Services\CurrencyReader\Contracts\CurrencyReaderContract;

class CurrencyReader implements CurrencyReaderContract
{
    protected array $currencyList;

    protected CryptoCurrencyDataContract $provider;

    public function __construct(CryptoCurrencyDataContract $provider)
    {
        $this->provider = $provider;
    }

    /**
     * @param bool $default
     * @return array
     */
    public function getSymbols(bool $default = true): array
    {
        $currencies = [];

        $defaultList = explode(',', $this->getCurrencyList()['DefaultWatchlist']['CoinIs']);
        foreach ($this->getCurrencyList()['Data'] as $currency) {
            if ($default && !in_array($currency['Id'], $defaultList, true)) {
                continue;
            }
            $currencies[] = $currency['Symbol'];
        }

        return $currencies;
    }

    /**
     * @param bool $default
     * @return array
     */
    public function getCoinList(bool $default = true): array
    {
        $currency_list = [];

        foreach ($this->getCurrencyList()['Data'] as $currency) {
            if ($default && !in_array($currency['Symbol'], $this->getSymbols($default), true)) {
                continue;
            }

            $currency_list[] = [
                'id' => $currency['Id'],
                'name' => $currency['FullName'],
                'symbol' => $currency['Symbol'],
            ];
        }

        usort($currency_list, static fn($a, $b) => $a['name'] > $b['name']);

        return $currency_list;
    }

    /**
     * @param array|null $requestedCurrencies
     * @param bool $default
     * @return array
     */
    public function getPriceList(array $requestedCurrencies = null, bool $default = true): array
    {
        $currencies = $requestedCurrencies ?? $this->getSymbols($default);

        return $this->provider->getPrices($currencies);
    }

    /**
     * @return array
     */
    protected function getCurrencyList(): array
    {
        if (!isset($this->currencyList)) {
            $this->currencyList = $this->provider->getSymbols();
        }

        return $this->currencyList;
    }

    /**
     * @param string $currency
     * @param int $count
     * @return array|null
     */
    public function getHistoricalData(string $currency, int $count = 10): ?array
    {
        if ($data = $this->provider->getHistoricalData($currency, $count)) {
            return array_map(function ($dataPoint) {
                return $dataPoint['close'];
            }, $data);
        }

        return null;
    }
}
