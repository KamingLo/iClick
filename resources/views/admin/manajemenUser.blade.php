@include('admin.partials.header', ['NamaPage' => 'Manajemen User'])
@include('admin.partials.sidebar')
<link rel="stylesheet" href="{{asset('css/AdminCSS/ManajemenUser.css')}}" />
{{-- <link rel="stylesheet" href="{{ asset('css/AdminCSS/register.css') }}" /> --}}
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">

<body>
    @if (session('role') == 'admin')
    <div class="ContainerUtamaManajemenUser">
        <h1>Registrasi Pengguna Baru</h1>
        <div class="container-split">
            <div class="form-container">
                <div class="ContainerRegister">
                    <div class="LayoutRegisterForm">
                        <div class="NotifikasiMUFormRegUser">
                            <h2>Register User</h2>
                            
                            @if(session('success'))
                            <div class="UiPsnDis PsnBerhasil">
                                {{ session('success') }}
                            </div>
                            @endif
                        </div>
                        
                        <form method="POST" action="{{ route('admin.register') }}">
                            @csrf
                            <div class="IsiData">
                                <label for="name">Nama:</label>
                                <div style="position: relative;">
                                    <input type="text" name="name" id="name" class="TampilanIsiData" placeholder="Masukkan nama lengkap" style="padding-right: 40px;">
                                    <button type="button" id="clearName" class="HapusBar">
                                        <i class='bx bx-x'></i>
                                    </button>
                                </div>
                                @error('name')
                                    <span class="error-message">{{ $message }}</span>
                                @enderror
                            </div>
                            
                            <div class="IsiData">
                                <label for="email">Email:</label>
                                <div style="position: relative;">
                                    <input type="email" name="email" id="email" class="TampilanIsiData" placeholder="Masukkan email" style="padding-right: 40px;">
                                    <button type="button" id="clearEmail" class="HapusBar">
                                        <i class='bx bx-x'></i>
                                    </button>
                                </div>
                                @error('email')
                                <span class="error-message">{{ $message }}</span>
                                @enderror
                            </div>
                            
                            <div class="IsiData">
                                <label for="alamat">Alamat:</label>
                                <div style="position: relative;">
                                    <input type="text" name="alamat" id="alamat" class="TampilanIsiData" placeholder="Masukkan alamat" style="padding-right: 40px;">
                                    <button type="button" id="clearAlamat" class="HapusBar">
                                        <i class='bx bx-x'></i>
                                    </button>
                                </div>
                                @error('alamat')
                                <span class="error-message">{{ $message }}</span>
                                @enderror
                            </div>

                            <div class="IsiData">
                                <label for="jenis_kelamin">Jenis kelamin:</label>
                                <div style="position: relative;">
                                    <select name="jenis_kelamin" id="jenis_kelamin" class="TampilanIsiData" style="padding-right: 40px;">
                                        <option value="" disabled selected>-- Pilih Jenis Kelamin --</option>
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                    <button type="button" id="clearJenisKelamin" class="HapusBar">
                                        <i class='bx bx-x'></i>
                                    </button>
                                </div>
                                @error('jenis_kelamin')
                                <span class="error-message">{{ $message }}</span>
                                @enderror
                            </div>
                            
                            <div class="IsiData">
                                <label for="tanggal_lahir">Tanggal lahir:</label>
                                <div style="position: relative;">
                                    <input type="date" name="tanggal_lahir" id="tanggal_lahir" class="TampilanIsiData" placeholder="Masukkan tanggal lahir" style="padding-right: 40px;">
                                    <button type="button" id="clearTanggalLahir" class="HapusBar">
                                        <i class='bx bx-x'></i>
                                    </button>
                                </div>
                                @error('tanggal_lahir')
                                <span class="error-message">{{ $message }}</span>
                                @enderror
                            </div>

                            <div class="IsiData">
                                <label for="tempat_lahir">Tempat Lahir:</label>
                                <div style="position: relative;">
                                    <input type="text" name="tempat_lahir" id="tempat_lahir" class="TampilanIsiData" placeholder="Masukkan tempat lahir" style="padding-right: 40px;">
                                    <button type="button" id="clearTempatLahir" class="HapusBar">
                                        <i class='bx bx-x'></i>
                                    </button>
                                </div>
                                @error('tempat_lahir')
                                <span class="error-message">{{ $message }}</span>
                                @enderror
                            </div>

                            <div class="IsiData">
                                <label for="pendidikan">Pendidikan terakhir :</label>
                                <div style="position: relative;">
                                    <select name="pendidikan" id="pendidikan" class="TampilanIsiData" required style="padding-right: 40px;">
                                        <option value="" disabled selected>-- Pilih Pendidikan Terakhir --</option>
                                        <option value="SD atau Setaranya">SD atau setaranya</option>
                                        <option value="SMP atau Setaranya">SMP atau Setaranya</option>
                                        <option value="SMA atau Setaranya">SMA atau Setaranya</option>
                                        <option value="S1 atau Setaranya">S1 atau Setaranya</option>
                                        <option value="S2 atau Setaranya">S2 atau Setaranya</option>
                                        <option value="S3 atau Setaranya">S3 atau Setaranya</option>
                                    </select>
                                </div>
                                @error('pendidikan')
                                <span class="error-message">{{ $message }}</span>
                                @enderror
                            </div>

                            <div class="IsiData">
                                <label for="no_telp">No Telp:</label>
                                <div style="position: relative;">
                                    <input type="text" name="no_telp" id="no_telp" class="TampilanIsiData NomorOnly" placeholder="Masukkan nomor telepon" style="padding-right: 40px;">
                                    <button type="button" id="clearNoTelp" class="HapusBar">
                                        <i class='bx bx-x'></i>
                                    </button>
                                </div>
                                @error('no_telp')
                                <span class="error-message">{{ $message }}</span>
                                @enderror
                            </div>
                            
                            <div class="IsiData">
                                <label for="password">Password:</label>
                                <div style="position: relative;">
                                    <input type="password" name="password" id="password" class="TampilanIsiData" placeholder="Masukkan password" style="padding-right: 40px;">
                                    <button type="button" id="clearPassword" class="HapusBar">
                                        <i class='bx bx-x'></i>
                                    </button>
                                </div>
                                @error('password')
                                <span class="error-message">{{ $message }}</span>
                                @enderror
                            </div>

                            <div class="IsiData">
                                <label for="role-select">Role:</label>
                                <div style="position: relative;">
                                    <select name="role" id="UserUntuk" class="TampilanIsiData" required style="padding-right: 40px;">
                                        <option value="" disabled selected>-- Pilih Role --</option>
                                        <option value="murid"{{ old('role') == 'murid' ? 'selected' : '' }}>Murid</option>
                                        <option value="guru"{{ old('role') == 'guru' ? 'selected' : '' }}>Guru</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <button type="button" id="clearRole" class="HapusBar">
                                        <i class='bx bx-x'></i>
                                    </button>
                                </div>
                                @error('role')
                                <span class="error-message">{{ $message }}</span>
                                @enderror
                            </div>
                        
                        <div class="DisplayDataTable" id="FormUntukMurid">
                                <h2>Data Murid</h2>
                                
                                <div class="IsiData">
                                <label for="asal_sekolah">Asal Sekolah:</label>
                                <div style="position: relative;">
                                    <input type="text" name="asal_sekolah" id="asal_sekolah" class="TampilanIsiData" placeholder="Masukkan asal sekolah" style="padding-right: 40px;">
                                    <button type="button" id="clearAsalSekolah" class="HapusBar">
                                        <i class='bx bx-x'></i>
                                    </button>
                                </div>
                                @error('asal_sekolah')
                                    <span class="error-message">{{ $message }}</span>
                                @enderror
                                </div>
                                
                                <div class="IsiData">
                                <label for="nis">NIS:</label>
                                <div style="position: relative;">
                                    <input type="text" name="nis" id="nis" class="TampilanIsiData" placeholder="Masukkan NIS" style="padding-right: 40px;">
                                    <button type="button" id="clearNis" class="HapusBar">
                                        <i class='bx bx-x'></i>
                                    </button>
                                </div>
                                @error('nis')
                                    <span class="error-message">{{ $message }}</span>
                                @enderror
                                </div>
                                
                                <div class="IsiData">
                                <label for="nisn">NISN:</label>
                                <div style="position: relative;">
                                    <input type="text" name="nisn" id="nisn" class="TampilanIsiData" placeholder="Masukkan NISN" style="padding-right: 40px;">
                                    <button type="button" id="clearNisn" class="HapusBar">
                                        <i class='bx bx-x'></i>
                                    </button>
                                </div>
                                @error('nisn')
                                    <span class="error-message">{{ $message }}</span>
                                @enderror
                                </div>
                                
                                <div class="IsiData">
                                <label for="kelas_id">Kelas:</label>
                                <div style="position: relative;">
                                    <select name="kelas_tahun_id" id="kelas_id" class="TampilanIsiData" style="padding-right: 40px;">
                                        <option value="">-- Pilih Kelas --</option>
                                        @foreach ($kelasList as $kelas)
                                            <option value="{{ $kelas->kelas_tahun_id }}">{{ $kelas->kelas->nama_kelas }} - {{ $kelas->tahunajar->tahun_ajaran }}</option>
                                        @endforeach
                                    </select>
                                    <button type="button" id="clearKelasId" class="HapusBar">
                                        <i class='bx bx-x'></i>
                                    </button>
                                </div>
                                @error('kelas_id')
                                    <span class="error-message">{{ $message }}</span>
                                @enderror
                                </div>

                                <h5>Data Wali Murid</h5>
                                <div class="FormUntukOrtu">
                                <div class="IsiData">
                                    <label for="ortu_name">Nama Wali Murid:</label>
                                    <div style="position: relative;">
                                        <input type="text" name="ortu_name" id="ortu_name" class="TampilanIsiData" placeholder="Nama wali murid" style="padding-right: 40px;">
                                        <button type="button" id="clearOrtuName" class="HapusBar">
                                            <i class='bx bx-x'></i>
                                        </button>
                                    </div>
                                    @error('ortu_name')
                                    <span class="error-message">{{ $message }}</span>
                                    @enderror
                                </div>
                                
                                <div class="IsiData">
                                    <label for="ortu_email">Email Wali Murid:</label>
                                    <div style="position: relative;">
                                        <input type="email" name="ortu_email" id="ortu_email" class="TampilanIsiData" placeholder="Email wali murid" style="padding-right: 40px;">
                                        <button type="button" id="clearOrtuEmail" class="HapusBar">
                                            <i class='bx bx-x'></i>
                                        </button>
                                    </div>
                                    @error('ortu_email')
                                    <span class="error-message">{{ $message }}</span>
                                    @enderror
                                </div>

                                <div class="IsiData">
                                    <label for="ortu_alamat">Alamat Wali Murid:</label>
                                    <div style="position: relative;">
                                        <input type="text" name="ortu_alamat" id="ortu_alamat" class="TampilanIsiData" placeholder="Alamat wali murid" style="padding-right: 40px;">
                                        <button type="button" id="clearOrtuAlamat" class="HapusBar">
                                            <i class='bx bx-x'></i>
                                        </button>
                                    </div>
                                    @error('ortu_alamat')
                                    <span class="error-message">{{ $message }}</span>
                                    @enderror
                                </div>
                                
                                <div class="IsiData">
                                    <label for="ortu_jenis_kelamin">Jenis Kelamin Wali Murid:</label>
                                    <div style="position: relative;">
                                        <select name="ortu_jenis_kelamin" id="ortu_jenis_kelamin" class="TampilanIsiData" style="padding-right: 40px;">
                                            <option value="" disabled selected>-- Pilih Jenis Kelamin --</option>
                                            <option value="Laki-laki">Laki-laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </select>
                                        <button type="button" id="clearOrtuJenisKelamin" class="HapusBar">
                                            <i class='bx bx-x'></i>
                                        </button>
                                    </div>
                                    @error('ortu_jenis_kelamin')
                                        <span class="error-message">{{ $message }}</span>
                                    @enderror
                                </div>
                                
                                <div class="IsiData">
                                    <label for="ortu_tempat_lahir">Tempat Lahir Wali Murid:</label>
                                    <div style="position: relative;">
                                        <input type="text" name="ortu_tempat_lahir" id="ortu_tempat_lahir" class="TampilanIsiData" placeholder="Tempat lahir wali murid" style="padding-right: 40px;">
                                        <button type="button" id="clearOrtuTempatLahir" class="HapusBar">
                                            <i class='bx bx-x'></i>
                                        </button>
                                    </div>
                                    @error('ortu_tempat_lahir')
                                    <span class="error-message">{{ $message }}</span>
                                    @enderror
                                </div>
                                
                                <div class="IsiData">
                                    <label for="ortu_tanggal_lahir">Tanggal lahir:</label>
                                    <div style="position: relative;">
                                        <input type="date" name="ortu_tanggal_lahir" id="ortu_tanggal_lahir" class="TampilanIsiData" placeholder="Tanggal lahir wali murid" style="padding-right: 40px;">
                                        <button type="button" id="clearOrtuTanggalLahir" class="HapusBar">
                                            <i class='bx bx-x'></i>
                                        </button>
                                    </div>
                                    @error('ortu_tanggal_lahir')
                                        <span class="error-message">{{ $message }}</span>
                                    @enderror
                                </div>

                                <div class="IsiData">
                                    <label for="ortu_profesi">Profesi Wali Murid:</label>
                                    <div style="position: relative;">
                                        <input type="text" name="ortu_profesi" id="ortu_profesi" class="TampilanIsiData" placeholder="Profesi wali murid" style="padding-right: 40px;">
                                        <button type="button" id="clearOrtuProfesi" class="HapusBar">
                                            <i class='bx bx-x'></i>
                                        </button>
                                    </div>
                                    @error('ortu_profesi')
                                    <span class="error-message">{{ $message }}</span>
                                    @enderror  
                                </div>
                                
                                <div class="IsiData">
                                    <label for="ortu_pendidikan">Pendidikan terakhir Wali Murid:</label>
                                    <div style="position: relative;">
                                        <input type="text" name="ortu_pendidikan" id="ortu_pendidikan" class="TampilanIsiData" placeholder="Pendidikan terakhir wali murid" style="padding-right: 40px;">
                                        <button type="button" id="clearOrtuPendidikan" class="HapusBar">
                                            <i class='bx bx-x'></i>
                                        </button>
                                    </div>
                                    @error('ortu_pendidikan')
                                    <span class="error-message">{{ $message }}</span>
                                    @enderror  
                                </div>

                                <div class="IsiData">
                                    <label for="ortu_no_telp">No Telp Wali Murid:</label>
                                    <div style="position: relative;">
                                        <input type="text" name="ortu_no_telp" id="ortu_no_telp" class="TampilanIsiData NomorOnly" placeholder="No Telp wali murid" style="padding-right: 40px;">
                                        <button type="button" id="clearOrtuNoTelp" class="HapusBar">
                                            <i class='bx bx-x'></i>
                                        </button>
                                    </div>
                                    @error('ortu_no_telp')
                                        <span class="error-message">{{ $message }}</span>
                                    @enderror 
                                </div>
                                
                                <div class="IsiData">
                                    <label for="ortu_password">Password Wali Murid:</label>
                                    <div style="position: relative;">
                                        <input type="password" name="ortu_password" id="ortu_password" class="TampilanIsiData" placeholder="Password wali murid" style="padding-right: 40px;">
                                        <button type="button" id="clearOrtuPassword" class="HapusBar">
                                            <i class='bx bx-x'></i>
                                        </button>
                                    </div>
                                    @error('ortu_password')
                                    <span class="error-message">{{ $message }}</span>
                                    @enderror
                                </div>
                                </div>
                            </div>

                            <div class="DisplayDataTable" id="FormUntukGuru">
                            <h2>Data Guru</h2>

                                <div class="IsiData">
                                <label for="gelar">Gelar:</label>
                                <div style="position: relative;">
                                    <input type="text" name="gelar" id="gelar" class="TampilanIsiData" placeholder="Masukkan gelar" style="padding-right: 40px;">
                                    <button type="button" id="clearGelar" class="HapusBar">
                                        <i class='bx bx-x'></i>
                                    </button>
                                </div>
                                @error('gelar')
                                    <span class="error-message">{{ $message }}</span>
                                @enderror
                                </div>
                                
                                
                                <div class="IsiData">
                                <label for="nuptk">Masukkan Nomor Unik Pendidik dan Tenaga Kependidikan:</label>
                                <div style="position: relative;">
                                    <input type="text" name="nuptk" id="nuptk" class="TampilanIsiData" placeholder="Masukkan NUPTK" style="padding-right: 40px;">
                                    <button type="button" id="clearNuptk" class="HapusBar">
                                        <i class='bx bx-x'></i>
                                    </button>
                                </div>
                                @error('nuptk')
                                    <span class="error-message">{{ $message }}</span>
                                @enderror
                                </div>
                                
                                <div class="IsiData">
                                <label for="statusMenikah">Status Nikah:</label>
                                <div style="position: relative;">
                                    <select name="statusMenikah" id="statusMenikah" class="TampilanIsiData" style="padding-right: 40px;">
                                        <option value="" disable selected>-- Pilih status nikah --</option>
                                            <option value="Menikah">Menikah</option>
                                            <option value="Belum Menikah">Belum Menikah</option>
                                    </select>
                                    <button type="button" id="clearStatusMenikah" class="HapusBar">
                                        <i class='bx bx-x'></i>
                                    </button>
                                </div>
                                @error('statusMenikah')
                                    <span class="error-message">{{ $message }}</span>
                                @enderror
                                </div>

                                <div class="IsiData">
                                <label for="statusKerja">Status kerja:</label>
                                <div style="position: relative;">
                                    <select name="statusKerja" id="statusKerja" class="TampilanIsiData" style="padding-right: 40px;">
                                        <option value="" disable selected>-- Pilih status kerja --</option>
                                            <option value="Full time">Full time</option>
                                            <option value="Honorer">Honorer</option>
                                    </select>
                                    <button type="button" id="clearStatusKerja" class="HapusBar">
                                        <i class='bx bx-x'></i>
                                    </button>
                                </div>
                                @error('statusKerja')
                                    <span class="error-message">{{ $message }}</span>
                                @enderror
                                </div>
                            </div>

                            <button type="submit" class="TombolOJT TambahRegister">Daftarkan</button>
                        </form>
                    </div>
                </div>
            </div>

            <div class="management-container">
                
                <div class="filter-container">
                    <form method="GET" action="{{ route('admin.ManajemenUser') }}">
                        <label for="role">Filter berdasarkan peran:</label>
                        <select name="role" id="role" onchange="this.form.submit()">
                            <option value="">-- Pilih Role --</option>
                            <option value="admin" {{ request('role') == 'admin' ? 'selected' : '' }}>Admin</option>
                            <option value="guru" {{ request('role') == 'guru' ? 'selected' : '' }}>Guru</option>
                            <option value="murid" {{ request('role') == 'murid' ? 'selected' : '' }}>Murid</option>
                            <option value="orang_tua" {{ request('role') == 'orang_tua' ? 'selected' : '' }}>Orang Tua</option>
                        </select>
                    </form>
                
                    <div class="filter-box-enhanced">
                        <button class="filter-button-enhanced">Filter Tambahan</button>
                    </div>
                    
                    <div class="search-box-enhanced">
                        <input type="text" placeholder="Cari user..." class="search-input-enhanced">
                        <i class='bx bx-search'></i>
                    </div>
                </div>

                @php $role = request('role'); @endphp

                <div class="table-container">
                    @if ($role === 'admin')
                        <h3>Data Admin</h3>
                        
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>Alamat</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($Admins as $Admin)
                                    <tr>
                                        <td>{{ $Admin->profile->name }}</td>
                                        <td>{{ $Admin->profile->email }}</td>
                                        <td>{{ $Admin->profile->alamat }}</td>
                                        <td>
                                            <div class="OptionManajemenTabel">
                                                <a href="{{ route('admin.user.edit', ['id' => $Admin->admin_id, 'role' => 'admin']) }}" class="btn btn-sm btn-warning">
                                                    <i class='bx bx-edit-alt IconForButton'></i>Edit‎ ‎ ‎ ‎ ‎ </a>
                                                <form method="POST" action="{{ route('admin.user.delete', ['id' => $Admin->admin_id, 'role' => 'admin']) }}" style="display:inline-block;">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button class="btn btn-sm btn-danger" onclick="return confirm('Yakin hapus user ini?')">
                                                        <i class='bx bx-trash IconForButton'></i>Hapus</button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    
                    @elseif ($role === 'guru')
                        <h3>Data Guru</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Nuptk</th>
                                    <th>Status Kerja</th>
                                    <th>Email</th>
                                    <th>No telpon</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($Gurus as $guru)
                                    <tr>
                                        <td>{{ $guru->profile->name }} {{ $guru->gelar }}</td>
                                        <td>{{ $guru->nuptk }}</td>
                                        <td>{{ $guru->statusKerja }}</td>
                                        <td>{{ $guru->profile->email }}</td>
                                        <td>{{ $guru->profile->no_telp }}</td>
                                        <td>
                                            <div class="OptionManajemenTabel">
                                                <a href="{{ route('admin.user.edit', ['id' => $guru->guru_id, 'role' => 'guru']) }}" class="btn btn-sm btn-warning">
                                                    <i class='bx bx-edit-alt IconForButton'></i>Edit‎ ‎ ‎ ‎ ‎ </a>
                                                <form method="POST" action="{{ route('admin.user.delete', ['id' => $guru->guru_id, 'role' => 'guru']) }}" style="display:inline-block;">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button class="btn btn-sm btn-danger" onclick="return confirm('Yakin hapus user ini?')">
                                                        <i class='bx bx-trash IconForButton'></i>Hapus</button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>

                    @elseif ($role === 'murid')
                        <h3>Data Murid</h3>
                        <table class="table murid">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>Kelas</th>
                                    <th>Nis</th>
                                    <th>Nisn</th>
                                    <th>Nama orang tua</th>
                                    <th>Asal Sekolah</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($MuridOrangTuas as $MuridOrang_tua)
                                    <tr>
                                        <td>{{ $MuridOrang_tua->muridKelas->murid->profile->name }}</td>
                                        <td>{{ $MuridOrang_tua->muridKelas->Murid->profile->email }}</td>
                                        <td>{{ $MuridOrang_tua->muridKelas->kelasTahun->kelas->nama_kelas }}</td>
                                        <td>{{ $MuridOrang_tua->muridKelas->Murid->nis }}</td>
                                        <td>{{ $MuridOrang_tua->muridKelas->Murid->nisn }}</td>
                                        <td>{{ $MuridOrang_tua->orangTua->profile->name }}</td>
                                        <td>{{ $MuridOrang_tua->muridKelas->Murid->asal_sekolah }}</td>

                                        <td>
                                            <div class="OptionManajemenTabel">
                                                <a href="{{ route('admin.user.edit', ['id' => $MuridOrang_tua->MuridKelas->murid_kelas_id, 'role' => 'murid']) }}" class="btn btn-sm btn-warning">
                                                    <i class='bx bx-edit-alt IconForButton'></i>Edit‎ ‎ ‎ ‎ ‎ </a>
                                                <form method="POST" action="{{ route('admin.user.delete', ['id' => $MuridOrang_tua->Muridkelas->murid_kelas_id, 'role' => 'murid']) }}" style="display:inline-block;">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button class="btn btn-sm btn-danger" onclick="return confirm('Yakin hapus user ini?')">
                                                        <i class='bx bx-trash IconForButton'></i>Hapus</button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>

                    @elseif ($role === 'orang_tua')
                        <h3>Data Orang Tua</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>Nik</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($MuridOrangTuas as $MuridOrang_tua)
                                    <tr>
                                        <td>{{ $MuridOrang_tua->orangTua->profile->name }}</td>
                                        <td>{{ $MuridOrang_tua->orangTua->profile->email }}</td>
                                        <td>{{ $MuridOrang_tua->orangTua->profile->nik }}</td>
                                        <td>
                                            <div class="OptionManajemenTabel">
                                                <a href="{{ route('admin.user.edit', ['id' => $MuridOrang_tua->orangTua->orang_tua_id, 'role' => 'orang_tua']) }}" class="btn btn-sm btn-warning">
                                                    <i class='bx bx-edit-alt IconForButton'></i>Edit‎ ‎ ‎ ‎ ‎ </a>
                                                <form method="POST" action="{{ route('admin.user.delete', ['id' => $MuridOrang_tua->orangTua->orang_tua_id, 'role' => 'orang_tua']) }}" style="display:inline-block;">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button class="btn btn-sm btn-danger" onclick="return confirm('Yakin hapus user ini?')">
                                                        <i class='bx bx-trash IconForButton'></i>Hapus</button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>

                    @else
                        <p>Silakan pilih peran untuk menampilkan data user tertentu.</p>
                    @endif
                </div>
            </div>
        </div>
    </div>

    @else
      <p>Anda tidak memiliki akses ke halaman ini</p>
      <a href="/login">Login kembali disini</a>
    @endif
</body>

<script src="{{ asset('js/CssAdmin.js') }}"></script>


{{-- 
@include('admin.partials.header', ['NamaPage' => 'Manajemen Post'])
@include('admin.partials.sidebar')
<link rel="stylesheet" href="{{ asset('css/AdminCSS/ManajemenPost.css') }}">
<link rel="stylesheet" href="{{ asset('css/AdminCSS/NewPost.css') }}">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
@livewireStyles

<div class="ContainerPostManagement">
    <h1>Manajemen Post</h1>

    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <div class="filter-container">
        <form method="GET" action="{{ route('admin.manajemenPost') }}">
            <label for="TipePost">Filter berdasarkan:</label>
            <select name="TipePost" id="TipePost" class="filter-select" onchange="this.form.submit()">
                <option value="" {{ request('TipePost') == '' ? 'selected' : '' }}>-- Pilih Tipe Post --</option>
                <option value="pengumuman" {{ request('TipePost') == 'pengumuman' ? 'selected' : '' }}>Pengumuman</option>
                <option value="kegiatan" {{ request('TipePost') == 'kegiatan' ? 'selected' : '' }}>Kegiatan</option>
                <option value="buat_baru" {{ request('TipePost') == 'buat_baru' ? 'selected' : '' }}>Buat Postingan Baru</option>
            </select>
        </form>
    </div>

    @php $TipePost = request('TipePost'); @endphp

    <div class="table-container">
        @if ($TipePost === 'pengumuman')
            @livewire('pengumuman-list')
        @elseif ($TipePost === 'kegiatan')
            @livewire('kegiatan-list')
        @elseif ($TipePost === 'buat_baru')
            @livewire('post-form')
        @else
            <div class="no-preview-message">
                <p>Silakan pilih tipe post untuk menampilkan data atau membuat postingan baru.</p>
            </div>
        @endif
    </div>
</div>

@livewireScripts
<script src="{{ asset('js/CssAdmin.js') }}"></script> --}}