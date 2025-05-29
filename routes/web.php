<?php

use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\PublicController;
use App\Models\Admin;
use App\Models\Guru;
use Illuminate\Support\Str;
use App\Http\Controllers\TrixController;
use App\Http\Controllers\EditorController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/blog', function () {
    return view('blog');
})->name('blog');

Route::get('/blog', [PublicController::class, 'tampilkanBlog'])->name('blog');

Route::get('/editor', [EditorController::class, 'show'])->name('editor');
Route::post('/editor', [EditorController::class, 'store'])->name('editor.store');

Route::get('post', [PublicController::class, 'tampilkanPostingan'])->name('postingan');
Route::get('post/{id}', [PublicController::class, 'tampilkanPostinganByIndex'])->name('postingan.index');

Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout'])->name('logout');

Route::middleware([RoleMiddleware::class.':admin'])->group(function () {
    Route::get('admin/dashboard', function() {
        $admin = Admin::where('profile_id', auth()->id())->firstOrFail();
        return view('admin.dashboard', compact('admin'));
    })->name('admin.dashboard');

    Route::get('/admin/register', [AdminController::class, 'formUser']);
    Route::post('/admin/register', [AdminController::class, 'tambahkanUser'])->name('admin.register');

    Route::get('admin/pelajaran', [AdminController::class, 'tampilkanPelajaran'])->name('admin.pelajaran');
    Route::post('admin/pelajaran', [AdminController::class, 'simpanPelajaran'])->name('admin.pelajaran');
    
    Route::get('admin/pelajaran/edit/{id}', [AdminController::class, 'tampilkanUpdatePelajaran'])->name('pelajaran.update');
    Route::put('admin/pelajaran/edit/{id}', [AdminController::class, 'updatePelajaran'])->name('pelajaran.update');
    Route::delete('admin/pelajaran/destroy/{id}', [AdminController::class, 'hapusPelajaran'])->name('pelajaran.destroy');

    Route::get('admin/jadwal', [AdminController::class, 'tampilkanJadwal'])->name('admin.jadwal');
    Route::post('admin/jadwal/store', [AdminController::class, 'simpanJadwal'])->name('jadwal.store');
    
    Route::get('admin/jadwal/edit/{id}', [AdminController::class, 'tampilkanUpdateJadwal'])->name('jadwal.update');
    Route::put('admin/jadwal/edit/{id}', [AdminController::class, 'updateJadwal'])->name('jadwal.update');
    Route::delete('admin/jadwal/destroy/{id}', [AdminController::class, 'hapusJadwal'])->name('jadwal.destroy');
    
    Route::get('admin/manajemenKelas', [AdminController::class, 'tampilkanManajemenKelas'])->name('admin.manajemenKelas');
    Route::post('admin/manajemenKelas', [AdminController::class, 'tambahKelas'])->name('admin.tambahKelas');
    Route::get('admin/manajemenKelas/edit/{id}', [AdminController::class, 'tampilkanUpdateKelas'])->name('kelas.update');
    Route::put('admin/manajemenKelas/edit/{id}', [AdminController::class, 'updateKelas'])->name('kelas.update');
    Route::delete('admin/manajemenKelas/destroy/{id}', [AdminController::class, 'hapusKelas'])->name('kelas.destroy');
    
    Route::get('admin/kenaikanKelas', [AdminController::class, 'tampilkanFormKenaikanKelas'])->name('admin.kenaikanKelas');
    Route::post('admin/kenaikanKelas', [AdminController::class, 'prosesKenaikanKelas'])->name('admin.prosesKenaikanKelas');

    Route::get('admin/manajemenPost', [AdminController::class, 'tampilkanManajemenPost'])->name('admin.manajemenPost');
    Route::post('admin/manajemenPost', [AdminController::class, 'tambahPostingan'])->name('admin.post.tambah');
    Route::get('admin/manajemenPost/edit/{id}', [AdminController::class, 'editPostingan'])->name('admin.post.edit');
    Route::put('admin/manajemenPost/edit/{id}', [AdminController::class, 'updatePostingan'])->name('admin.post.update');
    Route::delete('admin/manajemenPost/destroy/{id}', [AdminController::class, 'hapusPostingan'])->name('admin.post.hapus');

    Route::get('admin/manajemenUser', [AdminController::class, 'tampilkanManajemenUser'])->name('admin.ManajemenUser');
    Route::get('/admin/user/edit/{id}', [AdminController::class, 'editUser'])->name('admin.user.edit');
    Route::put('/admin/user/update/{id}', [AdminController::class, 'updateUser'])->name('admin.user.update');
    Route::delete('/admin/user/delete/{id}', [AdminController::class, 'destroyUser'])->name('admin.user.delete');
});

Route::middleware([RoleMiddleware::class.':guru'])->group(function() {
    Route::get('guru/dashboard', function() {
        $guru = Guru::where('profile_id', auth()->id())->firstOrFail();
        return view('guru.dashboard', compact('guru'));
    })->name('guru.dashboard');

    Route::get('guru/jadwal', [GuruController::class, 'tampilkanJadwalPelajaran'])->name('guru.jadwal');
    Route::get('guru/jadwalanda', [GuruController::class, 'tampilkanJadwalAnda'])->name('guru.jadwalanda');
    Route::get('guru/buatpengumuman', [GuruController::class, 'tampilkanPengumuman'])->name('guru.pengumuman');

    Route::get('guru/menu-nilai', [GuruController::class, 'tampilkanMenuNilai'])->name('guru.isinilai');
    Route::post('guru/menu-nilai', [GuruController::class, 'simpanNilai'])->name('guru.isinilai');

    Route::get('guru/ManajemenPostGuru', [GuruController::class, 'tampilkanManajemenPost'])->name('guru.manajemenPost');    

    Route::get('guru/', function() {
        return view('guru.post');
    })->name('guru.post');
});