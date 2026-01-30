<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Excursion;

class Type_excursion extends Model
{
    protected $fillable = [
        'type',
    ];

    public function excursions()
    {
        return $this->hasMany(Excursion::class, 'type_excursion_id');
    }
}
