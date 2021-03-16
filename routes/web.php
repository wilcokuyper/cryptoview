<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('login/{provider}', [LoginController::class, 'login']);
Route::get('login/{provider}/callback', [LoginController::class, 'login']);
Route::get('logout', [LoginController::class, 'logout']);

Route::view('/{path?}', 'index')
    ->where('path', '.*')
    ->name('react');

Auth::routes();
