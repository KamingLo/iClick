<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuruPelajaranKelas extends Model
{
    protected $table = 'guru_pelajaran_kelas';
    protected $guarded = [];

    public function guru()
    {
        return $this->belongsTo(Guru::class);
    }

    public function pelajaran()
    {
        return $this->belongsTo(Pelajaran::class);
    }

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }
}