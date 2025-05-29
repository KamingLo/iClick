<?php

namespace App\Livewire;

use Livewire\Component;
use Livewire\WithPagination;
use App\Models\Pengumuman;
use Illuminate\Support\Facades\Storage;

class PengumumanList extends Component
{
    use WithPagination;

    protected $paginationTheme = 'bootstrap';
    
    // Add listener for refresh after deletion
    protected $listeners = ['refreshComponent' => '$refresh'];
    
    public function render()
    {
        $pengumumans = Pengumuman::with('admin.profile')->latest()->paginate(10);
        
        return view('livewire.pengumuman-list', [
            'pengumumans' => $pengumumans
        ]);
    }
    
    public function delete($id)
    {
        $pengumuman = Pengumuman::find($id);
        
        if ($pengumuman) {
            // Delete file if exists
            if ($pengumuman->lampiran) {
                Storage::delete('public/' . $pengumuman->lampiran);
            }
            
            // Delete the record
            $pengumuman->delete();
            
            // Flash a success message
            session()->flash('success', 'Pengumuman berhasil dihapus');
            
            // Emit event to refresh the component
            $this->emit('refreshComponent');
        }
    }
}