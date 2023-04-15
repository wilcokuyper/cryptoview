<?php

namespace App\Services\CurrencyReader\Contracts;

use Illuminate\Support\Collection;

interface CurrencyReaderContract
{
    public function getCoinList(bool $default): Collection;

    public function getPriceList(array $requestedCurrencies, bool $default): array;
}
