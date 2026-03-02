<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ExcursionGallery;
use App\Models\Reservation;
use App\Models\VilleExcursion;

class Excursion extends Model
{
      protected $fillable = [
        'title',
        'short_description',
        'description',
        'price',
        'video',
        'ville_excursion_id'
    ];

    public function ville_excursion()
    {
        return $this->belongsTo(VilleExcursion::class, 'ville_excursion_id');
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
