<?php

namespace wilcokuyper\CurrencyReader\Contracts;

interface CryptoCurrencyDataContract
{
    public function getSymbols() : array;
    public function getPrices(array $currencies, string $converTo = null) : array;
}
