<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nominee extends Model
{
    protected $fillable = ['name', 'category_id', 'count']; // Specify fillable fields
}
