<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TahunAjar;

class TahunAjarSeeder extends Seeder
{
    public function run(): void
    {
        TahunAjar::factory()->count(5)->create();
    }
}
