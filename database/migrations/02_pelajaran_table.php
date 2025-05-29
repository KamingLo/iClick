<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use function Laravel\Prompts\table;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pelajaran', function (Blueprint $table){
            $table->id('pelajaran_id');
            $table->foreignId('guru_id')->constrained('guru', 'guru_id')->onDelete('cascade');
            $table->string('namaPelajaran');
        });

        Schema::create('jadwal_pelajaran', function (Blueprint $table){
            $table->id('jadwal_id');
            $table->foreignId('pelajaran_id')->constrained('pelajaran', 'pelajaran_id')->onDelete('cascade');
            $table->foreignId('kelas_tahun_id')->constrained('kelas_tahun', 'kelas_tahun_id')->onDelete('cascade');
            $table->string('hari');
            $table->string('waktu_mulai');
            $table->string('waktu_selesai');
        });

        Schema::create('nilai', function (Blueprint $table){
            $table->id('nilai_id');
            $table->foreignId('murid_kelas_id')->constrained('murid_kelas', 'murid_kelas_id')->onDelete('cascade');
            $table->foreignId('pelajaran_id')->constrained('pelajaran', 'pelajaran_id')->onDelete('cascade');
            $table->string('nilai_tugas')->nullable();
            $table->string('nilai_uts')->nullable();
            $table->string('nilai_uas')->nullable();
        });
    }
};