<?php

namespace App\Livewire\Guru;

use Livewire\Component;
use App\Models\JadwalPelajaran;

class TampilkanJadwalHari extends Component
{
    public $hari = '';

    public function render()
    {
        if($this->hari != ''){
            $jadwals = JadwalPelajaran::with(['pelajaran.guru', 'kelasTahun.kelas'])
            ->where('hari', $this->hari) // langsung hardcode
            ->orderBy('waktu_mulai')
            ->get();
        }else{
            $jadwals = JadwalPelajaran::with(['pelajaran.guru', 'kelasTahun.kelas'])
            ->orderBy('waktu_mulai')
            ->get();
        }
        return view('livewire.guru.tampilkan-jadwal-hari', [
            'jadwals' => $jadwals,
            'hari' => $this->hari,
        ]);
    }
}