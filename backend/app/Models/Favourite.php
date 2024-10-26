<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Favourite extends Model
{
    use HasFactory;

    protected $primaryKey = ['user_id', 'announce_id'];

    public $incrementing = false;

    protected $fillable = [
        'user_id',  'announce_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function announce()
    {
        return $this->belongsTo(Announce::class, 'announce_id');
    }
}
