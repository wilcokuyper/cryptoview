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

    /**
     * @param  $provider
     * @param  $hasCode
     * @param  $listener
     * @return mixed
     */
    public function execute($provider, $hasCode, $listener)
    {
        if (!$hasCode) {
            return $this->getAuth($provider);
        }

        $user = $this->users->findByEmailOrCreate($this->getUser($provider));

        auth()->login($user, true);

        return $listener->userHasLoggedIn($user);
    }

    /**
     * @param  $provider
     * @return mixed
     */
    protected function getAuth($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * @param  $provider
     * @return mixed
     */
    protected function getUser($provider)
    {
        if ($provider === 'twitter') {
            return null;
        }

        return Socialite::driver($provider)->stateless()->user();
    }
}
