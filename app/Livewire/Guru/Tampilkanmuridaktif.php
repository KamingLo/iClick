<?php

namespace App\Livewire\Guru;

use Livewire\Component;
use App\models\MuridKelas;

class Tampilkanmuridaktif extends Component
{
    public $kelas = '';
    public $muridaktif = [];
    public function render()
    {
        $kelasAktif = KelasTahun::where('status', 'Aktif')->get();
        if($this->kelas !=''){
            $this->hasil= MuridKelas::with(['murid', 'kelasTahun.tahun', 'kelasTahun.kelas'])
            ->where('status', 'Aktif')
            ->whereHas('kelasTahun.kelas', function($query){
                $query->where('id', $this->kelas);
            })
            ->orderby('murid.nama')
            ->get();
        }else{
            $this->hasil= MuridKelas::with(['murid', 'kelasTahun.kelas', 'kelasTahun.tahun'])
            ->where('status', 'Aktif')
            ->orderby('murid.nama')
            ->get();
        }
        return view('livewire.guru.tampilkanmuridaktif', compact('kelasAktif', 'hasil'));
    }
}
