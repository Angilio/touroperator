<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Reservation;

class Type_voyage extends Model
{
    protected $fillable = [
        'typevoyage',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'type_voyage_id');
    }
}
