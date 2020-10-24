<?php

namespace wilcokuyper\CurrencyReader\Providers;

use Illuminate\Support\Str;
use wilcokuyper\CurrencyReader\Contracts\CryptoCurrencyDataContract;

class CryptoCompareProvider implements CryptoCurrencyDataContract
{
    protected $endpoint;

    protected $api_key;

    protected $defaultCurrency;

    public function __construct()
    {
        $this->endpoint = config('cryptocompare.endpoint');
        $this->api_key = config('cryptocompare.key');
        $this->defaultCurrency = config('cryptocompare.default_conversion_currency');
    }

    /**
     * @return array
     */
    public function getSymbols() : array
    {
        return $this->request('/data/all/coinlist');
    }

    /**
     * @param array $currencies
     * @param string|null $convertTo
     * @return array
     */
    public function getPrices(array $currencies, string $convertTo = null) : array
    {
        $prices = $this->request('/data/pricemulti', [
            'fsyms' => implode(',', $currencies),
            'tsyms' => $convertTo ?? $this->defaultCurrency,
        ]);

        $list = [];
        
        foreach ($prices as $asset => $conversions) {
            $list[] = [
                'name' => $asset,
                'prices' => $conversions,
            ];
        }

        return $list;
    }

    /**
     * @param string $currency
     * @param int $limit
     * @param int $aggregate
     * @param string|null $convertTo
     * @return array
     */
    public function getHistoricalData(string $currency, $limit = 10, $aggregate = 1, string $convertTo = null): array
    {
        $historyicalData = $this->request('/data/v2/histominute', [
            'fsym' => $currency,
            'tsym' => $convertTo ?? $this->defaultCurrency,
            'aggregate' => $aggregate,
            'limit' => $limit,
        ]);

        return $historyicalData['Data']['Data'] ?? [];
    }

    /**
     * @param string $path
     * @param array $data
     * @return array
     */
    protected function request(string $path, array $data = []) : array
    {
        $url = $this->buildRequest($path, $data);
        
        $json = file_get_contents($url);

        return json_decode($json, true);
    }

    /**
     * @param string $uri
     * @param array $data
     * @return string
     */
    protected function buildRequest(string $uri, array $data = []) : string
    {
        if (!Str::startsWith($uri, '/')) {
            $uri = '/'.$uri;
        }

        $data['api_key'] = $this->api_key;

        return $this->endpoint.$uri.'?'.http_build_query($data);
    }
}
