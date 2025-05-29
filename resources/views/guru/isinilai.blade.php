@include('guru.partials.header', ['NamaPage' => 'Jadwal Mengajar Anda'])
@include('guru.partials.sidebar')

    @livewireScripts
    @livewire('guru.nilai-murid')

    @livewireStyles
