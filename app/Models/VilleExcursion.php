<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Excursion;

class VilleExcursion extends Model
{
    protected $fillable = [
        'ville',
    ];

    public function excursions()
    {
        return $this->hasMany(Excursion::class, 'ville_excursion_id');
    }
}
