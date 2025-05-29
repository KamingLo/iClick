@include('admin.partials.header', ['NamaPage' => 'Kenaikan Kelas'])
@include('admin.partials.sidebar')
<link rel="stylesheet" href="{{ asset('css/AdminCSS/KenaikanKelas.css') }}" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">

<body>
    <div class="ContainerKenaikanKelas">
        <h1>Kenaikan Kelas</h1>

        <div class="LayoutKenaikanKelasForm">
            <h2>Form Kenaikan Kelas</h2>
            <form action="{{ route('admin.prosesKenaikanKelas') }}" method="POST">
                @csrf

                <div class="IsiData">
                    <label for="kelas_asal">Kelas Asal</label>
                    <select name="kelas_asal" id="kelas_asal" class="TampilanIsiData" required>
                        <option value="" disabled selected>-- Pilih Kelas Asal --</option>
                        @foreach($kelasSekarang as $kelas)
                            <option value="{{ $kelas->kelas_tahun_id }}">
                                {{ $kelas->kelas->nama_kelas }} - {{ $kelas->tahunajar->tahun_ajaran }} {{ $kelas->tahunajar->semester }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="IsiData">
                    <label for="kelas_tujuan">Kelas Tujuan</label>
                    <select name="kelas_tujuan" id="kelas_tujuan" class="TampilanIsiData" required>
                        <option value="" disabled selected>-- Pilih Kelas Tujuan --</option>
                        @foreach($semuaKelas as $kelas)
                            <option value="{{ $kelas->kelas_id }}">
                                {{ $kelas->nama_kelas }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="IsiData">
                    <label for="tahun_ajaran">Tahun Ajaran</label>
                    <select name="tahun_ajaran" id="tahun_ajaran" class="TampilanIsiData" required>
                        <option value="{{ (now()->year) }}/{{ (now()->year)+1}}">{{ (now()->year) }}/{{ (now()->year)+1}}</option>
                        <option value="{{ (now()->year)-1 }}/{{ (now()->year)}}">{{ (now()->year)-1 }}/{{ (now()->year)}}</option>
                    </select>
                </div>

                <div class="IsiData">
                    <label for="semester">Semester</label>
                    <select name="semester" id="semester" class="TampilanIsiData" required>
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

            @if(session('success'))
                <div class="UiPsnDis PsnBerhasil">
                    {{ session('success') }}
                </div>
            @endif

            @if($errors->any())
                <div class="UiPsnDis PsnError">
                    <ul>
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
        </div>
    </div>
</body>