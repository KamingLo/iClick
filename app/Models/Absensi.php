<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Absensi extends Model
{
    use HasFactory;

    protected $primaryKey = 'absensi_id';

    protected $fillable = [
        'murid_id',
        'pelajaran_id',
        'jumlah_kehadiran'
    ];

    public function kehadiran()
    {
        return $this->hasMany(Kehadiran::class, 'absensi_id');
    }
}
