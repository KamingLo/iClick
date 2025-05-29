<?php 
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Profile;
use App\Models\Guru;
use App\Models\Admin;
use App\Models\OrangTua;
use App\Models\Murid;
use App\Models\Kelas;
use App\Models\TahunAjar;
use App\Models\KelasTahun;

class AllSeeder extends Seeder
{
    public function run()
    {
        $this->call(AdminSeeder::class);
        $this->call([
            KelasSeeder::class,
            TahunAjarSeeder::class,
            KelasTahunSeeder::class,
        ]);
        $this->call(GuruSeeder::class);
    }
}
