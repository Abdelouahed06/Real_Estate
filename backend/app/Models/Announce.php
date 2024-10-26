<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announce extends Model
{
    use HasFactory;

    protected $primaryKey = 'announce_id';

    protected $fillable = [
        'user_id', 'title', 'address', 'num_rooms', 'num_bathrooms', 'space', 'price', 'type', 'city', 'description',
    ];

    // Define relationships
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function images()
    {
        return $this->hasMany(AnnounceImage::class, 'announce_id');
    }

    public function favourites()
    {
        return $this->hasMany(Favourite::class);
    }
    
}
