<?php

namespace wilcokuyper\CurrencyReader\Contracts;

interface CryptoCurrencyDataContract
{
    public function getSymbols() : array;
    public function getPrices(array $currencies, string $convertTo = null) : array;
    public function getHistoricalData(string $currency, $limit = 10, $aggregate = 1, string $convertTo = null) : array;
}
