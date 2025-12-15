<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = ['name,mobile,ticket_type,unique_id,image,approve']; // Specify fillable fields
    
}
