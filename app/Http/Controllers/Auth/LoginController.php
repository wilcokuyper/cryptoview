<?php

namespace App\Http\Controllers\Auth;

use Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\AuthenticatedUser;

class LoginController extends Controller
{

    public function login($provider, AuthenticatedUser $authUser, Request $request)
    {
        $hasCode = $request->has('code');

        return $authUser->execute($provider, $hasCode, $this);
    }

    public function userHasLoggedIn($user)
    {
        if ($user) {
            return redirect('/');
        }

        return redirect('/login');
    }
    
        
    public function logout()
    {
        Auth::logout();
        return redirect('/');
    }
    
    public function getUser(Request $request)
    {
        return $request->user();
    }
}
