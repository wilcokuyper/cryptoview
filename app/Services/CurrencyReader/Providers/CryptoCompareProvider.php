<?php

namespace App\Services\CurrencyReader\Providers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use JetBrains\PhpStorm\Pure;
use JsonException;
use App\Services\CurrencyReader\Contracts\CryptoCurrencyDataContract;

class CryptoCompareProvider implements CryptoCurrencyDataContract
{
    protected string $endpoint;

    protected string $api_key;

    protected string $defaultCurrency;

    public function __construct()
    {
        $this->endpoint = config('cryptocompare.endpoint');
        $this->api_key = config('cryptocompare.key');
        $this->defaultCurrency = config('cryptocompare.default_conversion_currency');
    }

    /**
     * @return array
     * @throws JsonException
     */
    public function getSymbols(): array
    {
        return $this->request('/data/all/coinlist');
    }

    /**
     * @param array $currencies
     * @param string|null $convertTo
     * @return array
     * @throws JsonException
     */
    public function getPrices(array $currencies, string $convertTo = null): array
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
     * @throws JsonException
     */
    public function getHistoricalData(
        string $currency,
        int $limit = 10,
        int $aggregate = 1,
        string $convertTo = null
    ): array {
        $historicalData = $this->request('/data/v2/histominute', [
            'fsym' => $currency,
            'tsym' => $convertTo ?? $this->defaultCurrency,
            'aggregate' => $aggregate,
            'limit' => $limit,
        ]);

        return $historicalData['Data']['Data'] ?? [];
    }

    /**
     * @param string $path
     * @param array $data
     * @return array
     * @throws JsonException
     */
    protected function request(string $path, array $data = []): array
    {
        $url = $this->buildRequest($path, $data);

        $json = Http::get($url);

        return json_decode($json, true, 512, JSON_THROW_ON_ERROR);
    }

    /**
     * @param string $uri
     * @param array $data
     * @return string
     */
    #[Pure]
    protected function buildRequest(string $uri, array $data = []): string
    {
        if (!Str::startsWith($uri, '/')) {
            $uri = '/' . $uri;
        }

        $data['api_key'] = $this->api_key;

        return $this->endpoint . $uri . '?' . http_build_query($data);
    }
}
