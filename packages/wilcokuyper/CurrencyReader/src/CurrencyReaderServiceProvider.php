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
    public function boot()
    {
        $this->publishes([
            __DIR__.'/config/cryptocompare.php' => config_path('cryptocompare.php'),
        ]);

        $this->mergeConfigFrom(
            __DIR__.'/config/cryptocompare.php',
            'cryptocompare'
        );
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(CryptoCurrencyDataContract::class, function ($app) {
            return new CryptoCompareProvider(config('cryptocompare.endpoint'), config('cryptocompare.api_key'));
        });

        $this->app->singleton(CurrencyReader::class, function ($app) {
            $provider = app(CryptoCurrencyDataContract::class);

            return new CurrencyReader($provider);
        });
    }
}
