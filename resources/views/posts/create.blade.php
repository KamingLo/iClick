@extends('layouts.app')

@section('content')
<div class="container">
    <form action="{{ route('posts.store') }}" method="POST">
        @csrf
        <div class="form-group">
            <label for="tipe_postingan">Tipe Postingan</label>
            <select name="tipe_postingan" class="form-control" required>
                <option value="pengumuman">Pengumuman</option>
                <option value="kegiatan">Kegiatan</option>
            </select>
        </div>

        <div class="form-group">
            <label for="tujuan_postingan">Tujuan Postingan</label>
            <input type="text" name="tujuan_postingan" class="form-control" required>
        </div>

        <div class="form-group">
            <label for="judul_postingan">Judul Postingan</label>
            <input type="text" name="judul_postingan" class="form-control" required>
        </div>

        <div class="form-group">
            <label for="content">Isi Postingan</label>
            <x-trix-editor id="content" name="content" />
        </div>

        <button type="submit" class="btn btn-primary">Simpan</button>
    </form>
</div>
@endsection