<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Excursion;

class ExcursionGallery extends Model
{
    protected $fillable = [
        'excursion_id',
        'image_path',
        'caption',
        'order',
    ];

    public function excursion()
    {
        return $this->belongsTo(Excursion::class);
    }
}
