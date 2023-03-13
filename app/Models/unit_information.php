<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class unit_information extends Model
{
    protected $table = "unit_informations";
    protected $primaryKey = 'unit_info_id';
    protected $fillable = ['unitNumber', 'receiveDate', 'initialFault', 'deliverDate', 'moreFaults', 'imageUrl'];
    use HasFactory;
}