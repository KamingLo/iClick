<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Profile;

class GuruFactory extends Factory
{
    protected $model = \App\Models\Guru::class;

    public function definition(): array
    {
        return [
            'nuptk' => $this->faker->unique()->numerify('##########'), // 10 digit number
            'profile_id' => Profile::factory(), // buat profile baru otomatis
            'statusMenikah' => $this->faker->randomElement(['Menikah', 'Belum Menikah']),
            'statusKerja' => $this->faker->randomElement(['Aktif', 'Tidak Aktif']),
            'gelar' => $this->faker->randomElement(['S.Pd', 'S.Pd.I', 'M.Pd', 'M.Pd.I']),

        ];
    }
}
