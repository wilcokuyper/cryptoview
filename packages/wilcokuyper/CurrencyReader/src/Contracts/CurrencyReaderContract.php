<?php

namespace wilcokuyper\CurrencyReader\Contracts;

interface CurrencyReaderContract
{
    public function getCoinList($default) : array;
    public function getPriceList($requestedCurrency, $default) : array;
}
