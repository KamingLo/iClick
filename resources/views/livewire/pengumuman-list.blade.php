<div>
    <h2>Daftar Pengumuman</h2>
    
    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif
    
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
                        <div class="mini-post-body">{{ Str::limit($pengumuman->isi_pengumuman, 150) }}</div>
                    </div>
                    <div class="mini-post-actions">
                        <div class="post-action-icons">
                            <span>‎ </span>
                            <span>‎ </span>
                            <span>‎ </span>
                        </div>
                        <div class="post-preview-buttons">
                            @if($pengumuman && $pengumuman->id)
                                <a href="{{ route('pengumuman.update', ['id' => $pengumuman->id]) }}" class="btn btn-primary">Edit</a>
                                <button wire:click="delete({{ $pengumuman->id }})" 
                                        class="btn btn-danger" 
                                        onclick="return confirm('Yakin ingin menghapus pengumuman ini?')">Hapus</button>
                            @else
                                <span class="text-danger">Invalid pengumuman ID</span>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
    
    <div class="pagination-container">
        {{ $pengumumans->links() }}
    </div>
</div>