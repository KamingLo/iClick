@include('admin.partials.header', ['NamaPage' => 'Halaman Utama']) 
@include('admin.partials.sidebar')
<link rel="stylesheet" href="{{ asset('css/AdminCSS/ManajemenUserEdit.css') }}" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">

<body>
<div class="edit-user-container">
    <h1>Edit User</h1>

    <div class="edit-user-card">
        <h2>Edit Data {{ ucfirst($role) }}</h2>

        <form method="POST" action="{{ route('admin.user.update', $id) }}">
            @csrf
            @method('PUT')

            <input type="hidden" name="role" value="{{ $role }}">

            @php
                $profile = $role === 'murid' ? $user->murid->profile : $user->profile;
            @endphp

            <div class="form-group">
                <label for="name">Nama</label>
                <input type="text" id="name" name="name" value="{{old('name', $profile->name ?? '') }}" required>
            </div>

{{-- itu berguna buat edit jadi, usernya gak perlu ngetik ulang dari awal --}}
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" value="{{ old('email', $profile->email ?? '') }}" required>
            </div>

            <div class="form-group">
                <label for="alamat">Alamat</label>
                <input type="text" id="alamat" name="alamat" value="{{ old('alamat', $profile->alamat ?? '') }}" required>
            </div>

            <div class="form-group">
                <label for="jenis_kelamin">Jenis Kelamin</label>
                <select id="jenis_kelamin" name="jenis_kelamin" required>
                    <option value="Laki-laki" {{ old('jenis_kelamin', $profile->jenis_kelamin ?? '') }}>Laki-laki</option>
                    <option value="Perempuan" {{ old('jenis_kelamin', $profile->jenis_kelamin ?? '') }}>Perempuan</option>
                </select>
            </div>

            <div class="form-group">
                <label for="tanggal_lahir">Tanggal Lahir</label>
                <input type="date" id="tanggal_lahir" name="tanggal_lahir" value="{{ old('tanggal_lahir', $profile->tanggal_lahir ?? '') }}" required>
            </div>

            <div class="form-group">
                <label for="tempat_lahir">Tempat Lahir</label>
                <input type="text" id="tempat_lahir" name="tempat_lahir" value="{{ old('tempat_lahir', $profile->tempat_lahir ?? '') }}" required>
            </div>

            <div class="form-group">
                <label for="pendidikan">Pendidikan terakhir</label>
                <input type="text" id="pendidikan" name="pendidikan" value="{{ old('pendidikan', $profile->pendidikan ?? '') }}" required>
            </div>

            <div class="form-group">
                <label for="no_telp">No Telepon</label>
                <input type="text" id="no_telp" name="no_telp" value="{{ old('no_telp', $profile->no_telp ?? '') }}" required>
            </div>

            <div class="form-group">
                <label for="password">Password (kosongkan jika tidak diubah)</label>
                <input type="password" id="password" name="password">
            </div>

            {{-- Role Specific Fields --}}
            @if ($role === 'murid')
                <div class="form-group">
                    <label for="asal_sekolah">Asal Sekolah</label>
                    <input type="text" id="asal_sekolah" name="asal_sekolah" value="{{  old('asal_sekolah', $user->murid->asal_sekolah ?? '') }}" required>
                </div>

                <div class="form-group">
                    <label for="nis">NIS</label>
                    <input type="text" id="nis" name="nis" value="{{  old('nis', $user->murid->nis ?? '') }}" required>
                </div>

                <div class="form-group">
                    <label for="nisn">NISN</label>
                    <input type="text" id="nisn" name="nisn" value="{{  old('nisn', $user->murid->nisn ?? '') }}" required>
                </div>

                <div class="form-group">
                    <label for="kelas_tahun_id">Kelas</label>
                    <select id="kelas_tahun_id" name="kelas_tahun_id" required>
                        @foreach ($kelasList as $kelastahun)
                            <option value="{{old('kelas_tahun_id', $kelastahun->kelas_tahun_id) }}">
                                {{ $kelastahun->kelas->nama_kelas }}
                            </option>

                        @endforeach
                    </select>
                </div>
            @elseif ($role === 'guru')
                <div class="form-group">
                    <label for="gelar">Gelar</label>
                    <input type="text" id="gelar" name="gelar" value="{{ $user->gelar }}" required>
                </div>

                <div class="form-group">
                    <label for="statusMenikah">Status Menikah</label>
                    <input type="text" id="statusMenikah" name="statusMenikah" value="{{ $user->statusMenikah }}" required>
                </div>

                <div class="form-group">
                    <label for="statusKerja">Status Kerja</label>
                    <input type="text" id="statusKerja" name="statusKerja" value="{{ $user->statusKerja }}" required>
                </div>

                <div class="form-group">
                    <label for="nuptk">NUPTK</label>
                    <input type="text" id="nuptk" name="nuptk" value="{{ $user->nuptk }}" required>
                </div>
            @elseif ($role === 'orang_tua')
                <div class="form-group">
                    <label for="profesi">Profesi</label>
                    <input type="text" id="profesi" name="profesi" value="{{ $user->profesi }}" required>
                </div>
            @endif

            <button type="submit" class="btn-update">Update User</button>
        </form>
    </div>
</div>
</body>
