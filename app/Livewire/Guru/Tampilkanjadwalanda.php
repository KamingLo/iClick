<?php

namespace App\Livewire\Guru;

use Livewire\Component;
use App\Models\JadwalPelajaran;

class Tampilkanjadwalanda extends Component
{
    public $hari = '';

    public function render()
    {
        if($this->hari != ''){
            $jadwals = JadwalPelajaran::whereHas('pelajaran.guru', function ($query) {
            $query->where('profile_id', auth()->id());
            })
            ->where('hari', $this->hari)
            ->with(['pelajaran.guru', 'kelasTahun.kelas'])
            ->orderBy('waktu_mulai')
            ->get();
        }
        else{
            $jadwals = JadwalPelajaran::whereHas('pelajaran.guru', function ($query) {
                $query->where('profile_id', auth()->id());
            })
            ->with(['pelajaran.guru', 'kelasTahun.kelas'])
            ->orderBy('waktu_mulai')
            ->get();
        }
        return view('livewire.guru.tampilkan-jadwal-anda', compact('jadwals'));
    }
}
