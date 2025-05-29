@include('admin.partials.header', ['NamaPage' => 'Halaman Utama'])
@include('admin.partials.sidebar')

<link rel="stylesheet" href="{{ asset('css/AdminCSS/pelajaran.css') }}" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">

<body>
    <div class="ContainerPelajaran">
        <h1>Tambah Pelajaran Baru</h1>

        <div class="LayoutPelajaranForm">
            <h2>Tambah Pelajaran</h2>
            <form action="{{ route('admin.pelajaran') }}" method="POST">
                @csrf

                <div class="IsiData">
                    <label for="guru_id">Guru</label>
                    <select name="guru_id" id="guru_id" class="TampilanIsiData" required>
                        <option value="" disabled selected>-- Pilih Guru --</option>
                        @foreach($gurus as $guru)
                            <option value="{{ $guru->guru_id }}">
                                {{ $guru->profile->name }}
                            </option>
                        @endforeach
                    </select>
                    @error('guru_id')
                        <div class="UiPsnDis PsnError">{{ $message }}</div>
                    @enderror
                </div>

                <div class="IsiData">
                    <label for="namaPelajaran">Nama Pelajaran</label>
                    <div style="position: relative;">
                        <input type="text" name="namaPelajaran" id="namaPelajaran" class="TampilanIsiData" placeholder="Masukkan nama pelajaran" required>
                        <button type="button" id="clearNamaPelajaran" class="HapusBar">
                            <i class="bx bx-x"></i>
                        </button>
                    </div>
                    @error('namaPelajaran')
                        <div class="UiPsnDis PsnError">{{ $message }}</div>
                    @enderror
                </div>

                <button type="submit" class="TombolOJT TambahPelajaran">
                    Tambah Pelajaran
                </button>

                @if(session('success'))
                    <div class="UiPsnDis PsnBerhasil">
                        {{ session('success') }}
                    </div>
                @endif
            </form>
        </div>

        <div class="LayoutPelajaranTable">
            <h2>Daftar Pelajaran</h2>
            <div class="DisplayDataTable">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Nama Guru</th>
                            <th>Mata Pelajaran</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($pelajarans as $pelajaran)
                            <tr>
                                <td>{{ $pelajaran->guru->profile->name }}</td>
                                <td>{{ $pelajaran->namaPelajaran }}</td>
                                <td>
                                    <div class="OptionPelajaranTabel">
                                        <form action="{{ route('pelajaran.update', $pelajaran->pelajaran_id) }}" method="GET">
                                            <a href="pelajaran/edit/{{ $pelajaran->pelajaran_id }}" class="TombolOJT Tedit">
                                                <i class='bx bx-edit-alt IconOJT'></i>Edit‎ ‎ ‎ ‎ ‎ {{-- jan diubah kocak --}}
                                            </a>
                                        </form>
                                        
                                        <form action="{{ route('pelajaran.destroy', $pelajaran->pelajaran_id) }}" method="POST">
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

<script src="{{ asset('js/CssAdmin.js') }}"></script>