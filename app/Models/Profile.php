<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Profile extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'profiles';
    protected $primaryKey = 'profile_id'; // Penting!
    public $incrementing = true;
    protected $keyType = 'int'; // Tipe primary key
    protected $fillable = ['name', 'email', 'foto' ,'alamat','jenis_kelamin','tanggal_lahir','tempat_lahir','pendidikan', 'password', 'no_telp'];

    public function guru()
    {
        return $this->hasOne(Guru::class, 'profile_id');
    }

    public function orangTua()
    {
        return $this->hasOne(OrangTua::class, 'profile_id');
    }

    public function admin()
    {
        return $this->hasOne(Admin::class, 'profile_id');
    }

    public function murid()
    {
        return $this->hasOne(Murid::class, 'profile_id');
    }

    public function postingan()
    {
        return $this->hasMany(Postingan::class, 'profile_id');
    }

    public function komentar()
    {
        return $this->hasMany(Komentar::class, 'profile_id');
    }
}
?>