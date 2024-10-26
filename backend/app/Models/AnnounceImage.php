<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnnounceImage extends Model
{
    use HasFactory;

    protected $primaryKey = 'image_id';

    protected $fillable = [
        'announce_id', 'image',
    ];

    // Define relationships
    public function announce()
    {
        return $this->belongsTo(Announce::class, 'announce_id');
    }
}
