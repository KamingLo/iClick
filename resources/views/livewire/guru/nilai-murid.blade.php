<div>
    <link rel="stylesheet" href="{{ asset('css/GuruCSS/NilaiMurid.css') }}" />
    <div class="KontainerNilai">
        <h1 class="JudulHalaman">Cek dan Input Nilai Murid</h1>

        @if (session()->has('success'))
            <div class="PesanSukses">
                {{ session('success') }}
            </div>
        @endif

        <div class="KontainerFormNilai">
            <!-- Langkah 1: Pilih Pelajaran -->
            <div class="GrupInput">
                <label class="LabelInput">
                    Pilih Pelajaran
                </label>
                <select wire:model.live="pilihanPelajaran" class="DropdownPilihan">
                    <option value="">-- Pilih Pelajaran --</option>
                    @foreach($pelajaranList as $pelajaran)
                        <option value="{{ $pelajaran->pelajaran_id }}">{{ $pelajaran->namaPelajaran }}</option>
                    @endforeach
                </select>
            </div>

            <!-- Langkah 2: Pilih Kelas -->
            @if($pilihanPelajaran)
                <div class="GrupInput">
                    <label class="LabelInput">
                        Pilih Kelas
                    </label>
                    <select wire:model.live="pilihanKelasTahun" class="DropdownPilihan">
                        <option value="">-- Pilih Kelas --</option>
                        @foreach($kelasTahunList as $kelasTahun)
                            <option value="{{ $kelasTahun->kelas_tahun_id }}">
                                {{ $kelasTahun->kelas->nama_kelas }} - {{ $kelasTahun->TahunAjar->tahun_ajaran }}
                            </option>
                        @endforeach
                    </select>
                </div>
            @endif

            <!-- Langkah 3: Input Nilai -->
            @if($pilihanKelasTahun)
                <form action="{{ route('guru.isinilai') }}" method="POST">
                    @csrf
                    <input type="hidden" name="pelajaran_id" value="{{ $pilihanPelajaran }}">
                    <input type="hidden" name="kelas_tahun_id" value="{{ $pilihanKelasTahun }}">

                    <div class="GrupInput">
                        <h3 class="JudulSeksi">Daftar Murid</h3>
                        <div class="KontainerTabel">
                            <table class="TabelNilai">
                                <thead>
                                    <tr>
                                        <th>Nama Murid</th>
                                        <th>Nilai Tugas</th>
                                        <th>Nilai UTS</th>
                                        <th>Nilai UAS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse($muridList as $muridKelas)
                                        <tr>
                                            <td>{{ $muridKelas->murid->profile->name }}</td>
                                            <td>
                                                <input type="number" 
                                                    name="nilai[{{ $muridKelas->murid_kelas_id }}][nilai_tugas]"
                                                    class="InputNilai"
                                                    min="0"
                                                    max="100"
                                                    placeholder="0-100"
                                                    value="{{ old('nilai_tugas.' . $muridKelas->murid_kelas_id, $nilai[$muridKelas->murid_kelas_id]['nilai_tugas'] ?? '') }}">
                                            </td>
                                            <td>
                                                <input type="number" 
                                                    name="nilai[{{ $muridKelas->murid_kelas_id }}][nilai_uts]"
                                                    class="InputNilai"
                                                    min="0"
                                                    max="100"
                                                    placeholder="0-100"
                                                    value="{{ old('nilai_uts.' . $muridKelas->murid_kelas_id, $nilai[$muridKelas->murid_kelas_id]['nilai_uts'] ?? '') }}">
                                            </td>
                                            <td>
                                                <input type="number" 
                                                    name="nilai[{{ $muridKelas->murid_kelas_id }}][nilai_uas]"
                                                    class="InputNilai"
                                                    min="0"
                                                    max="100"
                                                    placeholder="0-100"
                                                    value="{{ old('nilai_uas.' . $muridKelas->murid_kelas_id, $nilai[$muridKelas->murid_kelas_id]['nilai_uas'] ?? '') }}">
                                            </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="4" class="PesanKosong">
                                                Tidak ada murid dalam kelas ini
                                            </td>
                                        </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="KontainerTombol">
                        <button type="submit" class="TombolSimpan">
                            Simpan Nilai
                        </button>
                    </div>
                </form>
            @endif
        </div>
    </div>
</div>
