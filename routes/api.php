<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\WalletController;
use Illuminate\Support\Facades\Route;

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
    Route::get('/user', [LoginController::class, 'getUser']);

    Route::get('/currencies', [CurrencyController::class, 'getCurrencyList']);
    Route::get('/prices', [CurrencyController::class, 'getPriceList']);

    Route::get('/history', [CurrencyController::class, 'getHistory']);

    Route::apiResource('wallet', WalletController::class);
});
