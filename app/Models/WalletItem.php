<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WalletItem extends Model
{
    //
    protected $table = 'wallet_items';
    protected $hidden = ['userid'];
}
