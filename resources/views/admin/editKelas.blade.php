@include('admin.partials.header', ['NamaPage' => 'Halaman Utama'])
@include('admin.partials.sidebar')
<link rel="stylesheet" href="{{ asset('css/AdminCSS/ManajemenKelas.css') }}" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">

<body>
    <div class="ContainerManajemenKelas">
        <h1>Edit Kelas</h1>

        <div class="LayoutManKelForm">
            <h2>Edit Kelas</h2>
            <form action="{{ route('kelas.update', $kelastahun->kelas_tahun_id) }}" method="POST">
                @csrf
                @method('PUT')
                
                <div class="IsiData">
                    <label for="nama_kelas">Nama Kelas</label>
                    <div style="position: relative;">
                        <input type="text" name="nama_kelas" id="nama_kelas" class="TampilanIsiData" placeholder="Masukkan nama kelas" value="{{ $kelastahun->kelas->nama_kelas }}" required>
                        <button type="button" id="clearNamaKelas" class="HapusBar">
                            <i class="bx bx-x"></i>
                        </button>
                    </div>
                    @error('nama_kelas')
                        <div class="UiPsnDis PsnError">{{ $message }}</div>
                    @enderror
                </div>

                <div class="IsiData">
                    <label for="tahunAjar">Tahun ajar</label>
                    <select name="tahun_ajaran" id="tahunAjar" class="TampilanIsiData" required>
                        <option value="{{ (now()->year) }}/{{ (now()->year)+1}}" {{ $kelastahun->tahunajar->tahun_ajaran == (now()->year) . '/' . (now()->year)+1 ? 'selected' : '' }}>{{ (now()->year) }}/{{ (now()->year)+1}}</option>
                        <option value="{{ (now()->year)-1 }}/{{ (now()->year)}}" {{ $kelastahun->tahunajar->tahun_ajaran == (now()->year)-1 . '/' . (now()->year) ? 'selected' : '' }}>{{ (now()->year)-1 }}/{{ (now()->year)}}</option>
                        <option value="{{ (now()->year)-2 }}/{{ (now()->year)}}" {{ $kelastahun->tahunajar->tahun_ajaran == (now()->year)-2 . '/' . (now()->year) ? 'selected' : '' }}>{{ (now()->year)-2 }}/{{ (now()->year)-1}}</option>
                    </select>
                    @error('tahun_ajaran')
                        <div class="UiPsnDis PsnError">{{ $message }}</div>
                    @enderror
                </div>

                <div class="IsiData">
                    <label for="semester">Semester</label>
                    <select name="semester" id="semester" class="TampilanIsiData" required>
                        <option value="Ganjil" {{ $kelastahun->tahunajar->semester == 'Ganjil' ? 'selected' : '' }}>Ganjil</option>
                        <option value="Genap" {{ $kelastahun->tahunajar->semester == 'Genap' ? 'selected' : '' }}>Genap</option>
                    </select>
                    @error('semester')
                        <div class="UiPsnDis PsnError">{{ $message }}</div>
                    @enderror
                </div>

                <div class="IsiData">
                    <label for="status">Status</label>
                    <select name="status" id="status" class="TampilanIsiData" required>
                        <option value="Aktif" {{ $kelastahun->status == 'Aktif' ? 'selected' : '' }}>Aktif</option>
                        <option value="Tidak Aktif" {{ $kelastahun->status == 'Tidak Aktif' ? 'selected' : '' }}>Tidak aktif</option>
                    </select>
                    @error('status')
                        <div class="UiPsnDis PsnError">{{ $message }}</div>
                    @enderror
                </div>

                <div class="OptionManKelEdit">
                    <button type="submit" class="TombolOJTEdit SimpanPerubahan">
                        Simpan Perubahan
                    </button>

                    <a href="{{ route('admin.manajemenKelas') }}" class="TombolOJTEdit TombolManKelBatal">Batal</a>
                </div>
                
                @if(session('success'))
                    <div class="UiPsnDis PsnBerhasil">
                        {{ session('success') }}
                    </div>
                @endif

                @if ($errors->has('kelas'))
                    <div class="UiPsnDis PsnError">
                        {{ $errors->first('kelas') }}
                    </div>
                @endif
            </form>
        </div>

        <div class="LayoutManKelTable">
            <h2>Detail Kelas</h2>
            <div class="DisplayDataTable">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Nama kelas</th>
                            <th>Tahun ajaran</th>
                            <th>Semester</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ $kelastahun->kelas->nama_kelas}}</td>
                            <td>{{ $kelastahun->tahunajar->tahun_ajaran }}</td>
                            <td>{{ $kelastahun->tahunajar->semester}}</td>
                            <td>{{ $kelastahun->tahunajar->status}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>