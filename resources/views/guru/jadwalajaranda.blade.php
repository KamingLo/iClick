@include('guru.partials.header', ['NamaPage' => 'Jadwal Mengajar Anda'])
@include('guru.partials.sidebar')

<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">


<div class="container">
    {{-- <h1>Jadwal Pelajaran Semua Guru</h1> --}}

    
    @livewireScripts
    @livewire('guru.tampilkan-jadwal-anda')

    @livewireStyles

</div>