<?php

namespace App\Http\Controllers\Auth;

use App\Models\HandlesAuthentication;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\AuthenticatedUser;

class LoginController extends Controller implements HandlesAuthentication
{
    public function login(
        string            $provider,
        AuthenticatedUser $authUser,
        Request           $request
    ): \Illuminate\Http\RedirectResponse
    {
        return $authUser->execute($provider, $request->has('code'), $this);
    }

    /**
     * @param Authenticatable|null $user
     */
    public function userHasLoggedIn(Authenticatable $user = null): RedirectResponse
    {
        if ($user) {
            return redirect('/');
        }

        return redirect('/login');
    }

    public function logout(): \Illuminate\Http\RedirectResponse
    {
        auth()->logout();

        return redirect('/');
    }

    public function getUser(Request $request): User
    {
        return $request->user();
    }
}
