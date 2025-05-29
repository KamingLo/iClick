<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Profile;
use App\Models\Admin;

class AdminSeeder extends Seeder
{
    public function run()
    {
        // Buat data profile untuk admin
        $profile = Profile::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'alamat' => 'Jl. Admin No. 1', // Sesuaikan dengan alamat
            'jenis_kelamin' => 'Laki-laki', // Sesuaikan dengan jenis kelamin
            'tanggal_lahir' => '1990-01-01', // Sesuaikan dengan tanggal lahir
            'tempat_lahir' => 'Jakarta', // Sesuaikan dengan tempat lahir
            'pendidikan' => 'S1', // Sesuaikan dengan pendidikan
            'password' => Hash::make('admin123'), // Password admin
            'no_telp' => '08123456789', // Sesuaikan dengan nomor telepon
        ]);

        // Buat data admin yang berhubungan dengan profile
        Admin::create([
            'profile_id' => $profile->profile_id, // Relasi dengan profile
        ]);
    }
}
