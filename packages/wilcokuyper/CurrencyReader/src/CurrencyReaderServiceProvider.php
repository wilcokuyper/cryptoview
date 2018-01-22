<?php

namespace wilcokuyper\CurrencyReader;

use Illuminate\Support\ServiceProvider;

class CurrencyReaderServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        return $this->app->singleton(CurrencyReader::class, function($app) {
          return new CurrencyReader();
        });
    }
}
