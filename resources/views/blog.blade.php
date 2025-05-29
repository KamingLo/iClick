@include('partials.header', ['NamaPage' => 'Blog'])

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            gap: 30px;
        }

        .blog-section {
            flex: 3;
        }

        .sidebar {
            flex: 1;
            position: sticky;
            top: 20px;
            align-self: flex-start;
        }

        .search-filter-container {
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .search-bar {
            width: 100%;
            padding: 12px 20px;
            border: 2px solid #e9ecef;
            border-radius: 25px;
            font-size: 14px;
            outline: none;
            transition: all 0.3s ease;
            background: white;
            margin-bottom: 20px;
        }

        .search-bar:focus {
            border-color: #6c757d;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .filter-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .filter-button {
            padding: 8px 16px;
            border: 2px solid #e9ecef;
            border-radius: 20px;
            background: white;
            color: #6c757d;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .filter-button.active {
            background: #6c757d;
            color: white;
            border-color: #6c757d;
        }

        .filter-button:hover:not(.active) {
            background: #f1f3f5;
        }

        .blog-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 30px;
            margin-top: 30px;
        }

        .blog-card {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            display: flex;
            min-height: 200px;
        }

        .blog-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .blog-image {
            width: 200px;
            height: auto;
            flex-shrink: 0;
            border-top-left-radius: 15px;
            border-bottom-left-radius: 15px;
            background-size: cover;
            background-position: center;
            background-color: #f8f9fa;
        }

        .blog-content {
            padding: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .blog-title {
            font-size: 20px;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 10px;
            line-height: 1.4;
        }

        .blog-excerpt {
            color: #6c757d;
            font-size: 14px;
            margin-bottom: 15px;
            flex: 1;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .blog-meta {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: auto;
        }

        .author-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #e9ecef;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
            font-weight: 600;
            font-size: 12px;
        }

        .author-info {
            flex: 1;
        }

        .author-name {
            font-weight: 600;
            color: #2c3e50;
            font-size: 13px;
        }

        .publish-date {
            color: #6c757d;
            font-size: 12px;
        }

        .no-results {
            text-align: center;
            padding: 60px 20px;
            color: #6c757d;
        }

        @media (max-width: 768px) {
            .container {
                flex-direction: column;
            }

            .blog-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .sidebar {
                position: static;
            }

            .search-filter-container {
                position: static;
            }

            .blog-card {
                flex-direction: column;
                min-height: auto;
            }

            .blog-image {
                width: 100%;
                height: 150px;
                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
                border-bottom-left-radius: 0;
            }

            .search-bar {
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Blog Section -->
        <div class="blog-section">
            <div class="blog-grid" id="blogGrid">
                @forelse($blogs as $blog)
                <article class="blog-card" 
                         data-title="{{ strtolower($blog->judul) }}" 
                         data-content="{{ strtolower(strip_tags($blog->isi)) }}" 
                         data-date="{{ $blog->created_at->format('Y-m-d') }}">
                    <div class="blog-image" 
                         @if($blog->lampiran)
                             style="background-image: url('{{ asset('storage/' . $blog->lampiran) }}');"
                         @else
                             style="background-image: url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80');"
                         @endif>
                    </div>
                    <div class="blog-content">
                        <h2 class="blog-title">{{ $blog->judul }}</h2>
                        <p class="blog-excerpt">{{ Str::limit(strip_tags($blog->isi), 150) }}</p>
                        <div class="blog-meta">
                            <div class="author-avatar">
                                {{ strtoupper(substr($blog->admin->profile->name, 0, 2)) }}
                            </div>
                            <div class="author-info">
                                <div class="author-name">{{ $blog->admin->profile->name }}</div>
                                <div class="publish-date">{{ $blog->created_at->format('M d, Y') }}</div>
                            </div>
                        </div>
                    </div>
                </article>
                @empty
                <div class="no-results">
                    <p>Belum ada artikel blog yang tersedia.</p>
                </div>
                @endforelse
            </div>

            <div class="no-results" id="noResults" style="display: none;">
                <p>Tidak ada artikel yang ditemukan.</p>
            </div>
        </div>

        <!-- Sidebar with Search and Filter -->
        <div class="sidebar">
            <div class="search-filter-container">
                <input type="text" class="search-bar" placeholder="Cari artikel..." id="searchInput">
                <div class="filter-buttons">
                    <button class="filter-button" data-filter="today">Hari Ini</button>
                    <button class="filter-button" data-filter="week">Minggu Ini</button>
                    <button class="filter-button" data-filter="month">Bulan Ini</button>
                    <button class="filter-button" data-filter="year">Tahun Ini</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        const searchInput = document.getElementById('searchInput');
        const blogGrid = document.getElementById('blogGrid');
        const noResults = document.getElementById('noResults');
        const blogCards = document.querySelectorAll('.blog-card');
        const filterButtons = document.querySelectorAll('.filter-button');

        // Search Functionality
        function applySearchAndFilter() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const activeFilter = document.querySelector('.filter-button.active')?.dataset.filter;
            let visibleCards = 0;

            blogCards.forEach(card => {
                const title = card.getAttribute('data-title').toLowerCase();
                const content = card.getAttribute('data-content').toLowerCase();
                const cardText = card.textContent.toLowerCase();
                const publishDate = new Date(card.getAttribute('data-date'));
                const currentDate = new Date();

                // Filter by date
                let dateMatch = true;
                if (activeFilter) {
                    const startDate = new Date(currentDate);
                    if (activeFilter === 'today') {
                        dateMatch = publishDate.toDateString() === currentDate.toDateString();
                    } else if (activeFilter === 'week') {
                        startDate.setDate(currentDate.getDate() - 7);
                        dateMatch = publishDate >= startDate && publishDate <= currentDate;
                    } else if (activeFilter === 'month') {
                        startDate.setMonth(currentDate.getMonth() - 1);
                        dateMatch = publishDate >= startDate && publishDate <= currentDate;
                    } else if (activeFilter === 'year') {
                        startDate.setFullYear(currentDate.getFullYear() - 1);
                        dateMatch = publishDate >= startDate && publishDate <= currentDate;
                    }
                }

                const searchMatch = searchTerm === '' || 
                    title.includes(searchTerm) || 
                    content.includes(searchTerm) || 
                    cardText.includes(searchTerm);

                if (searchMatch && dateMatch) {
                    card.style.display = 'flex';
                    visibleCards++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide no results message
            if (visibleCards === 0 && (searchTerm !== '' || activeFilter)) {
                noResults.style.display = 'block';
                blogGrid.style.display = 'none';
            } else {
                noResults.style.display = 'none';
                blogGrid.style.display = 'grid';
            }
        }

        searchInput.addEventListener('input', applySearchAndFilter);

        // Filter Functionality (Single Selection)
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // If clicking the same button, just remove active class (deselect)
                if (this.classList.contains('was-active')) {
                    this.classList.remove('was-active');
                } else {
                    // Add active class to clicked button
                    this.classList.add('active');
                    // Mark as was-active for next click
                    filterButtons.forEach(btn => btn.classList.remove('was-active'));
                    this.classList.add('was-active');
                }
                
                applySearchAndFilter();
            });
        });

        document.documentElement.style.scrollBehavior = 'smooth';
    </script>
</body>
</html>

@include('partials.footer')