@include('admin.partials.header', ['NamaPage' => 'Halaman Utama'])
@include('admin.partials.sidebar')
<link rel="stylesheet" href="{{ asset('css/AdminCSS/ManajemenPostEdit.css') }}">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">

<link rel="stylesheet" href="{{ asset('css/postManagement.css') }}">

<div class="ContainerPostManagement">
    <h1>Edit Kegiatan</h1>

    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    @if($errors->any())
        <div class="alert alert-danger">
            <ul style="margin: 0; padding-left: 15px;">
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <div class="edit-container">
        <div class="form-container">
            <div class="form-col">
                <form action="{{ route('edit.kegiatan', ['id' => $kegiatan->kegiatan_id]) }}" method="POST" enctype="multipart/form-data" id="editForm">
                    @csrf
                    <div class="mb-3">
                        <label for="judul" class="form-label">Judul</label>
                        <input type="text" class="form-control" id="judul" name="judul" required
                            value="{{ old('judul', $kegiatan->judul_kegiatan) }}" oninput="updatePreview()">
                    </div>

                    <div class="mb-3">
                        <label for="isi" class="form-label">Isi</label>
                        <textarea class="form-control" id="isi" name="isi" rows="4" required oninput="updatePreview()">{{ old('isi', $kegiatan->isi_kegiatan) }}</textarea>
                    </div>

                    <div class="mb-3">
                        <label for="lampiran" class="form-label">Foto/Lampiran (Opsional)</label>
                        <input type="file" class="form-control" id="lampiran" name="lampiran" onchange="previewImage(this)">
                        @if ($kegiatan->lampiran)
                            <p class="mt-2">Lampiran saat ini:
                                <a href="{{ asset('storage/' . $kegiatan->lampiran) }}" target="_blank">Lihat lampiran</a>
                            </p>
                        @endif
                    </div>

                    <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
                    <a href="{{ route('admin.manajemenPost') }}" class="btn btn-danger">Batal</a>
                </form>
            </div>
            
            <div class="preview-container" id="previewContainer">
                <div class="preview-header">
                    <h3 class="preview-title">Preview Pengumuman</h3>
                </div>
                <div class="preview-title" id="previewTitle">
                    {{ old('judul', $kegiatan->judul_kegiatan) }}
                </div>
                <div class="preview-content" id="previewContent">
                    {{ old('isi', $kegiatan->isi_kegiatan) }}
                </div>
                <div id="imagePreviewContainer">
                    <img id="imagePreview" class="preview-image" alt="Preview Gambar">
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    function updatePreview() {
        const title = document.getElementById('judul').value;
        const content = document.getElementById('isi').value;
        const previewContainer = document.getElementById('previewContainer');
        
        document.getElementById('previewTitle').innerText = title;
        document.getElementById('previewContent').innerText = content;
        
        const hasImage = document.getElementById('imagePreview').src && 
                         document.getElementById('imagePreview').src !== window.location.href;
                         
        if (title || content || hasImage) {
            previewContainer.classList.add('has-content');
        } else {
            previewContainer.classList.remove('has-content');
        }
    }
    
    function previewImage(input) {
        const imagePreviewContainer = document.getElementById('imagePreviewContainer');
        const imagePreview = document.getElementById('imagePreview');
        const previewContainer = document.getElementById('previewContainer');
        
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreviewContainer.style.display = 'block';
                previewContainer.classList.add('has-content');
            }
            
            reader.readAsDataURL(input.files[0]);
        } else {
            const currentImage = '{{ $kegiatan->lampiran ? asset("storage/" . $kegiatan->lampiran) : "" }}';
            if (!currentImage) {
                imagePreviewContainer.style.display = 'none';
            }
        }
        
        updatePreview();
    }
    
    function initializeImagePreview() {
        const imagePreviewContainer = document.getElementById('imagePreviewContainer');
        const imagePreview = document.getElementById('imagePreview');
        const currentImage = '{{ $kegiatan->lampiran ? asset("storage/" . $kegiatan->lampiran) : "" }}';
        
        if (currentImage) {
            imagePreview.src = currentImage;
            imagePreviewContainer.style.display = 'block';
        } else {
            imagePreviewContainer.style.display = 'none';
        }
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        initializeImagePreview();
        updatePreview();
    });
</script>