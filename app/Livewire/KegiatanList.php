<?php

namespace App\Livewire;

use Livewire\Component;
use Livewire\WithPagination;
use App\Models\Kegiatan;
use Illuminate\Support\Facades\Storage;

class KegiatanList extends Component
{
    use WithPagination;

    protected $paginationTheme = 'bootstrap';
    
    // Add listener for refresh after deletion
    protected $listeners = ['refreshComponent' => '$refresh'];
    
    public function render()
    {
        $kegiatans = Kegiatan::with('admin.profile')->latest()->paginate(10);
        
        return view('livewire.kegiatan-list', [
            'kegiatans' => $kegiatans
        ]);
    }
    
    public function delete($id)
    {
        $kegiatan = Kegiatan::find($id);
        
        if ($kegiatan) {
            // Delete file if exists
            if ($kegiatan->lampiran) {
                Storage::delete('public/' . $kegiatan->lampiran);
            }
            
            // Delete the record
            $kegiatan->delete();
            
            // Flash a success message
            session()->flash('success', 'Kegiatan berhasil dihapus');
            
            // Emit event to refresh the component
            $this->emit('refreshComponent');
        }
    }
}