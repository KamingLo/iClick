<link rel="stylesheet" href="{{ asset('css/default/SidebarAdmin.css') }}" />

<body>
  <aside class="ContainerSideBar">
    <div class="ProfileSiUser">
        <div class="HeaderUser">
            <a href="dashboard">
                <img src="/image/logo_pelita.png"/>
            </a>
            <h6 class="ohayo" id="Sapaan">Selamat Pagi</h6>
        </div>

        <h6 class="UseridName">{{ $guru->profile->name }}</h6>
        {{-- <h6 class="UseridName">No Reason</h6> --}}

    </div>

    <ul class="ListSideBar">

        <span>‎</span> {{-- ‎ ni buat teks kosong --}}

      <li>
        <a href="dashboard" class="{{ request()->is('guru/dashboard*') ? 'active-link' : '' }}">
          <i class='bx bx-home-alt IconSidebar'></i>Halaman Utama
        </a>
      </li>

      <h4>
        <span>Guru Tools</span>
      </h4>

      <li>
        <a href="jadwal" class="{{ request()->is('jadwal*') ? 'active-link' : '' }}">
          <i class='bx bx-table IconSidebar'></i>Liat Jadwal Pelajaran
        </a>
      </li>
      
      <li>
        <a href="jadwalanda" class="{{ request()->is('livewire/guru/tampilkan-jadwal-anda*') ? 'active-link' : '' }}">
          <i class='bx bx-table IconSidebar'></i>Liat Jadwal Ajar Anda
        </a>
      </li>
      <li>
        <a href="buatpengumuman">
          <i class='bx bx-home-alt IconSidebar'></i>Buat Pengumuman kelas
        </a>
      </li>
      <li>
        <a href="menu-nilai">
          <i class="bx bx-home-alt IconSidebar"></i>Menu nilai
        </a>
      </li>
      <li>
        <a href="/guru/ManajemenPostGuru" class="{{ request()->is('guru/ManajemenPostGuru*') ? 'active-link' : '' }}">
          <i class='bx bx-message-square-edit IconSideBar'></i>Manajemen postingan
        </a>
      </li>
    </ul>

    
    <div class="logout-container">
        <form action="{{ route('logout') }}" method="POST">
            @csrf
            <button type="submit" class="logout-button">
                <i class='bx bx-log-out IconSideBar'></i>
                <span>Logout</span>
            </button>
        </form>
    </div>
  </aside>

<script src="{{ asset('js/dashboard.js') }}"></script>