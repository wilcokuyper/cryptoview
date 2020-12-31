<?php

namespace wilcokuyper\CurrencyReader\Contracts;

interface CryptoCurrencyDataContract
{
    public function getSymbols(): array;

    public function getPrices(array $currencies, string $convertTo = null): array;

    public function getHistoricalData(
        string $currency,
        int $limit = 10,
        int $aggregate = 1,
        string $convertTo = null
    ): array;
}
