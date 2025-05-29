<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengumuman extends Model
{
    use HasFactory;

    public $timestamps = false; 
    protected $table = 'pengumuman';
    protected $primaryKey = 'pengumuman_id';
    protected $fillable = ['admin_id', 'judul_pengumuman', 'isi_pengumuman', 'lampiran', 'created_at'];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }
}
