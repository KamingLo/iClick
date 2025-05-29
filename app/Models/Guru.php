<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guru extends Model
{
    use HasFactory;

    public $timestamps = false; 
    protected $table = 'guru';
    protected $primaryKey = 'guru_id';
    protected $fillable = ['profile_id','gelar', 'statusMenikah', 'statusKerja', 'nuptk'];

    public function profile()
    {
        return $this->belongsTo(Profile::class, 'profile_id');
    }

    public function pelajaran()
    {
        return $this->hasMany(Pelajaran::class, 'guru_id');
    }
}
