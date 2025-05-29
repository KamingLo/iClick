@include('partials.header', ['NamaPage' => 'Halaman Utama'])

<link rel="stylesheet" href="{{ asset('css/welcome.css') }}" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.1.0/css/boxicons.min.css" />

<section class="hero-section">
    <div class="hero-container">
        <div class="hero-image-container">
            <img src="/image/imageSekolah.png" alt="SMK Pelita IV Building" class="hero-image">
            <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
            <h1 data-aos="fade-up" data-aos-delay="100">Selamat Datang di SMK Pelita IV Jakarta</h1>
            <p data-aos="fade-up" data-aos-delay="200">Membangun Generasi Unggul, Berkarakter, dan Siap untuk Masa Depan</p>
            <a href="#main-content" class="hero-btn" data-aos="fade-up" data-aos-delay="300">
                Get Started
                <i class='bx bx-chevron-down'></i>
            </a>
        </div>
    </div>
</section>

<div id="main-content" class="main-content-container">
    <section class="wepelita-section">
        <div class="section-title" data-aos="fade-up">
            <h2>Aplikasi WePelita</h2>
            <p>Sistem Informasi Terintegrasi untuk Ekosistem Sekolah</p>
        </div>
        
        <div class="ContainerWelcomePage">
            <div class="LayoutWePelita">
                <div class="Layout Murid" data-aos="fade-up" data-aos-delay="100">
                    <div class="IsiDalemanLayout">
                        <img src="/image/WePelitaMurid.png">
                    </div>
                    <div class="details">
                        <h3>WePelita Murid</h3>
                        <p>Klik Disini Untuk Siswa/Siswi</p>
                    </div>
                </div>

                <div class="Layout Guru" data-aos="fade-up" data-aos-delay="200">
                    <div class="IsiDalemanLayout">
                        <img src="/image/WePelitaGuru.png">
                    </div>
                    <div class="details">
                        <h3>WePelita Guru</h3>
                        <p>Klik Disini Untuk Para Guru</p>
                    </div>
                </div>

                <div class="Layout Orangtua" data-aos="fade-up" data-aos-delay="300">
                    <div class="IsiDalemanLayout">
                        <img src="" alt="Soon">
                    </div>
                    <div class="details">
                        <h3>WePelita OrangTua</h3>
                        <p>Klik Disini Untuk Para Orangtua Murid</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="kepala-sekolah-section">
        <div class="section-title" data-aos="fade-up">
            <h2>Sambutan Kepala Sekolah</h2>
        </div>
        <div class="kepala-sekolah-container">
            <div class="kepala-sekolah-image" data-aos="fade-right">
                <img src="/image/KepalaSekolah1.png" alt="Kepala Sekolah SMK Pelita IV">
            </div>
            <div class="kepala-sekolah-content" data-aos="fade-left">
                <h3>Sigit.</h3>
                <p class="kepala-title">Kepala SMK Pelita IV Jakarta</p>
                <div class="divider"></div>
                <p>Assalamualaikum Wr. Wb.</p>
                <p>Selamat datang di website resmi SMK Pelita IV Jakarta. Sebagai lembaga pendidikan kejuruan, kami berkomitmen untuk menyiapkan generasi muda yang unggul dalam keterampilan, berkarakter, dan siap menghadapi tantangan masa depan.</p>
                <p>Dengan dukungan tenaga pendidik yang profesional dan fasilitas yang memadai, kami yakin dapat mencetak lulusan yang kompeten sesuai dengan kebutuhan dunia kerja.</p>
                <p>Mari bersama-sama kita wujudkan SMK Pelita IV Jakarta menjadi sekolah kejuruan terbaik yang menghasilkan SDM berkualitas dan berdaya saing tinggi.</p>
                <p>Wassalamualaikum Wr. Wb.</p>
            </div>
        </div>
    </section>

    <section class="profile-section">
        <div class="section-title" data-aos="fade-up">
            <h2>Profile SMK Pelita IV</h2>
        </div>
        <div class="profile-container">
            <div class="profile-content" data-aos="fade-right">
                <p>SMK Pelita IV Jakarta berdiri sejak tahun 1987 dan telah mencetak ribuan lulusan berkualitas yang tersebar di berbagai bidang pekerjaan. Berlokasi strategis di Jl. Duri Utara No.23-29, Jakarta Barat, sekolah kami dilengkapi dengan fasilitas modern yang mendukung proses pembelajaran.</p>
                <p>Dengan akreditasi A, SMK Pelita IV Jakarta terus berinovasi dalam mengembangkan kurikulum yang sesuai dengan perkembangan teknologi dan kebutuhan industri. Kami juga menjalin kerja sama dengan berbagai perusahaan untuk program prakerin dan penempatan kerja lulusan.</p>
                <div class="profile-stats">
                    <div class="stat-item" data-aos="zoom-in" data-aos-delay="100">
                        <div class="stat-number">35+</div>
                        <div class="stat-label">Tahun Pengalaman</div>
                    </div>
                    <div class="stat-item" data-aos="zoom-in" data-aos-delay="200">
                        <div class="stat-number">500+</div>
                        <div class="stat-label">Siswa Aktif</div>
                    </div>
                    <div class="stat-item" data-aos="zoom-in" data-aos-delay="300">
                        <div class="stat-number">50+</div>
                        <div class="stat-label">Tenaga Pendidik</div>
                    </div>
                    <div class="stat-item" data-aos="zoom-in" data-aos-delay="400">
                        <div class="stat-number">100+</div>
                        <div class="stat-label">Mitra Industri</div>
                    </div>
                </div>
            </div>
            <div class="video-container">
                <video id="introVideo" autoplay muted style="pointer-events: none;">
                    <source src="{{ asset('image/logo_pelita2.mp4') }}" type="video/mp4">
                    Browser Anda tidak mendukung tag video.
                </video>
            </div>
    </section>

    <section class="program-keahlian-section">
        <div class="section-title" data-aos="fade-up">
            <h2>Program Keahlian</h2>
            <p>Pilihan Jurusan untuk Masa Depanmu</p>
        </div>
        <div class="program-container">
            <div class="program-card" data-aos="flip-left" data-aos-delay="100">
                <div class="program-image">
                    <img src="/image/tkj.jpg" alt="Teknik Komputer dan Jaringan">
                    <div class="program-overlay"></div>
                </div>
                <div class="program-content">
                    <h3>Desain Komunikasi Visual</h3>
                    <p>Program keahlian yang mempelajari tentang perakitan komputer, instalasi jaringan, dan pemrograman dasar.</p>
                    <a href="#" class="program-btn">Pelajari Lebih Lanjut</a>
                </div>
            </div>
            
            <div class="program-card" data-aos="flip-left" data-aos-delay="200">
                <div class="program-image">
                    <img src="/image/akuntansi.jpg" alt="Akuntansi">
                    <div class="program-overlay"></div>
                </div>
                <div class="program-content">
                    <h3>Akuntansi</h3>
                    <p>Program keahlian yang mempelajari tentang pencatatan, pengikhtisaran, dan pelaporan keuangan.</p>
                    <a href="#" class="program-btn">Pelajari Lebih Lanjut</a>
                </div>
            </div>
            
            <div class="program-card" data-aos="flip-left" data-aos-delay="300">
                <div class="program-image">
                    <img src="/image/multimedia.jpg" alt="Multimedia">
                    <div class="program-overlay"></div>
                </div>
                <div class="program-content">
                    <h3>OTKP</h3>
                    <p>Program keahlian yang mempelajari tentang desain grafis, animasi, video editing, dan web design.</p>
                    <a href="#" class="program-btn">Pelajari Lebih Lanjut</a>
                </div>
            </div>
        </div>
    </section>

    <section class="visi-misi-section">
        <div class="visi-misi-container">
            <div class="visi-box" data-aos="fade-right">
                <div class="visi-content">
                    <h2>Visi</h2>
                    <p>"Menjadi lembaga pendidikan kejuruan yang unggul, berkarakter, dan menghasilkan lulusan yang kompeten serta mampu bersaing di era global."</p>
                    <div class="visi-icon">
                        <i class='bx bx-bulb'></i>
                    </div>
                </div>
            </div>
            
            <div class="misi-box" data-aos="fade-left">
                <div class="misi-content">
                    <h2>Misi</h2>
                    <ul>
                        <li>Menyelenggarakan pendidikan kejuruan yang berorientasi pada kebutuhan dunia kerja.</li>
                        <li>Mengembangkan kurikulum berbasis kompetensi dan karakter.</li>
                        <li>Meningkatkan kualitas tenaga pendidik dan kependidikan.</li>
                        <li>Menyediakan sarana dan prasarana pembelajaran yang modern.</li>
                        <li>Menjalin kerjasama dengan dunia usaha dan industri.</li>
                    </ul>
                    <div class="misi-icon">
                        <i class='bx bx-target-lock'></i>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="berita-section">
        <div class="section-title" data-aos="fade-up">
            <h2>Berita Terbaru</h2>
            <p>Informasi dan Kegiatan Terkini</p>
        </div>
        <div class="berita-container">
            <div class="berita-card" data-aos="zoom-in" data-aos-delay="100">
                <div class="berita-image">
                    <img src="/image/berita1.jpg" alt="Berita 1">
                    <div class="berita-date">
                        <span class="day">15</span>
                        <span class="month">Mei</span>
                    </div>
                </div>
                <div class="berita-content">
                    <h3>Bulan bahasa 2025</h3>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a href="#" class="berita-btn">Baca Selengkapnya</a>
                </div>
            </div>
            
            <div class="berita-card" data-aos="zoom-in" data-aos-delay="200">
                <div class="berita-image">
                    <img src="/image/berita2.jpg" alt="Berita 2">
                    <div class="berita-date">
                        <span class="day">10</span>
                        <span class="month">Mei</span>
                    </div>
                </div>
                <div class="berita-content">
                    <h3>Test</h3>
                    <p>  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a href="#" class="berita-btn">Baca Selengkapnya</a>
                </div>
            </div>
            
            <div class="berita-card" data-aos="zoom-in" data-aos-delay="100">
                <div class="berita-image">
                    <img src="/image/berita3.jpg" alt="Berita 3">
                    <div class="berita-date">
                        <span class="day">5</span>
                        <span class="month">Mei</span>
                    </div>
                </div>
                <div class="berita-content">
                    <h3>test</h3>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a href="#" class="berita-btn">Baca Selengkapnya</a>
                </div>
            </div>
            
            <div class="berita-card" data-aos="zoom-in" data-aos-delay="200">
                <div class="berita-image">
                    <img src="/image/berita4.jpg" alt="Berita 4">
                    <div class="berita-date">
                        <span class="day">1</span>
                        <span class="month">Mei</span>
                    </div>
                </div>
                <div class="berita-content">
                    <h3>Teesting</h3>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a href="#" class="berita-btn">Baca Selengkapnya</a>
                </div>
            </div>
        </div>
        <div class="berita-more" data-aos="fade-up">
            <a href="/berita" class="more-btn">Lihat Semua Berita</a>
        </div>
    </section>

        {{-- <section class="video-section">
            <div class="video-content">
                <h2 data-aos="fade-up">SMK Pelita IV Jakarta</h2>
                <p data-aos="fade-up" data-aos-delay="100">SMK Bisa, SMK Hebat, illustrasi seperti ini</p>
                <div class="video-container" data-aos="zoom-in" data-aos-delay="200">
                    <video id="introVideo" autoplay muted controls poster="/image/video-poster.jpg">
                        <source src="{{ asset('image/logo pelita.mp4') }}" type="video/mp4">
                        Browser Anda tidak mendukung tag video.
                    </video>
                </div>
            </div>
        </section> --}}

</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });

        document.querySelector('.hero-btn').addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
</script>

@include('partials.footer')