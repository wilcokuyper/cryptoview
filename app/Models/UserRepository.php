<?php

namespace App\Models;

class UserRepository
{
    /**
     * @param  $user
     * @return mixed
     */
    public function findByEmailOrCreate($user)
    {
        return User::firstOrCreate(
            [
            'email' => $user->email,
            ]
        )->fill(
            [
                'name' => $user->name,
                'avatar' => $user->avatar,
            ]
        );
    }
}
