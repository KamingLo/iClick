<div>
    <link rel="stylesheet" href="{{ asset('css/JadwalGuru.css') }}" />
    
    <div class="ContainerTampilkanJadwal">
        <h1>Jadwal Pembelajaran per Hari</h1>

        <div class="LayoutTabelTerintegrasi">
            <div class="HeaderTabel">
                <div class="FilterDalamTabel">
                    <h2>Jadwal Pembelajaran</h2>
                    <div class="FilterControls">
                        <div class="FilterGroup">
                            <label for="hari">Pilih Hari:</label>
                            <select wire:model.live="hari" id="hari" class="FilterSelect">
                                <option value="">Semuanya</option>
                                <option value="Senin">Senin</option>
                                <option value="Selasa">Selasa</option>
                                <option value="Rabu">Rabu</option>
                                <option value="Kamis">Kamis</option>
                                <option value="Jumat">Jumat</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="InfoStatistik">
                    <p><i class="fas fa-info-circle"></i> Menampilkan <strong>{{ count($jadwals) }}</strong> jadwal untuk hari <strong>{{ $hari }}</strong></p>
                </div>
            </div>

            <div class="DisplayDataTable">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Pelajaran</th>
                            <th>Guru</th>
                            <th>Kelas</th>
                            <th>Waktu</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($jadwals as $jadwal)
                            <tr>
                                <td>{{ $jadwal->pelajaran->namaPelajaran }}</td>
                                <td>{{ $jadwal->pelajaran->guru->profile->name }}</td>
                                <td>{{ $jadwal->kelasTahun->kelas->nama_kelas }}</td>
                                <td>
                                    <span class="WaktuBadge">
                                        {{ $jadwal->waktu_mulai }} - {{ $jadwal->waktu_selesai }}
                                    </span>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="4">
                                    <div class="EmptyMessage">
                                        <i class="fas fa-calendar-times"></i>
                                        <br>
                                        Tidak ada jadwal untuk hari {{ $hari }}.
                                    </div>
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>