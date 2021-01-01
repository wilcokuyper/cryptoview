<?php

return [
    'endpoint' => env('CRYPTOCOMPARE_ENDPOINT', 'https://min-api.cryptocompare.com'),
    'key' => env('CRYPTOCOMPARE_APIKEY', ''),
    'default_conversion_currency' => env('CRYPTOCOMPARE_DEFAULT_CURRENCY', 'EUR'),
    'conversion_currencies' => [
        'EUR',
        'USD',
    ],
];
