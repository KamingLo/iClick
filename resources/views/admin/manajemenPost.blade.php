@include('admin.partials.header', ['NamaPage' => 'Halaman Utama'])
@include('admin.partials.sidebar')
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/trix/1.3.1/trix.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/trix/1.3.1/trix.js"></script>
<link rel="stylesheet" href="{{ asset('css/AdminCSS/NewPost.css') }}" />
<link rel="stylesheet" href="{{ asset('css/AdminCSS/ManajemenPost.css') }}" />
<script src="{{ asset('js/CssAdmin.js') }}"></script>

<body>
    <style>
        body {
            overflow: visible;
        }
    </style>
    <div class="ContainerPostManagement">
        <h1>Manajemen Post</h1>

        @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        @if($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="alert alert-success" style="display: none;" id="successAlert">
            Postingan berhasil dibuat!
        </div>

        <div class="filter-container">
            <form method="GET" action="{{ route('admin.manajemenPost') }}">
                <label for="TipePost">Filter berdasarkan tipe:</label>
                <select name="TipePost" id="TipePost" class="filter-select">
                    <option value="" {{ request('TipePost') == '' ? 'selected' : '' }}>Postingan Baru</option>
                    <option value="pengumuman" {{ request('TipePost') == 'pengumuman' ? 'selected' : '' }}>Pengumuman</option>
                    <option value="blog" {{ request('TipePost') == 'blog' ? 'selected' : '' }}>Blog</option>
                </select>
            </form>
        </div>

        <div class="table-container">
            <!-- Postingan Baru Section -->
            <div class="ContainerNewPost" id="tambahPost">
                <div class="LayoutNewPost">
                    <h2>Buat Postingan</h2>
                    
                    <form id="postForm" action="{{ route('admin.post.tambah') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <div class="ContainerDalam">
                            <div class="FormKiri">
                                <div class="IsiData">
                                    <label for="judul" class="NamaLabelBar">Judul</label>
                                    <input class="TampilanIsiData" type="text" id="judul" name="judul" value="{{ old('judul') }}" placeholder="Isi judul postingan" required>
                                    @error('judul')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
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
                                            @error('lampiran')
                                                <span class="text-danger">{{ $message }}</span>
                                            @enderror
                                        </div>

                                        <div class="switch-container">
                                            <label class="NamaLabelBar">Tipe Postingan</label>
                                            <input type="radio" id="pengumuman" name="tipe" value="pengumuman" {{ old('tipe', 'pengumuman') == 'pengumuman' ? 'checked' : '' }}>
                                            <input type="radio" id="blog" name="tipe" value="blog" {{ old('tipe') == 'blog' ? 'checked' : '' }}>
                                            {{-- Remove the 'for="pengumuman"' attribute from the label below --}}
                                            <label class="switch" for="pengumuman">
                                                <span class="switch-left">Pengumuman</span>
                                                <span class="switch-right">Blog</span>
                                                <span class="switch-button"></span>
                                            </label>
                                            @error('tipe')
                                                <span class="text-danger">{{ $message }}</span>
                                            @enderror
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
                                    <input id="isi" type="hidden" name="isi" value="{{ old('isi') }}">
                                    <trix-editor input="isi" placeholder="Tulis konten postingan Anda di sini..."></trix-editor>
                                    @error('isi')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
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

            <!-- Pengumuman Section -->
            <div id="pengumumanList" style="display: none;">
                <h2>Daftar Pengumuman</h2>
                
                <div class="post-preview-container">
                    @if(isset($pengumumans) && $pengumumans->isNotEmpty())
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
                                        <div class="mini-post-title">{{ $pengumuman->judul }}</div>
                                        <div class="mini-post-body">{!! $pengumuman->isi !!}</div>
                                    </div>
                                    <div class="mini-post-actions">
                                        <div class="post-action-icons">
                                            <span>‎ </span>
                                            <span>‎ </span>
                                            <span>‎ </span>
                                        </div>
                                        <div class="post-preview-buttons">
                                            <form action="{{ route('admin.post.edit', ['id' => $pengumuman->postingan_id]) }}" method="GET" style="display:inline;">
                                                <button type="submit" class="btn btn-primary">Edit</button>
                                            </form>
                                            <form action="{{ route('admin.post.hapus', ['id' => $pengumuman->postingan_id]) }}" method="POST" style="display:inline;">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-danger">Hapus</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    @else
                        <p>Tidak ada pengumuman tersedia.</p>
                    @endif
                </div>
            </div>
                
            <!-- Blog Section -->
            <div id="blogList" style="display: none;">
                <h2>Daftar Blog</h2>
                
                <div class="post-preview-container">
                    @if(isset($blogs) && $blogs->isNotEmpty())
                        @foreach($blogs as $blog)
                            <div class="mini-post-preview {{ $blog->lampiran ? '' : 'no-image' }}">
                                @if($blog->lampiran)
                                    <img src="{{ asset('storage/' . $blog->lampiran) }}" alt="Post Image" class="mini-post-image">
                                @endif
                                <div class="mini-post-content">
                                    <div>
                                        <div class="mini-post-header">
                                            <img src="{{ $blog->admin->profile->avatar ?? '/default-avatar.png' }}" 
                                                 alt="User Avatar" class="mini-post-avatar">
                                            <div class="mini-post-user">{{ $blog->admin->profile->name }}</div>
                                        </div>
                                        <div class="mini-post-title">{{ $blog->judul }}</div>
                                        <div class="mini-post-body">{!! $blog->isi !!}</div>
                                    </div>
                                    <div class="mini-post-actions">
                                        <div class="post-action-icons">
                                            <span>‎ </span>
                                            <span>‎ </span>
                                            <span>‎ </span>
                                        </div>
                                        <div class="post-preview-buttons">
                                            <form action="{{ route('admin.post.edit', ['id' => $blog->postingan_id]) }}" method="GET" style="display:inline;">
                                                <button type="submit" class="btn btn-primary">Edit</button>
                                            </form>
                                            <form action="{{ route('admin.post.hapus', ['id' => $blog->postingan_id]) }}" method="POST" style="display:inline;">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-danger">Hapus</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    @else
                        <p>Tidak ada blog tersedia.</p>
                    @endif
                </div>
            </div>
        </div>
    </div>
</body>