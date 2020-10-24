<?php

namespace wilcokuyper\CurrencyReader;

use wilcokuyper\CurrencyReader\Contracts\CryptoCurrencyDataContract;
use wilcokuyper\CurrencyReader\Contracts\CurrencyReaderContract;

class CurrencyReader implements CurrencyReaderContract
{
    protected $currencyList;

    protected $provider;

    public function __construct(CryptoCurrencyDataContract $provider)
    {
        $this->provider = $provider;
    }

    /**
     * @param bool $default
     * @return array
     */
    public function getSymbols($default = true): array
    {
        $currencies = [];

        $defaultList = explode(',', $this->getCurrencyList()['DefaultWatchlist']['CoinIs']);
        foreach ($this->getCurrencyList()['Data'] as $currency) {
            if ($default && !in_array($currency['Id'], $defaultList)) {
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
    public function getCoinList($default = true) : array
    {
        $currency_list = [];

        foreach ($this->getCurrencyList()['Data'] as $currency) {
            if ($default && !in_array($currency['Symbol'], $this->getSymbols($default))) {
                continue;
            }

            $currency_list[] = [
                'id' => $currency['Id'],
                'name' => $currency['FullName'],
                'symbol' => $currency['Symbol'],
            ];
        }

        return $currency_list;
    }

    /**
     * @param null $requestedCurrencies
     * @param bool $default
     * @return array
     */
    public function getPriceList($requestedCurrencies = null, $default = true) : array
    {
        $currencies = $requestedCurrencies ?? $this->GetSymbols($default);

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
     * @param $currency
     * @param int $count
     * @return array|null
     */
    public function getHistoricalData($currency, $count = 10): ?array
    {
        if ($data = $this->provider->getHistoricalData($currency, $count)) {
            return array_map(function ($dataPoint) {
                return $dataPoint['close'];
            }, $data);
        }

        return null;
    }
}
