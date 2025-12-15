<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhysicalTicket extends Model
{
    protected $table = 'tickets_physical';
    protected $fillable = ['approve']; // Specify fillable fields
}
