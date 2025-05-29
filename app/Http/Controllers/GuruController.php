<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;
use App\Models\Guru;
use App\Models\Admin;
use App\Models\OrangTua;
use App\Models\Murid;
use App\Models\Kelas;
use App\Models\Pelajaran;
use App\Models\JadwalPelajaran;
use App\Models\Postingan;
use App\Models\Komentar;
use App\Models\KelasTahun;
use App\Models\MuridOrangTua;
use App\Models\Nilai;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class GuruController extends Controller
{
    public function tampilkanDashboardGuru()
    {
        $guru = Guru::findOrFail(auth()->id());
        return view('guru.dashboard', compact('guru'));
    }

    public function tampilkanJadwalPelajaran(){
        $guru =Guru::where('profile_id', auth()->id())->firstOrFail();
        return view('guru.jadwalpelajaran', compact('guru'));
    }
    
    public function tampilkanJadwalAnda(){
        $guru =Guru::where('profile_id', auth()->id())->firstOrFail();
        return view('guru.jadwalajaranda', compact('guru'));
    }

    public function tampilkanPengumuman()
    {
        $guru = Guru::where('profile_id', auth()->id())->firstOrFail();
        $pengumuman = Postingan::where('profile_id', $guru->profile_id)->get();
        return view('guru.pengumuman', compact('guru', 'pengumuman'));
    }

    public function tampilkanManajemenPost(){
        $guru = Guru::where('profile_id', auth()->id())->firstOrFail();
        return view('guru.ManajemenPostGuru', compact('guru')); // atau 'guru.ManajemenPostGuru' jika dalam subfolder
    }

    public function index()
    {
        return view('ManajemenPostGuru');
    }


    public function buatPengumuman(Request $request)
    {
        $title = $request->title;
        $content = $request->content;

        // Simpan file HTML di storage/app/blog/
        $filename = now()->format('YmdHis') . '-' . \Str::slug($title) . '.html';

        Storage::disk('local')->put("blog/$filename", $content);

        // Optional: Simpan nama file di database jika kamu ingin tracking
        Postingan::create([
            'title' => $title,
            'content' => $filename, // hanya simpan nama file
        ]);

        return redirect()->route('guru.pengumuman')->with('success', 'Blog saved');
    }

    public function tampilkanMenuNilai(){
        $guru = Guru::where('profile_id', auth()->id())->firstorFail();
        return view('guru.isinilai', compact('guru'));
    }

        public function simpanNilai(Request $request)
    {
        $request->validate([
            'pelajaran_id' => 'required|exists:pelajaran,pelajaran_id',
            'kelas_tahun_id' => 'required|exists:kelas_tahun,kelas_tahun_id',
            'nilai' => 'required|array',
            'nilai.*.nilai_tugas' => 'nullable|numeric|min:0|max:100',
            'nilai.*.nilai_uts' => 'nullable|numeric|min:0|max:100',
            'nilai.*.nilai_uas' => 'nullable|numeric|min:0|max:100',
        ]);

        foreach ($request->nilai as $muridKelasId => $data) {
            Nilai::updateOrCreate(
                [
                    'murid_kelas_id' => $muridKelasId,
                    'pelajaran_id' => $request->pelajaran_id,
                ],
                [
                    'nilai_tugas' => $data['nilai_tugas'] ?? null,
                    'nilai_uts' => $data['nilai_uts'] ?? null,
                    'nilai_uas' => $data['nilai_uas'] ?? null,
                ]
            );
        }

        return back()->with('success', 'Nilai berhasil disimpan.');
    }

}