<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MuridKelas extends Model
{
    protected $table = 'murid_kelas';
    protected $primaryKey = 'murid_kelas_id';
    public $timestamps = false;

    protected $fillable = [
        'murid_id',
        'kelas_tahun_id',
    ];

    public function murid()
    {
        return $this->belongsTo(Murid::class, 'murid_id', 'murid_id');
    }

    public function kelastahun()
    {
        return $this->belongsTo(KelasTahun::class, 'kelas_tahun_id');
    }

    public function muridOrangTua(){
        return $this->hasMany(MuridOrangTua::class, 'murid_kelas_id');
    }

    public function nilai()
    {
        return $this->hasMany(Nilai::class, 'murid_kelas_id');
    }
}
