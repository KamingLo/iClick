<div>
    <div class="LayoutNewPost">
        <h2>Buat Postingan</h2>

        <div class="ContainerDalam">
            <div class="FormKiri">
                <form wire:submit.prevent="submit">
                    <div class="IsiData">
                        <label class="NamaLabelBar">Tipe Postingan</label><br>
                        <input type="radio" id="announcement" wire:model="tipe" value="pengumuman">
                        <label for="announcement">Pengumuman</label>

                        <input type="radio" id="event" wire:model="tipe" value="kegiatan">
                        <label for="event">Kegiatan</label>
                    </div>

                    <div class="IsiData">
                        <label for="judul" class="NamaLabelBar">Judul</label>
                        <input class="TampilanIsiData" type="text" id="judul" wire:model="judul" required>
                        @error('judul') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>

                    <div class="IsiData">
                        <label for="isi" class="NamaLabelBar">Isi</label>
                        <textarea class="TampilanIsiData" id="isi" wire:model="isi" rows="6" required></textarea>
                        @error('isi') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>

                    <div class="IsiData">
                        <label for="lampiran" class="NamaLabelBar">Foto Kegiatan</label>
                        <div class="UploadFoto">
                            <input type="file" class="TampilanIsiData" id="lampiran" wire:model="lampiran" accept="image/*">
                            <div class="TombolUploadFoto">
                                <span class="DeskripsiBarUpload" id="FileNamaFoto">
                                    {{ $lampiran ? $lampiran->getClientOriginalName() : 'Pilih file' }}
                                </span>
                                <label for="lampiran" class="BrowseFoto">Browse</label>
                            </div>
                        </div>
                        @error('lampiran') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>

                    <div class="InfoSubmit">
                        <button type="submit" class="TombolOJT TombolPosting">Posting</button>

                        @if(session('success'))
                            <div class="UiPsnDis PsnBerhasil">
                                {{ session('success') }}
                            </div>
                        @endif
                    </div>    
                </form>
            </div>
            
            <div class="FormKanan">
                <div class="PreviewFotoHeader">
                    <div class="PreviewJudulFoto">Preview Foto</div>
                    <div class="PreviewDeskripsiFoto">Pratinjau foto yang akan diunggah</div>
                    <button type="button" wire:click="$set('tempUrl', null)" class="TombolOJT ClosePreview" {{ !$tempUrl ? 'disabled' : '' }}>
                        <i class='bx bx-x'></i>
                    </button>
                </div>
                <div id="PreviewLayoutFoto" class="PreviewLayoutFoto">
                    @if($tempUrl)
                        <img id="PreviewFoto" class="PreviewFoto" src="{{ $tempUrl }}" alt="Preview foto">
                        <p id="NamaFileFoto" class="NamaFileFoto">{{ $lampiran ? $lampiran->getClientOriginalName() : '' }}</p>
                    @else
                        <div class="no-preview-message">
                            <p>Belum ada foto yang dipilih</p>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/CssAdmin.js') }}"></script>