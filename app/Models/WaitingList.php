<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WaitingList extends Model
{
    protected $table = 'waiting_list'; // Specify the table name if it doesn't follow Laravel's naming convention
    protected $fillable = ['name,mobile,ticket_type,email']; // Specify fillable fields
}
