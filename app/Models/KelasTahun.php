<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KelasTahun extends Model
{
    protected $table ='kelas_tahun';
    protected $primaryKey = 'kelas_tahun_id';
    public $timestamps = false;

    protected $fillable = [
        'kelas_id',
        'tahun_ajaran_id',
    ];

    public function kelas()
    {
    return $this->belongsTo(Kelas::class, 'kelas_id', 'kelas_id');
    }

    public function tahunajar(){
        return $this->belongsTo(TahunAjar::class, 'tahun_ajaran_id');
    }
}
