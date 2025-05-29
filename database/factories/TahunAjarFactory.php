<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TahunAjarFactory extends Factory
{
    public function definition(): array
    {
        // Contoh tahun ajaran format: "2023/2024"
        $startYear = $this->faker->numberBetween(2022, 2024);
        $endYear = $startYear + 1;
        return [
            'tahun_ajaran' => $startYear . '/' . $endYear,
            'semester' => $this->faker->randomElement(['Ganjil', 'Genap']),
            'status' => 'Aktif',
        ];
    }
}
