<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nilai extends Model
{
    use HasFactory;
    protected $table = 'nilai';  // ini penting, supaya pakai tabel 'nilai' yang sudah ada
    protected $primaryKey = 'nilai_id'; // kalau primary key bukan 'id', set juga ini
    public $timestamps = false;  // kalau kamu tidak memakai timestamps
    protected $fillable = ['murid_kelas_id', 'pelajaran_id','nilai_tugas', 'nilai_uts', 'nilai_uas'];

    public function muridkelas()
    {
        return $this->belongsTo(MuridKelas::class, 'murid_kelas_id');
    }

    public function pelajaran()
    {
        return $this->belongsTo(Pelajaran::class, 'pelajaran_id');
    }
}
