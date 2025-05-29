<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class KelasFactory extends Factory
{
    public function definition(): array
    {
        // Contoh nama kelas: 10A, 10B, 11A, 11B, 12A, 12B
        $grade = $this->faker->randomElement(['10', '11', '12']);
        $section = $this->faker->randomElement(['MP', 'AK', 'DKV 1', 'DKV 2']);
        return [
            'nama_kelas' => $grade . $section,
        ];
    }
}
