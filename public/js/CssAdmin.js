document.addEventListener('DOMContentLoaded', function() {
    const postFileInput = document.getElementById('lampiran');
    const postFileNameDisplay = document.getElementById('FileNamaFoto');
    const postPreviewContainer = document.getElementById('previewContainer');
    const postPreviewImage = document.getElementById('previewImage');
    const postPreviewText = document.getElementById('previewText');
    const postRemoveImageBtn = document.getElementById('removeImage');
    const postBrowseBtn = document.querySelector('.BrowseFoto');
    const filterSelect = document.getElementById('TipePost');
    const tambahPost = document.getElementById('tambahPost');
    const pengumumanList = document.getElementById('pengumumanList');
    const blogList = document.getElementById('blogList');
    const postForm = document.getElementById('postForm');
    const successAlert = document.getElementById('successAlert');
    const errorMessage = document.getElementById('errorMessage');

    if (postBrowseBtn && postFileInput) {
        postBrowseBtn.addEventListener('click', function() {
            postFileInput.click();
        });
    }

    if (postFileInput) {
        postFileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    postPreviewImage.src = e.target.result;
                    postPreviewImage.style.display = 'block';
                    postPreviewText.style.display = 'none';
                    postRemoveImageBtn.style.display = 'inline-block';
                    postPreviewContainer.classList.add('has-image');
                    if (postFileNameDisplay) {
                        postFileNameDisplay.textContent = 'File dipilih: ' + file.name;
                    }
                };
                reader.readAsDataURL(file);
            } else {
                resetPostPreview();
            }
        });
    }

    if (postRemoveImageBtn) {
        postRemoveImageBtn.addEventListener('click', function() {
            if (postFileInput) postFileInput.value = '';
            resetPostPreview();
        });
    }

    function resetPostPreview() {
        if (postPreviewImage) postPreviewImage.src = '';
        if (postPreviewImage) postPreviewImage.style.display = 'none';
        if (postPreviewText) postPreviewText.style.display = 'block';
        if (postRemoveImageBtn) postRemoveImageBtn.style.display = 'none';
        if (postPreviewContainer) postPreviewContainer.classList.remove('has-image');
        if (postFileNameDisplay) postFileNameDisplay.textContent = 'Pilih file';
    }

    if (filterSelect) {
        filterSelect.removeAttribute('onchange');
        filterSelect.addEventListener('change', function() {
            const selectedValue = this.value;
            if (tambahPost) tambahPost.style.display = 'none';
            if (pengumumanList) pengumumanList.style.display = 'none';
            if (blogList) blogList.style.display = 'none';
            switch(selectedValue) {
                case 'pengumuman':
                    if (pengumumanList) pengumumanList.style.display = 'block';
                    break;
                case 'blog':
                    if (blogList) blogList.style.display = 'block';
                    break;
                default:
                    if (tambahPost) tambahPost.style.display = 'block';
                    break;
            }
            this.form.submit();
        });
    }

    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            const judul = document.getElementById('judul').value;
            const isi = document.querySelector('trix-editor[input="isi"]').value;

            if (!judul || !isi) {
                e.preventDefault();
                if (errorMessage) {
                    errorMessage.textContent = 'Judul dan isi harus diisi.';
                    errorMessage.style.display = 'block';
                    setTimeout(() => {
                        errorMessage.style.display = 'none';
                    }, 3000);
                }
                return;
            }

            const submitBtn = postForm.querySelector('.TombolPosting');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Mengirim...';
            }
        });
    }

    function initializeDisplay() {
        const currentValue = filterSelect ? filterSelect.value : '';
        if (tambahPost) tambahPost.style.display = 'none';
        if (pengumumanList) pengumumanList.style.display = 'none';
        if (blogList) blogList.style.display = 'none';
        switch(currentValue) {
            case 'pengumuman':
                if (pengumumanList) pengumumanList.style.display = 'block';
                break;
            case 'blog':
                if (blogList) blogList.style.display = 'block';
                break;
            default:
                if (tambahPost) tambahPost.style.display = 'block';
                break;
        }
    }

    initializeDisplay();

    // Updated Switch Logic for Animation
    const pengumumanRadio = document.getElementById('pengumuman');
    const blogRadio = document.getElementById('blog');
    const switchElement = document.querySelector('.switch');

    if (pengumumanRadio && blogRadio && switchElement) {
        // Initialize switch state based on checked radio
        function updateSwitchState() {
            if (blogRadio.checked) {
                switchElement.classList.add('active');
                switchElement.setAttribute('aria-checked', 'true');
            } else {
                switchElement.classList.remove('active');
                switchElement.setAttribute('aria-checked', 'false');
            }
        }

        // Set initial state
        updateSwitchState();

        // Handle click on switch to toggle radio buttons
        switchElement.addEventListener('click', function(e) {
            e.preventDefault();
            if (pengumumanRadio.checked) {
                blogRadio.checked = true;
            } else {
                pengumumanRadio.checked = true;
            }
            updateSwitchState();
            // Trigger change event for form validation or other listeners
            const changeEvent = new Event('change', { bubbles: true });
            (pengumumanRadio.checked ? pengumumanRadio : blogRadio).dispatchEvent(changeEvent);
        });

        // Handle keyboard accessibility
        switchElement.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Update switch state on radio change
        pengumumanRadio.addEventListener('change', updateSwitchState);
        blogRadio.addEventListener('change', updateSwitchState);

        // Add accessibility attributes
        switchElement.setAttribute('tabindex', '0');
        switchElement.setAttribute('role', 'switch');
    }

    const trixEditor = document.querySelector('trix-editor[input="isi"]');
    if (trixEditor) {
        trixEditor.addEventListener('trix-change', function() {
            document.getElementById('isi').value = this.innerHTML;
        });
    }
    
    const successMessages = document.querySelectorAll('.alert-success, .PsnBerhasil');
    successMessages.forEach(message => {
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => {
                message.style.display = 'none';
            }, 500);
        }, 3000);
    });

    const postPreviews = document.querySelectorAll('.mini-post-preview');
    postPreviews.forEach(preview => {
        preview.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
        });
        preview.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        });
    });
    
    const deleteButtons = document.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const form = this.closest('form');
            const postType = form.action.includes('pengumuman') ? 'pengumuman' : 'blog';
            const postTitle = this.closest('.mini-post-preview').querySelector('.mini-post-title').textContent;
            if (confirm(`Yakin ingin menghapus ${postType} "${postTitle}"?`)) {
                form.submit();
            }
        });
    });
    
    // Original CssAdmin.js Functionality
    const fileInput = document.getElementById('lampiran');
    const fileNameDisplay = document.getElementById('FileNamaFoto');
    const preview = {
        container: document.getElementById('PreviewLayoutFoto'),
        image: document.getElementById('PreviewFoto'),
        name: document.getElementById('NamaFileFoto')
    };
    const forms = {
        left: document.querySelector('.FormKiri'),
        right: document.querySelector('.FormKanan'),
        layout: document.querySelector('.LayoutNewPost')
    };
    const closeBtn = document.getElementById('MenutupPreview');

    const togglePreview = (show, file) => {
        if (preview.image) preview.image.style.display = show ? 'block' : 'none';
        if (preview.name) preview.name.style.display = show ? 'block' : 'none';
        if (preview.container) preview.container.classList.toggle('has-preview', show);
        
        [forms.left, forms.right, forms.layout].forEach(el => {
            if (el) el.classList.toggle('preview-active', show);
        });
        
        if (show) {
            const reader = new FileReader();
            reader.onload = e => {
                if (preview.image) preview.image.src = e.target.result;
            };
            reader.readAsDataURL(file);
            if (preview.name) preview.name.textContent = file.name;
            
            if (fileNameDisplay) {
                fileNameDisplay.textContent = 'File dipilih: ' + file.name;
            }
        } else {
            if (preview.image) preview.image.src = '';
            if (preview.name) preview.name.textContent = '';
            if (fileInput) fileInput.value = '';
            
            if (fileNameDisplay) {
                fileNameDisplay.textContent = 'Pilih file';
            }
        }
    };

    if (fileInput) {
        fileInput.addEventListener('change', () => 
            fileInput.files[0] 
                ? togglePreview(true, fileInput.files[0]) 
                : togglePreview(false));
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', e => {
            e.preventDefault();
            togglePreview(false);
        });
    }

    const roleSelect = document.getElementById('UserUntuk');
    const muridFields = document.getElementById('FormUntukMurid');
    const guruFields = document.getElementById('FormUntukGuru');
    const TanggalLahir = document.getElementById("tanggal_lahir");
    const TanggalLahirOrtu = document.getElementById("ortu_tanggal_lahir");

    function validateYear(input) {
        if (input) {
            input.addEventListener("change", function () {
                const dateValue = this.value;
                const year = dateValue.split("-")[0];
                if (year.length > 4) {
                    alert("Tahun tidak boleh lebih dari 4 digit, bre!");
                    this.value = "";
                }
            });
        }
    }

    validateYear(TanggalLahir);
    validateYear(TanggalLahirOrtu);

    function toggleFields() {
        if (roleSelect && muridFields && guruFields) {
            const selectedRole = roleSelect.value;
            muridFields.style.display = selectedRole === 'murid' ? 'block' : 'none';
            guruFields.style.display = selectedRole === 'guru' ? 'block' : 'none';
        }
    }

    if (roleSelect) {
        toggleFields();
        roleSelect.addEventListener('change', toggleFields);
    }

    document.querySelectorAll(".NomorOnly").forEach(function (input) {
        input.addEventListener("input", function () {
            let value = this.value;
            if (value.startsWith("+")) {
                value = "+" + value.substring(1).replace(/[^0-9]/g, "");
            } else {
                value = value.replace(/[^0-9]/g, "");
            }
            this.value = value;
        });
    });

    function setupClearButton(inputId, buttonId) {
        const input = document.getElementById(inputId);
        const clearBtn = document.getElementById(buttonId);
        
        if (!input || !clearBtn) {
            return;
        }
        
        function toggleClearButton() {
            if (input.value.trim() !== "") {
                clearBtn.style.display = "inline-block";
            } else {
                clearBtn.style.display = "none";
            }
        }

        input.addEventListener("input", toggleClearButton);

        clearBtn.addEventListener("click", function () {
            input.value = "";
            toggleClearButton();
            input.focus();
        });

        toggleClearButton();
    }

    // Main user fields
    setupClearButton("name", "clearName");
    setupClearButton("email", "clearEmail");
    setupClearButton("alamat", "clearAlamat");
    setupClearButton("jenis_kelamin", "clearJenisKelamin");
    setupClearButton("tanggal_lahir", "clearTanggalLahir");
    setupClearButton("tempat_lahir", "clearTempatLahir");
    setupClearButton("pendidikan", "clearPendidikan");
    setupClearButton("no_telp", "clearNoTelp");
    setupClearButton("password", "clearPassword");
    setupClearButton("UserUntuk", "clearRole");
    
    // Student fields
    setupClearButton("asal_sekolah", "clearAsalSekolah");
    setupClearButton("nis", "clearNis");
    setupClearButton("nisn", "clearNisn");
    setupClearButton("kelas_id", "clearKelasId");
    
    // Parent fields
    setupClearButton("ortu_name", "clearOrtuName");
    setupClearButton("ortu_email", "clearOrtuEmail");
    setupClearButton("ortu_alamat", "clearOrtuAlamat");
    setupClearButton("ortu_jenis_kelamin", "clearOrtuJenisKelamin");
    setupClearButton("ortu_tempat_lahir", "clearOrtuTempatLahir");
    setupClearButton("ortu_tanggal_lahir", "clearOrtuTanggalLahir");
    setupClearButton("ortu_profesi", "clearOrtuProfesi");
    setupClearButton("ortu_pendidikan", "clearOrtuPendidikan");
    setupClearButton("ortu_no_telp", "clearOrtuNoTelp");
    setupClearButton("ortu_password", "clearOrtuPassword");
    
    // Teacher fields
    setupClearButton("gelar", "clearGelar");
    setupClearButton("nuptk", "clearNuptk");
    setupClearButton("statusMenikah", "clearStatusMenikah");
    setupClearButton("statusKerja", "clearStatusKerja");

    // Tambah Pelajaran
    setupClearButton("namaPelajaran", "clearNamaPelajaran");

    // Manajemen Kelas
    setupClearButton("nama_kelas", "clearNamaKelas");

    function switchTab(tabName) { 
        const tabContents = document.querySelectorAll('.TabContent');
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        const oldTabButtons = document.querySelectorAll('.TabButton');
        const newTabButtons = document.querySelectorAll('.HeaderTabButton');
        
        oldTabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        newTabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        if (tabName === 'manajemen') {
            document.getElementById('manajemenTab')?.classList.add('active');
            document.getElementById('tabManajemen')?.classList.add('active');
        } else if (tabName === 'kenaikan') {
            document.getElementById('kenaikanTab')?.classList.add('active');
            document.getElementById('tabKenaikan')?.classList.add('active');
        }
    }

    const handleFileInputs = () => {
        const inputFile = document.getElementById('lampiran');
        if (!inputFile) return;
        
        const fileNameDisplay = document.getElementById('FileNamaFoto');
        const browseButton = document.querySelector('.BrowseFoto');
        
        if (browseButton) {
            browseButton.addEventListener('click', function() {
                inputFile.click();
            });
        }
        
        inputFile.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const fileName = this.files[0].name;
                if (fileNameDisplay) {
                    fileNameDisplay.textContent = fileName;
                }
            }
        });
    };
    
    const handleSuccessMessages = () => {
        const successMessages = document.querySelectorAll('.alert-success, .PsnBerhasil');
        
        successMessages.forEach(message => {
            setTimeout(() => {
                message.style.opacity = '0';
                message.style.transition = 'opacity 0.5s ease-out';
                
                setTimeout(() => {
                    message.style.display = 'none';
                }, 500);
            }, 3000);
        });
    };
    
    const handlePostPreviews = () => {
        const postPreviews = document.querySelectorAll('.mini-post-preview');
        
        postPreviews.forEach(preview => {
            preview.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
            });
            
            preview.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            });
        });
    };
    
    const handleDeleteConfirmations = () => {
        const deleteButtons = document.querySelectorAll('.btn-danger[onclick*="confirm"]');
        
        deleteButtons.forEach(button => {
            button.removeAttribute('onclick');
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const form = this.closest('form');
                const postType = form.action.includes('pengumuman') ? 'pengumuman' : 'kegiatan';
                const postTitle = this.closest('.mini-post-preview').querySelector('.mini-post-title').textContent;
                
                if (confirm(`Yakin ingin menghapus ${postType} "${postTitle}"?`)) {
                    form.submit();
                }
            });
        });
    };
    
    handleFileInputs();
    handleSuccessMessages();
    handlePostPreviews();
    handleDeleteConfirmations();
    
    document.addEventListener('livewire:load', function() {
        Livewire.hook('message.processed', (message, component) => {
            handleFileInputs();
            handleSuccessMessages();
            handlePostPreviews();
            handleDeleteConfirmations();
        });
    });

    const sessionTabElement = document.getElementById('sessionTab');
    const tabToActivate = sessionTabElement?.dataset.tab || 'manajemen';
    switchTab(tabToActivate);
    
    const tabManajemenBtn = document.getElementById('tabManajemen');
    const tabKenaikanBtn = document.getElementById('tabKenaikan');
    
    if (tabManajemenBtn) {
        tabManajemenBtn.addEventListener('click', function(e) {
            e.preventDefault();
            switchTab('manajemen');
        });
    }
    
    if (tabKenaikanBtn) {
        tabKenaikanBtn.addEventListener('click', function(e) {
            e.preventDefault();
            switchTab('kenaikan');
        });
    }
    
    const clearNamaKelasBtn = document.getElementById('clearNamaKelas');
    const namaKelasInput = document.getElementById('nama_kelas');
    
    if (clearNamaKelasBtn && namaKelasInput) {
        clearNamaKelasBtn.addEventListener('click', function() {
            namaKelasInput.value = '';
            namaKelasInput.focus();
        });
    }
});