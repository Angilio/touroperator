<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Excursion extends Model
{
      protected $fillable = [
        'title',
        'Description',
        'price',
        'video',
        'type_excursion_id'
    ];

    public function type_chambre()
    {
        return $this->belongsTo(type_excursion::class, 'type_excursion_id');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'reservation_id');
    }
}
