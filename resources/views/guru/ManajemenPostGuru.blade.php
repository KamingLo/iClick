@include('guru.partials.header', ['NamaPage' => 'Halaman Utama'])
@include('guru.partials.sidebar')
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/trix/1.3.1/trix.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/trix/1.3.1/trix.js"></script>
<link rel="stylesheet" href="{{ asset('css/AdminCSS/NewPost.css') }}" />
<link rel="stylesheet" href="{{ asset('css/AdminCSS/ManajemenPost.css') }}" />
<script src="{{ asset('js/CssAdmin.js') }}"></script>

<body>
    <div class="ContainerPostManagement">
        <h1>Manajemen Post</h1>

        @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        <div class="alert alert-success" style="display: none;" id="successAlert">
            Postingan berhasil dibuat!
        </div>

        <div class="filter-container">
            <form method="GET" action="{{ route('admin.manajemenPost') }}">
                <label for="TipePost">Filter berdasarkan peran:</label>
                <select name="TipePost" id="TipePost" class="filter-select" onchange="this.form.submit()">
                    <option value="" {{ request('TipePost') == '' ? 'selected' : '' }}>Postingan Baru</option>
                    <option value="pengumuman" {{ request('TipePost') == 'pengumuman' ? 'selected' : '' }}>Pengumuman</option>
                    <option value="kegiatan" {{ request('TipePost') == 'kegiatan' ? 'selected' : '' }}>Kegiatan</option>
                </select>
            </form>
        </div>

        <div class="table-container">
            <div class="ContainerNewPost" id="tambahPost">
                <div class="LayoutNewPost">
                    <h2>Buat Postingan</h2>
                    
                    <form id="postForm">
                        <div class="ContainerDalam">
                            <div class="FormKiri">
                                <div class="IsiData">
                                    <label for="judul" class="NamaLabelBar">Judul</label>
                                    <input class="TampilanIsiData" type="text" id="judul" name="judul" required>
                                </div>

                                <div class="IsiData">
                                    <div class="JuduldanOpsi">
                                        <div class="UploadFoto">
                                            <label for="lampiran" class="NamaLabelBar">Foto Thumbnail</label>
                                            <input type="file" class="TampilanIsiData" id="lampiran" name="lampiran" accept="image/*">
                                            <div class="TombolUploadFoto">
                                                <span class="DeskripsiBarUpload" id="FileNamaFoto">Pilih file</span>
                                                <button type="button" class="BrowseFoto">Browse</button>
                                            </div>
                                        </div>

                                        <!-- Replace your switch-container div with this structure -->
                                        <div class="switch-container">
                                            <label class="NamaLabelBar">Tipe Postingan</label>
                                            <input type="radio" id="announcement" name="tipe" value="pengumuman" checked>
                                            <input type="radio" id="event" name="tipe" value="kegiatan">
                                            <label class="switch" for="announcement">
                                                <span class="switch-left">Pengumuman</span>
                                                <span class="switch-right">Kegiatan</span>
                                                <span class="switch-button"></span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div class="PreviewContainer" id="previewContainer">
                                        <img id="previewImage" class="PreviewImage" alt="Preview">
                                        <div class="PreviewText" id="previewText">Preview foto akan muncul di sini</div>
                                        <button type="button" class="RemoveImage" id="removeImage">Hapus Foto</button>
                                    </div>
                                </div>
                            </div>

                            <div class="FormKanan">
                                <div class="IsiData">
                                    <label for="isi" class="NamaLabelBar">Isi Konten</label>
                                    <input id="isi" type="hidden" name="isi">
                                    <trix-editor input="isi" placeholder="Tulis konten postingan Anda di sini..."></trix-editor>
                                </div>
                            </div>

                            <div class="InfoSubmit">
                                <button type="submit" class="TombolOJT TombolPosting">Posting</button>
                                <div class="UiPsnDis PsnError" style="display: none;" id="errorMessage">
                                    Terjadi kesalahan!
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            @php $TipePost = request('TipePost'); @endphp
            
            @if ($TipePost === 'pengumuman')
                <h2>Daftar Pengumuman</h2>
                
                <div class="post-preview-container">
                    @foreach($pengumumans as $pengumuman)
                        <div class="mini-post-preview {{ $pengumuman->lampiran ? '' : 'no-image' }}">
                            @if($pengumuman->lampiran)
                                <img src="{{ asset('storage/' . $pengumuman->lampiran) }}" alt="Post Image" class="mini-post-image">
                            @endif
                            <div class="mini-post-content">
                                <div>
                                    <div class="mini-post-header">
                                        <img src="{{ $pengumuman->admin->profile->avatar ?? '/default-avatar.png' }}" 
                                             alt="User Avatar" class="mini-post-avatar">
                                        <div class="mini-post-user">{{ $pengumuman->admin->profile->name }}</div>
                                    </div>
                                    <div class="mini-post-title">{{ $pengumuman->judul_pengumuman }}</div>
                                    <div class="mini-post-body">{{ $pengumuman->isi_pengumuman }}</div>
                                </div>
                                <div class="mini-post-actions">
                                    <div class="post-action-icons">
                                        <span>‎ </span>
                                        <span>‎ </span>
                                        <span>‎ </span>
                                    </div>
                                    <div class="post-preview-buttons">
                                        <form action="{{ route('pengumuman.update', ['id' => $pengumuman->pengumuman_id]) }}" method="GET" style="display:inline;">
                                            <button type="submit" class="btn btn-primary">Edit</button>
                                        </form>
                                        <form action="{{ route('pengumuman.destroy', $pengumuman->pengumuman_id) }}" method="POST" style="display:inline;">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-danger" onclick="return confirm('Yakin ingin menghapus pengumuman ini?')">Hapus</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
                
            @elseif ($TipePost === 'kegiatan')
                <h2>Daftar Kegiatan</h2>
                
                <div class="post-preview-container">
                    @foreach($kegiatans as $kegiatan)
                        <div class="mini-post-preview {{ $kegiatan->lampiran ? '' : 'no-image' }}">
                            @if($kegiatan->lampiran)
                                <img src="{{ asset('storage/' . $kegiatan->lampiran) }}" alt="Post Image" class="mini-post-image">
                            @endif
                            <div class="mini-post-content">
                                <div>
                                    <div class="mini-post-header">
                                        <img src="{{ $kegiatan->admin->profile->avatar ?? '/default-avatar.png' }}" 
                                             alt="User Avatar" class="mini-post-avatar">
                                        <div class="mini-post-user">{{ $kegiatan->admin->profile->name }}</div>
                                    </div>
                                    <div class="mini-post-title">{{ $kegiatan->judul_kegiatan }}</div>
                                    <div class="mini-post-body">{{ $kegiatan->isi_kegiatan }}</div>
                                </div>
                                <div class="mini-post-actions">
                                    <div class="post-action-icons">
                                        <span>‎ </span>
                                        <span>‎ </span>
                                        <span>‎ </span>
                                    </div>
                                    <div class="post-preview-buttons">
                                        <form action="{{ route('kegiatan.update', ['id' => $kegiatan->kegiatan_id]) }}" method="GET" style="display:inline;">
                                            <button type="submit" class="btn btn-primary">Edit</button>
                                        </form>
                                        <form action="{{ route('kegiatan.destroy', $kegiatan->kegiatan_id) }}" method="POST" style="display:inline;">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-danger" onclick="return confirm('Yakin ingin menghapus kegiatan ini?')">Hapus</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
                
            @endif
        </div>
    </div>
</body>