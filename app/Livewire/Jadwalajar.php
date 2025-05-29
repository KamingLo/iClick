<?php 
namespace App\Http\Livewire;

use Livewire\Component;
use App\Models\JadwalPelajaran;
use App\Models\KelasTahun;

class Jadwalajar extends Component
{
    public $tahunTerpilih = '';
    public $tahunList = [];

    public function mount()
    {
        $this->tahunList = KelasTahun::select('tahun')->distinct()->pluck('tahun')->toArray();
    }

    public function render()
    {
        $jadwal = JadwalPelajaran::with(['pelajaran', 'kelasTahun'])
            ->when($this->tahunTerpilih, function ($query) {
                $query->whereHas('kelasTahun', function ($q) {
                    $q->where('tahun', $this->tahunTerpilih);
                });
            })
            ->get();

        return view('guru.jadwalpelajaran', [
            'jadwalList' => $jadwal,
        ]);
    }
}
