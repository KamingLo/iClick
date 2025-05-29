<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProfileFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'jenis_kelamin' => $this->faker->randomElement(['Laki-laki', 'Perempuan']),
            'alamat' => $this->faker->address(),
            'email' => $this->faker->unique()->safeEmail(),
            'pendidikan' => $this->faker->randomElement(['SMA', 'D3', 'S1', 'S2']),
            'password' => bcrypt('password'), // Password default
            'no_telp' => $this->faker->phoneNumber(),
            'tanggal_lahir' => $this->faker->date('Y-m-d', '-10 years'),
            'tempat_lahir' => $this->faker->city(),
        ];
    }
}