<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;

Route::get('login/{provider}', [LoginController::class, 'login']);
Route::get('login/{provider}/callback', [LoginController::class, 'login']);
Route::get('logout', [LoginController::class, 'logout']);

Route::view('/{path?}', 'index')
    ->where('path', '.*')
    ->name('react');

// Auth::routes();
