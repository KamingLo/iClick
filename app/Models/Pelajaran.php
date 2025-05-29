<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelajaran extends Model
{
    use HasFactory;

    public $timestamps = false; 
    protected $table = 'pelajaran';
    protected $primaryKey = 'pelajaran_id';
    protected $fillable = ['guru_id', 'namaPelajaran'];

    public function guru()
    {
        return $this->belongsTo(Guru::class, 'guru_id');
    }

    public function nilai()
    {
        return $this->hasMany(Nilai::class, 'pelajaran_id');
    }

    public function jadwalPelajaran()
    {
        return $this->hasMany(JadwalPelajaran::class, 'pelajaran_id');
    }
}
