<?php

namespace App\Livewire;

use Livewire\Component;
use Livewire\WithFileUploads;
use App\Models\Pengumuman;
use App\Models\Kegiatan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Livewire\Attributes\Validate;

class PostForm extends Component
{
    use WithFileUploads;
    
    public $tipe = 'pengumuman';
    public $judul;
    public $isi;
    public $lampiran;
    public $tempUrl;
    
    protected function rules()
    {
        return [
            'tipe' => 'required|in:pengumuman,kegiatan',
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'lampiran' => 'nullable|image|max:2048',
        ];
    }
    
    public function updatedLampiran()
    {
        $this->validate([
            'lampiran' => 'image|max:2048',
        ]);
        
        $this->tempUrl = $this->lampiran->temporaryUrl();
    }
    
    public function resetFields()
    {
        $this->tipe = 'pengumuman';
        $this->judul = '';
        $this->isi = '';
        $this->lampiran = null;
        $this->tempUrl = null;
    }
    
    public function submit()
    {
        $validatedData = $this->validate();
        
        // Process file upload if exists
        $lampiranPath = null;
        if ($this->lampiran) {
            $lampiranPath = $this->lampiran->store('public/uploads');
            $lampiranPath = str_replace('public/', '', $lampiranPath);
        }
        
        $adminId = Auth::id();
        
        if ($this->tipe === 'pengumuman') {
            Pengumuman::create([
                'admin_id' => $adminId,
                'judul_pengumuman' => $this->judul,
                'isi_pengumuman' => $this->isi,
                'lampiran' => $lampiranPath,
            ]);
            
            // Flash success message
            session()->flash('success', 'Pengumuman berhasil diposting!');
            
            // Reset form fields
            $this->resetFields();
            
            // Dispatch event to refresh components in Livewire v3
            $this->dispatch('refreshComponent');
            
        } else {
            Kegiatan::create([
                'admin_id' => $adminId,
                'judul_kegiatan' => $this->judul,
                'isi_kegiatan' => $this->isi,
                'lampiran' => $lampiranPath,
            ]);
            
            // Flash success message
            session()->flash('success', 'Kegiatan berhasil diposting!');
            
            // Reset form fields
            $this->resetFields();
            
            // Dispatch event to refresh components in Livewire v3
            $this->dispatch('refreshComponent');
        }
    }
    
    public function render()
    {
        return view('livewire.post-form');
    }
}