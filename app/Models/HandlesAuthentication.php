<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\RedirectResponse;

interface HandlesAuthentication
{
    public function userHasLoggedIn(?Authenticatable $user): RedirectResponse;
}
