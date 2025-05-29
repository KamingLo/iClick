<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JadwalPelajaran extends Model
{
    use HasFactory;

    public $timestamps = false; 
    protected $table = 'jadwal_pelajaran';
    protected $primaryKey = 'jadwal_id';
    protected $fillable = ['pelajaran_id', 'kelas_tahun_id', 'hari', 'waktu_mulai', 'waktu_selesai'];

    public function pelajaran()
    {
        return $this->belongsTo(Pelajaran::class, 'pelajaran_id');
    }

    public function kelasTahun()
    {
        return $this->belongsTo(KelasTahun::class, 'kelas_tahun_id');
    }
}
