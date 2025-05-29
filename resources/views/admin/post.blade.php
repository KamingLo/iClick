@include('admin.partials.header', ['NamaPage' => 'Halaman Utama'])
@include('admin.partials.sidebar')
<link rel="stylesheet" href="{{ asset('css/AdminCSS/NewPost.css') }}">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">

<div class="ContainerNewPost">
    <h1>Postingan Baru</h1>

    <div class="LayoutNewPost">
        <h2>Buat Postingan</h2>

        <div class="ContainerDalam">
            <div class="FormKiri">
                <form action="{{ route('admin.posting') }}" method="POST" enctype="multipart/form-data">
                    @csrf

                    <div class="IsiData">
                        <label class="NamaLabelBar">Tipe Postingan</label><br>
                        <input type="radio" id="announcement" name="tipe" value="pengumuman" checked>
                        <label for="announcement">Pengumuman</label>

                        <input type="radio" id="event" name="tipe" value="kegiatan">
                        <label for="event">Kegiatan</label>
                    </div>

                    <div class="IsiData">
                        <label for="judul" class="NamaLabelBar">Judul</label>
                        <input class="TampilanIsiData" type="text" id="judul" name="judul" required>
                    </div>

                    <div class="IsiData">
                        <label for="isi" class="NamaLabelBar">Isi</label>
                        <textarea class="TampilanIsiData" id="isi" name="isi" rows="6" required></textarea>
                    </div>

                    <div class="IsiData">
                        <label for="lampiran" class="NamaLabelBar">Foto Kegiatan</label>
                        <div class="UploadFoto">
                            <input type="file" class="TampilanIsiData" id="lampiran" name="lampiran" accept="image/*">
                            <div class="TombolUploadFoto">
                                <span class="DeskripsiBarUpload" id="FileNamaFoto">Pilih file</span>
                                <button type="button" class="BrowseFoto">Browse</button>
                            </div>
                        </div>
                        <div class="FileNamaFoto"></div>
                    </div>

                    <div class="InfoSubmit">
                        <button type="submit" class="TombolOJT TombolPosting">Posting</button>

                        @if(session('success'))
                            <div class="UiPsnDis PsnBerhasil">
                                {{ session('success') }}
                            </div>
                        @endif
                        
                        @if ($errors->has('lampiran'))
                            <div class="UiPsnDis PsnError mt-3">
                                {{ $errors->first('lampiran') }}
                            </div>
                        @endif
                    </div>    
                </form>
            </div>
            
            <div class="FormKanan">
                <div class="PreviewFotoHeader">
                    <div class="PreviewJudulFoto">Preview Foto</div>
                    <div class="PreviewDeskripsiFoto">Pratinjau foto yang akan diunggah</div>
                    <button id="MenutupPreview" class="TombolOJT ClosePreview">
                        <i class='bx bx-x' ></i>
                    </button>
                </div>
                <div id="PreviewLayoutFoto" class="PreviewLayoutFoto">
                    <img id="PreviewFoto" class="PreviewFoto" src="" alt="Preview foto">
                    <p id="NamaFileFoto" class="NamaFileFoto"></p>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/CssAdmin.js') }}"></script>