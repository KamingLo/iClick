<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as FakerFactory;  // Tambahkan ini
use App\Models\Guru;
use App\Models\Profile;
use Illuminate\Support\Facades\Hash;

class GuruSeeder extends Seeder
{
    public function run(): void
    {
        $faker = FakerFactory::create();  // Buat instance faker

        // Buat 15 guru beserta profile baru otomatis per guru
        Guru::factory()->count(6)->create();

        $profile = Profile::create([
            'name' => 'Sherry Wenn',
            'jenis_kelamin' => 'Perempuan',
            'alamat' => 'ancol, Jakarta Utara',
            'email' => 'sherry@gmail.com',
            'pendidikan' => 'S1 Pendidikan',
            'password' => Hash::make('sherry123'), // Password default
            'no_telp' => '0838-3536-0789',
            'tanggal_lahir' => '2005-12-01', // format YYYY-MM-DD
            'tempat_lahir' => 'Jakarta',
        ]);

        Guru::create([
            'nuptk' => $faker->unique()->numerify('##########'), // 10 digit number
            'profile_id' => $profile->profile_id,
            'statusMenikah' => 'Belum Menikah',
            'statusKerja' => $faker->randomElement(['Full Time', 'Honorer']),
            'gelar' => $faker->randomElement(['S.Pd', 'S.Pd.I', 'M.Pd', 'M.Pd.I']),
        ]);
    }
}
