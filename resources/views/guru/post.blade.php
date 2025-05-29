<div class="container">
    <h1>Buat Postingan</h1>
    <form method="POST" action="{{ route('guru.store-post') }}">
        @csrf
        <div class="mb-3">
            <label for="title" class="form-label">Judul</label>
            <input type="text" class="form-control" id="title" name="title" required>
        </div>
        <div class="mb-3">
            <label for="content" class="form-label">Konten</label>
            <x-trix-editor id="content" name="content" />
        </div>
        <button type="submit" class="btn btn-primary">Simpan</button>
    </form>
</div>