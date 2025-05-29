<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Komentar extends Model
{
    use HasFactory;

    public $timestamps = false; 
    protected $table = 'komentar';
    protected $primaryKey = 'komentar_id';
    protected $fillable = ['postingan_id', 'profile_id', 'isi_komentar', 'created_at'];

    public function profile()
    {
        return $this->belongsTo(Profile::class, 'profile_id');
    }

    public function postingan()
    {
        return $this->belongsTo(Postingan::class, 'postingan_id');
    }
}
