<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
      protected $fillable = [
        'nbrPersonne',
        'dateStart',
        'dateEnd',
        'excursion_id',
        'user_id'
    ];
}
