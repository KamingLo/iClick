<?php
// app/Models/Kehadiran.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Kehadiran extends Model
{
    use HasFactory;

    protected $primaryKey = 'kehadiran_id';

    protected $fillable = [
        'absensi_id',
        'status_kehadiran',
        'tanggal'
    ];

    public function absensi()
    {
        return $this->belongsTo(Absensi::class, 'absensi_id');
    }
}