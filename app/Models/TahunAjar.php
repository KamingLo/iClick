<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TahunAjar extends Model
{
    use HasFactory;
    protected $table = 'tahun_ajaran';
    protected $primaryKey = 'tahun_ajaran_id';
    protected $fillable = ['tahun_ajaran', 'semester', 'status'];
    public $timestamps = false;

    public function kelas()
    {
        return $this->belongsToMany(Kelas::class, 'kelas_tahun', 'tahun_ajaran_id', 'kelas_id');
    }
}
