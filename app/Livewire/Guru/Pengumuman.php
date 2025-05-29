<?php

namespace App\Livewire\Guru;

use Livewire\Component;

class Pengumuman extends Component
{
    public function render()
    {
        $guru = Guru::where('profile_id', auth()->id())->firstOrFail();
        $pengumuman = Postingan::where('profile_id', $guru->profile_id)->get();
        return view('livewire.guru.pengumuman', compact('guru', 'pengumuman'));
    }
}
