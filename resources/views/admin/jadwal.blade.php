@include('admin.partials.header', ['NamaPage' => 'Halaman Utama'])
@include('admin.partials.sidebar')
<link rel="stylesheet" href="{{ asset('css/AdminCSS/jadwal.css') }}" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">

<body>
    <div class="ContainerJadwal">
        <h1>Tambah Jadwal Pembelajaran</h1>

        <div class="LayoutJadwalForm">
            <h2>Tambah Jadwal</h2>
            <form action="{{ route('jadwal.store') }}" method="POST">
                @csrf

                <div class="IsiData">
                    <label for="pelajaran_id">Pelajaran</label>
                    <select name="pelajaran_id" id="pelajaran_id" class="TampilanIsiData" required>
                        <option value="" disabled selected>-- Pilih Pelajaran --</option>
                        @foreach($pelajaran as $item)
                            <option value="{{ $item->pelajaran_id }}">{{ $item->namaPelajaran }} ({{ $item ->guru->profile->name }})</option>
                        @endforeach
                    </select>
                </div>

                <div class="IsiData">
                    <label for="kelas_tahun_id">Kelas</label>
                    <select name="kelas_tahun_id" id="kelas_tahun_id" class="TampilanIsiData" required>
                        <option value="" disabled selected>-- Pilih Kelas --</option>
                        @foreach($kelasTahun as $item)
                            <option value="{{ $item->kelas_tahun_id }}">{{ $item->kelas->nama_kelas }} ({{ $item->TahunAjar->tahun_ajaran }}) {{ $item->TahunAjar->status }}</option>
                        @endforeach
                    </select>
                    @error('namaPelajaran')
                        <div class="UiPsnDis alert-danger">{{ $message }}</div>
                    @enderror
                </div>

                <div class="IsiData">
                    <label for="hari">Hari</label>
                    <select name="hari" id="hari" class="TampilanIsiData" required>
                        <option value="" disabled selected>-- Pilih Hari --</option>
                        <option value="Senin">Senin</option>
                        <option value="Selasa">Selasa</option>
                        <option value="Rabu">Rabu</option>
                        <option value="Kamis">Kamis</option>
                        <option value="Jumat">Jumat</option>
                    </select>
                </div>

                <div class="IsiData">
                    <label for="waktu_mulai">Waktu Mulai</label>
                    <input type="time" name="waktu_mulai" id="waktu_mulai" class="TampilanIsiData" required>
                </div>

                <div class="IsiData">
                    <label for="waktu_selesai">Waktu Selesai</label>
                    <input type="time" name="waktu_selesai" id="waktu_selesai" class="TampilanIsiData" required>
                </div>

                <button type="submit" class="TombolOJT TambahJadwal">
                    Tambah Jadwal
                </button>
            </form>

            @if(session('success'))
              <div class="UiPsnDis PsnBerhasil">
                  {{ session('success') }}
              </div>
            @endif

            @if ($errors->has('jadwal'))
                <div class="UiPsnDisD PsnError">
                    {{ $errors->first('jadwal') }}
                </div>
            @endif

        </div>

        <div class="LayoutJadwalTable">
            <h2>Jadwal Pembelajaran</h2>
            <div class="DisplayDataTable">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Pelajaran</th>
                            <th>Kelas</th>
                            <th>Hari</th>
                            <th>Waktu Mulai</th>
                            <th>Waktu Selesai</th>
                            <th>Guru Pengajar</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($jadwals as $jadwal)
                            <tr>
                                <td>{{ $jadwal->pelajaran->namaPelajaran }}</td>
                                <td>{{ $jadwal->kelasTahun->kelas->nama_kelas }}</td>
                                <td>{{ $jadwal->hari }}</td>
                                <td>{{ $jadwal->waktu_mulai }}</td>
                                <td>{{ $jadwal->waktu_selesai }}</td>
                                <td>{{ $jadwal->pelajaran->guru->profile->name }}</td>
                                <td>
                                    <div class="OptionJadwalTabel">
                                        <form action="{{ route('jadwal.update', $jadwal->jadwal_id) }}" method="GET">
                                            <a href="jadwal/edit/{{ $jadwal->jadwal_id }}" class="TombolOJT Tedit">
                                                <i class='bx bx-edit-alt IconOJT'></i>Edit‎ ‎ ‎ ‎ ‎ 
                                            </a> {{-- Jan diubah wa sengaja bikin cam tu 😂 --}}
                                        </form>

                                        <form action="{{ route('jadwal.destroy', $jadwal->jadwal_id) }}" method="POST">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="TombolOJT TombolDelete">
                                                <i class='bx bx-trash IconOJT'></i>Hapus
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>