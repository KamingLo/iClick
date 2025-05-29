<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kegiatan extends Model
{
    use HasFactory;

    public $timestamps = false; 
    protected $table = 'kegiatan';
    protected $primaryKey = 'kegiatan_id';
    protected $fillable = ['admin_id', 'judul_kegiatan', 'isi_kegiatan', 'lampiran'];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }
}
