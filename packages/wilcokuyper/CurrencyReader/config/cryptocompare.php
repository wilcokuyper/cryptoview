<?php

return [
    'endpoint' => 'https://min-api.cryptocompare.com',
    'key' => ENV('CRYPTOCOMPARE_API_KEY'),
    'default_conversion_currency' => 'EUR',
    'conversion_currencies' => [
        'EUR',
        'USD',
    ],
];
