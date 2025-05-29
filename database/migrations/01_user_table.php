<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use function Laravel\Prompts\table;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id('profile_id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('alamat');
            $table->string('foto')->nullable();
            $table->string('jenis_kelamin');
            $table->date('tanggal_lahir');
            $table->string('tempat_lahir');
            $table->string('pendidikan');
            $table->string('password');
            $table->string('no_telp');
            $table->timestamps();
        });

        Schema::create('guru', function (Blueprint $table) {
            $table->id('guru_id');
            $table->string('gelar');
            $table->string('statusMenikah');
            $table->string('statusKerja');
            $table->string('nuptk');
            $table->foreignId('profile_id')->constrained('profiles', 'profile_id')->onDelete('cascade');
        });
        

        Schema::create('orang_tua', function (Blueprint $table){
            $table -> id('orang_tua_id');
            $table -> string('profesi');
            $table->foreignId('profile_id')->constrained('profiles', 'profile_id')->onDelete('cascade');
        });

        Schema::create('admin', function (Blueprint $table){
            $table->id('admin_id');
            $table->foreignId('profile_id')->constrained('profiles', 'profile_id')->onDelete('cascade');
        });

        Schema::create('kelas', function (Blueprint $table){
            $table -> id('kelas_id');
            $table -> string('nama_kelas');
        });

        Schema::create('tahun_ajaran', function(Blueprint $table){
            $table -> id('tahun_ajaran_id');
            $table -> string('tahun_ajaran');
            $table -> string('semester');
            $table -> string('status');
        });

        Schema::create('murid', function (Blueprint $table){
            $table->id('murid_id');
            $table->string('asal_sekolah');
            $table->foreignId('profile_id')->constrained('profiles', 'profile_id')->onDelete('cascade');
            $table->string('nis');
            $table->string('nisn');
        });

        Schema::create('kelas_tahun', function(Blueprint $table){
            $table->id('kelas_tahun_id');
            $table->foreignId('kelas_id')->constrained('kelas', 'kelas_id')->onDelete('cascade');
            $table->foreignId('tahun_ajaran_id')->constrained('tahun_ajaran', 'tahun_ajaran_id')->onDelete('cascade');
        });

        Schema::create('murid_kelas', function(Blueprint $table){
            $table->id('murid_kelas_id');
            $table->foreignId('murid_id')->constrained('murid', 'murid_id')->onDelete('cascade');
            $table->foreignId('kelas_tahun_id')->constrained('kelas_tahun', 'kelas_tahun_id')->onDelete('cascade');
        });

        Schema::create('murid_orang_tua', function (Blueprint $table){
            $table->id('murid_orang_tua_id');
            $table->foreignId('murid_kelas_id')->constrained('murid_kelas', 'murid_kelas_id')->onDelete('cascade');
            $table->foreignId('orang_tua_id')->constrained('orang_tua', 'orang_tua_id')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kegiatan');
        Schema::dropIfExists('pengumuman');
        Schema::dropIfExists('jadwal_pelajaran');
        Schema::dropIfExists('nilai');
        Schema::dropIfExists('pelajaran');
        Schema::dropIfExists('absensi');
        Schema::dropIfExists('murid');
        Schema::dropIfExists('kelas');
        Schema::dropIfExists('admin');
        Schema::dropIfExists('orang_tua');
        Schema::dropIfExists('guru');
        Schema::dropIfExists('profile');
    }
};