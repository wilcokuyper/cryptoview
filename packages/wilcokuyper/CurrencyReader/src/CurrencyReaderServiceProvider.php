<?php

namespace wilcokuyper\CurrencyReader;

use Illuminate\Support\ServiceProvider;
use wilcokuyper\CurrencyReader\Contracts\CryptoCurrencyDataContract;
use wilcokuyper\CurrencyReader\Providers\CryptoCompareProvider;

class CurrencyReaderServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->publishes([
            __DIR__ . '/../config/cryptocompare.php' => config_path('cryptocompare.php'),
        ]);
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register(): void
    {
        $this->mergeConfigFrom(
            __DIR__ . '/../config/cryptocompare.php',
            'cryptocompare'
        );

        $this->app->singleton(CryptoCurrencyDataContract::class, function () {
            return new CryptoCompareProvider();
        });

        $this->app->singleton(CurrencyReader::class, function () {
            $provider = app(CryptoCurrencyDataContract::class);

            return new CurrencyReader($provider);
        });
    }
}
