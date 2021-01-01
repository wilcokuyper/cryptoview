<?php

namespace App\Services\CurrencyReader\Contracts;

interface CurrencyReaderContract
{
    public function getCoinList(bool $default): array;

    public function getPriceList(array $requestedCurrencies, bool $default): array;
}
