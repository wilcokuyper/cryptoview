<?php

namespace App\Models;

use Auth;
use Socialite;

class AuthenticatedUser
{
    private $users;

    public function __construct(UserRepository $users)
    {
      $this->users = $users;
    }

    function execute($provider, $hasCode, $listener)
    {
      if(!$hasCode) return $this->getAuth($provider);

      $user = $this->users->findByEmailOrCreate($this->getUser($provider));

      Auth::login($user, true);

      return $listener->userHasLoggedIn($user);
    }

    private function getAuth($provider)
    {
      return Socialite::driver($provider)->redirect();
    }

    private function getUser($provider)
    {
      return Socialite::driver($provider)->stateless()->user();
    }
}
