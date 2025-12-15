<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $table = 'gallery'; // Specify the table name if it doesn't follow Laravel's naming convention
    protected $fillable = ['image']; // Specify fillable fields
}
