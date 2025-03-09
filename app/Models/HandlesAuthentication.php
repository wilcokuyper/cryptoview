<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;

interface HandlesAuthentication
{
    public function userHasLoggedIn(Authenticatable $user): \Illuminate\Http\RedirectResponse;
}
