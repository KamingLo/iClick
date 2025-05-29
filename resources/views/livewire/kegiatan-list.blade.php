<div>
    <h2>Daftar Kegiatan</h2>
    
    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif
    
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
                        <div class="mini-post-body">{{ Str::limit($kegiatan->isi_kegiatan, 150) }}</div>
                    </div>
                    <div class="mini-post-actions">
                        <div class="post-action-icons">
                            <span>‎ </span>
                            <span>‎ </span>
                            <span>‎ </span>
                        </div>
                        <div class="post-preview-buttons">
                            <!-- Try multiple parameter passing formats to identify which works -->
                            <a href="/admin/kegiatan/edit/{{ $kegiatan->id }}" class="btn btn-primary">Edit</a>
                            
                            <!-- Debugging information to check if ID is available -->
                            <span style="display:none;">ID: {{ $kegiatan->id ?? 'No ID' }}</span>
                            
                            <button wire:click="delete({{ $kegiatan->id }})" 
                                    class="btn btn-danger" 
                                    onclick="return confirm('Yakin ingin menghapus kegiatan ini?')">Hapus</button>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
    
    <div class="pagination-container">
        {{ $kegiatans->links() }}
    </div>
</div>