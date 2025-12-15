<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NomineeTransaction extends Model
{
    protected $table = 'nominee_transactions';
    protected $fillable = ['nominee_id','votes_count'];
}
