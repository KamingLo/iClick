<link rel="stylesheet" href="{{ asset('css/default/SidebarAdmin.css') }}" />
<body>
  <aside class="ContainerSideBar">
    <div class="ProfileSiUser">
        <div class="HeaderUser">
            <a href="/admin/dashboard">
                <img src="/image/logo_pelita.png"/>
            </a>
            <h6 class="ohayo" id="Sapaan">Selamat Pagi</h6>
        </div>

        <h6 class="UseridName">{{ $admin->profile->name }}</h6>
         
    </div>

    <ul class="ListSideBar">

      <li>
        <a href="/admin/dashboard" class="{{ request()->is('admin/dashboard*') ? 'active-link' : '' }}">
          <i class='bx bx-home-alt IconSidebar'></i>Halaman Utama
        </a>
      </li>

      <h4>
        <span>Admin Tools</span>
      </h4>

      {{-- <li>
        <a href="/admin/register" class="{{ request()->is('admin/register*') ? 'active-link' : '' }}">
          <i class='bx bx-user-plus IconSidebar'></i>Daftar User Baru
        </a>
      </li> --}}
      <li>
        <a href="/admin/pelajaran" class="{{ request()->is('admin/pelajaran*') ? 'active-link' : '' }}">
          <i class='bx bx-list-plus IconSideBar'></i>Tambah Pelajaran
        </a>
      </li>
      <li>
        <a href="/admin/jadwal" class="{{ request()->is('admin/jadwal*') ? 'active-link' : '' }}">
          <i class='bx bx-layer-plus IconSideBar'></i>Tambahkan Jadwal
        </a>
      </li>
      {{-- <li>
        <a href="/admin/post" class="{{ request()->is('admin/post*') ? 'active-link' : '' }}">
          <i class='bx bx-message-square-add IconSideBar'></i>Tambah posting
        </a>
      </li> --}}
        {{-- <li>
        <a href="/admin/kenaikanKelas" class="{{ request()->is('admin/kenaikanKelas*') ? 'active-link' : '' }}">
          <i class='bx bx-chevrons-up IconSideBar'></i>Kenaikan Kelas
        </a>
      </li> --}}
        <li>
        <a href="/admin/manajemenKelas" class="{{ request()->is('admin/manajemenKelas*') ? 'active-link' : '' }}">
          <i class='bx bx-category-alt IconSideBar'></i>Manajemen Kelas
        </a>
      </li>
      <li>
        <a href="/admin/manajemenUser" class="{{ request()->is(['admin/manajemenUser*', 'admin/user*']) ? 'active-link' : '' }}">
          <i class='bx bx-user IconSideBar' ></i>Manajemen User
        </a>
      </li>
      <li>
        <a href="/admin/manajemenPost" class="{{ request()->is('admin/manajemenPost*') ? 'active-link' : '' }}">
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
</body>

<script src="{{ asset('js/dashboard.js') }}"></script>