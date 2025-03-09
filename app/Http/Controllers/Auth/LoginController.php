<?php

namespace App\Http\Controllers\Auth;

use App\Models\HandlesAuthentication;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\AuthenticatedUser;

class LoginController extends Controller implements HandlesAuthentication
{
    public function login(
        string $provider,
        AuthenticatedUser $authUser,
        Request $request
    ): \Illuminate\Http\RedirectResponse {
        return $authUser->execute($provider, $request->has('code'), $this);
    }

    /**
     * @param Authenticatable|null $user
     * @return \Illuminate\Http\RedirectResponse
     */
    public function userHasLoggedIn(Authenticatable $user = null): \Illuminate\Http\RedirectResponse
    {
        if ($user) {
            return redirect('/');
        }

        return redirect('/login');
    }

    public function logout(): \Illuminate\Http\RedirectResponse
    {
        \Auth::logout();
        return redirect('/');
    }

    public function getUser(Request $request): User
    {
        return $request->user();
    }
}
