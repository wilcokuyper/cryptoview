<?php

namespace App\Models;

class UserRepository
{
    /**
     * @param  $user
     * @return User
     */
    public function findByEmailOrCreate($user): User
    {
        return User::query()->updateOrCreate([
            'email' => $user->email,
        ])->fill([
            'name' => $user->name,
            'avatar' => $user->avatar,
        ]);
    }
}
