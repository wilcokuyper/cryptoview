<?php

namespace App\Services\CurrencyReader;

use Illuminate\Support\ServiceProvider;
use App\Services\CurrencyReader\Contracts\CryptoCurrencyDataContract;
use App\Services\CurrencyReader\Providers\CryptoCompareProvider;

class CurrencyReaderServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot(): void
    {

    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register(): void
    {
        $this->app->singleton(CryptoCurrencyDataContract::class, function () {
            return new CryptoCompareProvider();
        });

        $this->app->singleton(CurrencyReader::class, function () {
            $provider = app(CryptoCurrencyDataContract::class);

            return new CurrencyReader($provider);
        });
    }
}
