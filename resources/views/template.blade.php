@include('partials.header', ['NamaPage' => 'Halaman Utama', 'isiPage' => 'Jangan lupa ganti'])

@if (session('role') == 'admin')
    <p>Selamat datang, Guru!</p>
    
@elseif (session('role') == 'guru')
    <p>Kamu belum login</p>
    <a href="/login">Login kembali disini</a>>
@endif

@include('partials.footer')