<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kelas;
use App\Models\TahunAjar;

class KelasTahunSeeder extends Seeder
{
    public function run(): void
    {
        $kelasList = Kelas::all();
        $tahunAjaranList = TahunAjar::all();

        foreach ($kelasList as $kelas) {
            $randomTahunRaw = $tahunAjaranList->random(rand(1, 2));

            $randomTahun = $randomTahunRaw instanceof \Illuminate\Support\Collection
                ? $randomTahunRaw->pluck('tahun_ajaran_id')->toArray()  // pakai 'tahun_ajaran_id'
                : [$randomTahunRaw->tahun_ajaran_id];

            $kelas->tahun()->syncWithoutDetaching($randomTahun);
        }
        $Public = Kelas::create([
            'kelas_id' => 10,
            'nama_kelas' => 'Public',
        ]);

        $tahunPublic = TahunAjar::create(['tahun_ajaran_id' => 10, 'tahun_ajaran' => 'Selamanya', 'semester' => 'Selamanya', 'status' => 'Tidak Aktif']);
        $Public->tahun()->attach($tahunPublic->tahun_ajaran_id);
    }
}
