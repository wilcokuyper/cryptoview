<?php

namespace App\Models;

class UserRepository
{
  public function findByEmailOrCreate($user)
  {
    return User::firstOrCreate([
      'email'   => $user->email,
      'name'    => $user->name,
      'avatar'  => $user->avatar,
    ]);

  }
}
