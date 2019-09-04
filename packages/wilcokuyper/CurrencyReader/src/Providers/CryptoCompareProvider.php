<?php

namespace wilcokuyper\CurrencyReader\Providers;

use Illuminate\Support\Str;
use wilcokuyper\CurrencyReader\Contracts\CryptoCurrencyDataContract;

class CryptoCompareProvider implements CryptoCurrencyDataContract
{
    protected $endpoint;

    protected $api_key;

    public function __construct(string $endpoint, string $api_key)
    {
        $this->endpoint = $endpoint;
        $this->api_key = $api_key;
    }

    public function getSymbols() : array
    {
        return $this->request('/data/all/coinlist');
    }

    public function getPrices(array $currencies, string $convertTo = null) : array
    {
        return $this->request('/data/pricemulti', [
            'fsyms' => implode(',', $currencies),
            'tsyms' => $convertTo ?? config('cryptocompare.default_conversion_currency'),
        ]);
    }

    protected function request(string $path, array $data = []) : array
    {
        $url = $this->buildRequest($path, $data);

        $json = file_get_contents($url);

        return json_decode($json, true);
    }

    protected function buildRequest(string $uri, array $data = []) : string
    {
        if (!Str::startsWith($uri, '/')) {
            $uri = '/'.$uri;
        }

        $data['api_key'] = $this->api_key;

        return $this->endpoint.$uri.'?'.http_build_query($data);
    }
}
