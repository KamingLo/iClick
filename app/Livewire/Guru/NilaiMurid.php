<?php 
namespace App\Livewire\Guru;

use App\Models\Guru;
use App\Models\MuridKelas;
use App\Models\Nilai;
use App\Models\Pelajaran;
use App\Models\KelasTahun;
use Livewire\Component;

class NilaiMurid extends Component
{
    public $pilihanPelajaran = '';
    public $pilihanKelasTahun = '';
    public $nilai = []; // nilai[ murid_kelas_id ] = ['nilai_tugas' => ..., 'nilai_uts' => ..., 'nilai_uas' => ...]
    public $guru;

    public function mount()
    {
        $this->guru = Guru::where('profile_id', auth()->id())->first();
        if (!$this->guru) {
            session()->flash('error', 'Data guru tidak ditemukan');
        }
    }

    public function updatedPilihanPelajaran()
    {
        // reset kelas & nilai jika pelajaran berubah
        $this->pilihanKelasTahun = '';
        $this->nilai = [];
    }

    public function updatedPilihanKelasTahun()
    {
        $this->loadNilaiExisting();
    }

    public function loadNilaiExisting()
    {
        if (!$this->pilihanPelajaran || !$this->pilihanKelasTahun) {
            $this->nilai = [];
            return;
        }

        $muridList = MuridKelas::where('kelas_tahun_id', $this->pilihanKelasTahun)->pluck('murid_kelas_id');

        $nilaiExisting = Nilai::where('pelajaran_id', $this->pilihanPelajaran)
            ->whereIn('murid_kelas_id', $muridList)
            ->get();

        $this->nilai = [];

        foreach ($nilaiExisting as $nilai) {
            $this->nilai[$nilai->murid_kelas_id] = [
                'nilai_tugas' => $nilai->nilai_tugas,
                'nilai_uts' => $nilai->nilai_uts,
                'nilai_uas' => $nilai->nilai_uas,
            ];
        }
    }

    public function render()
    {
        $pelajaranList = collect();
        $kelasTahunList = collect();
        $muridList = collect();

        if ($this->guru) {
            $pelajaranList = Pelajaran::where('guru_id', $this->guru->guru_id)->get();

            if ($this->pilihanPelajaran) {
                $kelasTahunList = KelasTahun::with('kelas')->get();
            }

            if ($this->pilihanKelasTahun) {
                $muridList = MuridKelas::with(['murid.profile'])
                    ->where('kelas_tahun_id', $this->pilihanKelasTahun)
                    ->get();
            }
        }

        return view('livewire.guru.nilai-murid', [
            'pelajaranList' => $pelajaranList,
            'kelasTahunList' => $kelasTahunList,
            'muridList' => $muridList,
        ]);
    }
}
