<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'kelas';
    protected $primaryKey = 'kelas_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = ['nama_kelas'];
    
    public function murid()
    {
        return $this->hasMany(Murid::class, 'kelas_id');
    }

    public function tahun(){
        return $this->belongsToMany(TahunAjar::class, 'kelas_tahun', 'kelas_id', 'tahun_ajaran_id');
    }    

    public function jadwalPelajaran()
    {
        return $this->hasMany(JadwalPelajaran::class, 'kelas_id');
    }
}
