@include('admin.partials.header', ['NamaPage' => 'Halaman Utama'])
@include('admin.partials.sidebar')
<link rel="stylesheet" href="{{ asset('css/AdminCSS/ManajemenKelas.css') }}" />
<link rel="stylesheet" href="{{ asset('css/AdminCSS/KenaikanKelas.css') }}" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">

<body>
    <div class="ContainerManajemenKelas">
        <h1>Manajemen Kelas</h1>
        
        <div class="HeaderManajemenKelas">
            <div class="HeaderTabs">
                <button class="HeaderTabButton active" onclick="switchTab('manajemen')" id="tabManajemen">
                    Manajemen Kelas
                </button>
                <button class="HeaderTabButton" onclick="switchTab('kenaikan')" id="tabKenaikan">
                    Kenaikan Kelas
                </button>
            </div>
        </div>

        <div id="manajemenTab" class="TabContent active">
            <div class="LayoutManKelForm">
                <h2>Tambah Kelas</h2>
                <form action="{{ route('admin.tambahKelas') }}" method="POST">
                    @csrf

                    <div class="IsiData">
                        <label for="nama_kelas">Nama Kelas</label>
                        <div style="position: relative;">
                            <input type="text" name="nama_kelas" id="nama_kelas" class="TampilanIsiData" placeholder="Masukkan nama kelas" required>
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
                        <select name="tahun_ajar" id="tahunAjar" class="TampilanIsiData" required>
                            <option value="{{ (now()->year) }}/{{ (now()->year)+1}}">{{ (now()->year) }}/{{ (now()->year)+1}}</option>
                            <option value="{{ (now()->year)-1 }}/{{ (now()->year)}}">{{ (now()->year)-1 }}/{{ (now()->year)}}</option>
                            <option value="{{ (now()->year)-2 }}/{{ (now()->year)}}">{{ (now()->year)-2 }}/{{ (now()->year)-1}}</option>
                        </select>
                        @error('tahun_ajar')
                            <div class="UiPsnDis PsnError">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="IsiData">
                        <label for="semester">Semester</label>
                        <select name="semester" id="semester" class="TampilanIsiData" required>
                            <option value="Ganjil">Ganjil</option>
                            <option value="Genap">Genap</option>
                        </select>
                        @error('semester')
                            <div class="UiPsnDis PsnError">{{ $message }}</div>
                        @enderror
                    </div>

                    <button type="submit" class="TombolOJT TambahKelasBaru">
                        Tambah Kelas Baru
                    </button>

                    @if(session('success'))
                        <div class="UiPsnDis PsnBerhasil">
                            {{ session('success') }}
                        </div>
                    @endif

                    @if ($errors->has('jadwal'))
                        <div class="UiPsnDis PsnError">
                            {{ $errors->first('jadwal') }}
                        </div>
                    @endif
                </form>
            </div>
        </div>

        <div id="kenaikanTab" class="TabContent">
            <div class="LayoutKenaikanKelasForm">
                <h2>Form Kenaikan Kelas</h2>
                <form action="{{ route('admin.prosesKenaikanKelas') }}" method="POST">
                    @csrf

                    <div class="IsiData">
                        <label for="kelas_asal">Kelas Asal</label>
                        <select name="kelas_asal" id="kelas_asal" class="TampilanIsiData" required>
                            <option value="" disabled selected>-- Pilih Kelas Asal --</option>
                            @if(isset($kelasSekarang))
                                @foreach($kelasSekarang as $kelas)
                                    <option value="{{ $kelas->kelas_tahun_id }}">
                                        {{ $kelas->kelas->nama_kelas }} - {{ $kelas->tahunajar->tahun_ajaran }} {{ $kelas->tahunajar->semester }}
                                    </option>
                                @endforeach
                            @endif
                        </select>
                    </div>

                    <div class="IsiData">
                        <label for="kelas_tujuan">Kelas Tujuan</label>
                        <select name="kelas_tujuan" id="kelas_tujuan" class="TampilanIsiData" required>
                            <option value="" disabled selected>-- Pilih Kelas Tujuan --</option>
                            @if(isset($semuaKelas))
                                @foreach($semuaKelas as $kelas)
                                    <option value="{{ $kelas->kelas_id }}">
                                        {{ $kelas->nama_kelas }}
                                    </option>
                                @endforeach
                            @endif
                        </select>
                    </div>

                    <div class="IsiData">
                        <label for="tahun_ajaran_kenaikan">Tahun Ajaran</label>
                        <select name="tahun_ajaran" id="tahun_ajaran_kenaikan" class="TampilanIsiData" required>
                            <option value="{{ (now()->year) }}/{{ (now()->year)+1}}">{{ (now()->year) }}/{{ (now()->year)+1}}</option>
                            <option value="{{ (now()->year)-1 }}/{{ (now()->year)}}">{{ (now()->year)-1 }}/{{ (now()->year)}}</option>
                        </select>
                    </div>

                    <div class="IsiData">
                        <label for="semester_kenaikan">Semester</label>
                        <select name="semester" id="semester_kenaikan" class="TampilanIsiData" required>
                            <option value="Ganjil">Ganjil</option>
                            <option value="Genap">Genap</option>
                        </select>
                    </div>

                    <div class="TombolKenaikanKelas">
                        <button type="submit" class="TombolOJT ProsesKenaikanKelas">
                            Proses Kenaikan Kelas
                        </button>
                    </div>
                </form>

                @if(session('success_kenaikan'))
                    <div class="UiPsnDis PsnBerhasil">
                        {{ session('success_kenaikan') }}
                    </div>
                @endif

                @if(session('error_kenaikan'))
                    <div class="UiPsnDis PsnError">
                        {{ session('error_kenaikan') }}
                    </div>
                @endif
            </div>
        </div>

        <!-- Tabel untuk Tab Manajemen Kelas -->
        <div id="tabelManajemen" class="LayoutManKelTable">
            <h2>Semua kelas</h2>
            <div class="DisplayDataTable">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Nama kelas</th>
                            <th>Tahun ajaran</th>
                            <th>Semester</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @if(isset($kelastahuns))
                            @foreach($kelastahuns as $kelastahun)
                                <tr>
                                    <td>{{ $kelastahun->kelas->nama_kelas}}</td>
                                    <td>{{ $kelastahun->tahunajar->tahun_ajaran }}</td>
                                    <td>{{ $kelastahun->tahunajar->semester}}</td>
                                    <td>{{ $kelastahun->tahunajar->status}}</td>
                                    <td>
                                        <div class="OptionJadwalTabel">
                                            <form action="{{ route('kelas.update', $kelastahun->kelas_tahun_id) }}" method="GET">
                                                <a href="manajemenKelas/edit/{{ $kelastahun->kelas_tahun_id }}" class="TombolOJT Tedit">
                                                    <i class='bx bx-edit-alt IconOJT'></i>Edit‎ ‎ ‎ ‎ ‎ 
                                                </a>
                                            </form>

                                            <form action="{{ route('kelas.destroy', $kelastahun->kelas_tahun_id) }}" method="POST">
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
                        @endif
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Tabel untuk Tab Kenaikan Kelas -->
        <div id="tabelKenaikan" class="LayoutManKelTable" style="display: none;">
            <h2>Kelas Aktif</h2>
            <div class="DisplayDataTable">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Nama kelas</th>
                            <th>Tahun ajaran</th>
                            <th>Semester</th>
                            <th>Status</th>
                            <th>Jumlah Siswa</th>
                        </tr>
                    </thead>
                    <tbody>
                        @if(isset($kelasSekarang))
                            @foreach($kelasSekarang as $kelas)
                                <tr>
                                    <td>{{ $kelas->kelas->nama_kelas}}</td>
                                    <td>{{ $kelas->tahunajar->tahun_ajaran }}</td>
                                    <td>{{ $kelas->tahunajar->semester}}</td>
                                    <td>{{ $kelas->tahunajar->status}}</td>
                                    <td>{{ $kelas->siswa_count ?? 0 }}</td>
                                </tr>
                            @endforeach
                        @endif
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>

<script src="{{ asset('js/CssAdmin.js') }}"></script>