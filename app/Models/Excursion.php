<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ExcursionGallery;
use App\Models\Reservation;
use App\Models\Type_excursion;

class Excursion extends Model
{
      protected $fillable = [
        'title',
        'short_description',
        'description',
        'price',
        'video',
        'type_excursion_id'
    ];

    public function type_excursion()
    {
        return $this->belongsTo(Type_excursion::class, 'type_excursion_id');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'excursion_id');
    }

    public function gallery()
    {
        return $this->hasMany(ExcursionGallery::class);
    }
}
