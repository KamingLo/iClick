<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MuridOrangTua extends Model
{
    use HasFactory;

    protected $table = 'murid_orang_tua';
    protected $primaryKey = 'murid_orang_tua_id';

    protected $fillable = [
        'murid_kelas_id',
        'orang_tua_id',
    ];

    public function orangtua()
    {
        return $this->belongsTo(OrangTua::class, 'orang_tua_id');
    }

    public function muridkelas()
    {
        return $this->belongsTo(MuridKelas::class, 'murid_kelas_id');
    }
}
