<?php

namespace App\Models;

use Laravel\Socialite\Facades\Socialite;

class AuthenticatedUser
{
    protected UserRepository $users;

    /**
     * AuthenticatedUser constructor.
     *
     * @param UserRepository $users
     */
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    public function execute(string $provider, bool $hasCode, HandlesAuthentication $handler): \Illuminate\Http\RedirectResponse
    {
        if (!$hasCode) {
            return $this->getAuth($provider);
        }

        $user = $this->users->findByEmailOrCreate($this->getUser($provider));

        \Auth::login($user, true);

        return $handler->userHasLoggedIn($user);
    }

    protected function getAuth(string $provider): \Illuminate\Http\RedirectResponse
    {
        return Socialite::driver($provider)->redirect();
    }

    protected function getUser(string $provider): ?\Laravel\Socialite\Two\User
    {
        return Socialite::driver($provider)->stateless()->user();
    }
}
