<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class type_voyage extends Model
{
    protected $fillable = [
        'typevoyage',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'type_voyage_id');
    }
}
