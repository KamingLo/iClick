
@include('partials.header', ['NamaPage' => 'Halaman Post'])
<link rel="stylesheet" href="{{ asset('css/bombaclat.css') }}" />

@foreach ( $kegiatans as $kegiatan )
        <div class="news-preview-card">
            <div class="preview-image"> 
                <img src="{{asset('storage/' . $kegiatan->lampiran) }}">
            </div>

            <div class="preview-content">
                <h2 class="preview-title">{{ $kegiatan->judul_kegiatan }}</h2>
                <div class="preview-meta">
                    <div class="preview-author">
                        <div class="author-icons"></div>
                        <span>{{$kegiatan->admin->profile->name }}• <span class="preview-date">{{ $kegiatan->created_at }}</span></span>
                    </div>
                    <a href="post/{{ $kegiatan->kegiatan_id }}" class="preview-button">Lebih Lanjut</a>
                </div>
            </div>
        </div>
    </div>
    
@endforeach
