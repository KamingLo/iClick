<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Postingan extends Model
{
    use HasFactory;

    protected $table = 'postingan';
    protected $primaryKey = 'postingan_id';
    protected $fillable = ['admin_id', 'tipe', 'judul', 'isi', 'lampiran'];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }

    public function komentar()
    {
        return $this->hasMany(Komentar::class, 'postingan_id');
    }
}