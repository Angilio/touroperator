<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
      protected $fillable = [
        'nbrPersonne',
        'fullname',
        'dateStart',
        'dateEnd',
        'excursion_id',
        'type_voyage_id',
        'contact',
        'email'
    ];

    public function excursion()
    {
        return $this->belongsTo(Excursion::class, 'excursion_id');
    }

    public function type_voyage()
    {
        return $this->belongsTo(type_voyage::class, 'type_voyage_id');
    }
}
