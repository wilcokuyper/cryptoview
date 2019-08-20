<?php

use Illuminate\Http\Request;
use Illuminate\Http\Response;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:api'])->group(function () {
    Route::get('/user', 'Auth\LoginController@getUser');

    Route::get('/currencies', "CurrencyController@getCurrencyList");
    Route::get('/prices', "CurrencyController@getPriceList");

    Route::apiResource('wallet', 'WalletController');
});
