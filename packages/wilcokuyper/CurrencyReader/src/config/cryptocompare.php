<?php
return [
    'endpoint' => 'https://min-api.cryptocompare.com',
    'api_key' => ENV('CRYPTOCOMPARE_API_KEY'),
    'default_conversion_currency' => 'EUR',
    'conversion_currencies' => [
        'EUR',
        'USD',
    ],
];
