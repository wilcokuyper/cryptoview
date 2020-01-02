<?php

namespace wilcokuyper\CurrencyReader\Contracts;

interface CryptoCurrencyDataContract
{
    public function getSymbols() : array;
    public function getPrices(array $currencies, string $converTo = null) : array;
    public function getHistoricalData(string $currency, string $converTo = null, $aggregate = 1, $limit = 10) : array;
}
