<?php

namespace wilcokuyper\CurrencyReader\Contracts;

interface CurrencyReaderContract
{
    public function getCoinList(bool $default): array;

    public function getPriceList(array $requestedCurrencies, bool $default): array;
}
