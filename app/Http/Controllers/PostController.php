<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pengumuman;
use App\Models\Kegiatan;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    // Pengumuman CRUD operations
    public function editPengumuman($id)
    {
        $pengumuman = Pengumuman::findOrFail($id);
        return view('admin.edit-pengumuman', compact('pengumuman'));
    }

    public function updatePengumuman(Request $request, $id)
    {
        $pengumuman = Pengumuman::findOrFail($id);
        
        $validated = $request->validate([
            'judul_pengumuman' => 'required|string|max:255',
            'isi_pengumuman' => 'required|string',
            'lampiran' => 'nullable|image|max:2048',
        ]);
        
        $pengumuman->judul_pengumuman = $validated['judul_pengumuman'];
        $pengumuman->isi_pengumuman = $validated['isi_pengumuman'];
        
        if ($request->hasFile('lampiran')) {
            // Delete old file if exists
            if ($pengumuman->lampiran) {
                Storage::delete('public/' . $pengumuman->lampiran);
            }
            
            // Store new file
            $lampiranPath = $request->file('lampiran')->store('public/uploads');
            $pengumuman->lampiran = str_replace('public/', '', $lampiranPath);
        }
        
        $pengumuman->save();
        
        return redirect()->route('admin.manajemenPost', ['TipePost' => 'pengumuman'])
            ->with('success', 'Pengumuman berhasil diupdate!');
    }

    public function destroyPengumuman($id)
    {
        $pengumuman = Pengumuman::findOrFail($id);
        
        // Delete file if exists
        if ($pengumuman->lampiran) {
            Storage::delete('public/' . $pengumuman->lampiran);
        }
        
        $pengumuman->delete();
        
        return redirect()->route('admin.manajemenPost', ['TipePost' => 'pengumuman'])
            ->with('success', 'Pengumuman berhasil dihapus!');
    }
    
    // Kegiatan CRUD operations
    public function editKegiatan($id)
    {
        $kegiatan = Kegiatan::findOrFail($id);
        return view('admin.edit-kegiatan', compact('kegiatan'));
    }

    public function updateKegiatan(Request $request, $id)
    {
        $kegiatan = Kegiatan::findOrFail($id);
        
        $validated = $request->validate([
            'judul_kegiatan' => 'required|string|max:255',
            'isi_kegiatan' => 'required|string',
            'lampiran' => 'nullable|image|max:2048',
        ]);
        
        $kegiatan->judul_kegiatan = $validated['judul_kegiatan'];
        $kegiatan->isi_kegiatan = $validated['isi_kegiatan'];
        
        if ($request->hasFile('lampiran')) {
            // Delete old file if exists
            if ($kegiatan->lampiran) {
                Storage::delete('public/' . $kegiatan->lampiran);
            }
            
            // Store new file
            $lampiranPath = $request->file('lampiran')->store('public/uploads');
            $kegiatan->lampiran = str_replace('public/', '', $lampiranPath);
        }
        
        $kegiatan->save();
        
        return redirect()->route('admin.manajemenPost', ['TipePost' => 'kegiatan'])
            ->with('success', 'Kegiatan berhasil diupdate!');
    }

    public function destroyKegiatan($id)
    {
        $kegiatan = Kegiatan::findOrFail($id);
        
        // Delete file if exists
        if ($kegiatan->lampiran) {
            Storage::delete('public/' . $kegiatan->lampiran);
        }
        
        $kegiatan->delete();
        
        return redirect()->route('admin.manajemenPost', ['TipePost' => 'kegiatan'])
            ->with('success', 'Kegiatan berhasil dihapus!');
    }

    public function store(Request $request)
    {
        $content = $request->input('content');
        
        // Generate random filename
        $filename = Str::random(40) . '.html';
        
        // Simpan file HTML ke storage
        Storage::disk('public')->put('postingan/' . $filename, $content);
        
        // Simpan ke database sesuai schema
        Postingan::create([
            'profile_id' => auth()->user()->profile->profile_id,
            'tipe_postingan' => $request->tipe_postingan,
            'tujuan_postingan' => $request->tujuan_postingan,
            'path_postingan' => 'postingan/' . $filename,
            'judul_postingan' => $request->judul_postingan,
            'lampiran' => null // karena kita menonaktifkan upload file
        ]);
        
        return redirect()->back()->with('success', 'Postingan berhasil disimpan');
    }
}