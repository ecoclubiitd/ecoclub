// Initialize AOS Animation
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle visibility
            mobileMenu.classList.toggle('hidden');

            // Animate Hamburger into 'X'
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (!mobileMenu.classList.contains('hidden')) {
                // Menu is open
                spans[0].classList.add('-rotate-45', 'translate-y-2');
                spans[1].classList.add('opacity-0');
                spans[2].classList.add('rotate-45', '-translate-y-2');
            } else {
                // Menu is closed
                spans[0].classList.remove('-rotate-45', 'translate-y-2');
                spans[1].classList.remove('opacity-0');
                spans[2].classList.remove('rotate-45', '-translate-y-2');
            }
        });
    }
});

// Articles Page Logic — Self-contained Carousel Widgets
document.addEventListener('DOMContentLoaded', () => {
    const archiveGrid = document.getElementById('articles-grid');
    if (!archiveGrid || typeof articlesData === 'undefined') return;

    // Navigate slides within a specific widget
    window.navigateSlide = function (widgetId, direction, evt) {
        if (evt) { evt.stopPropagation(); evt.preventDefault(); }

        const widget = document.getElementById(widgetId);
        if (!widget) return;

        const slides = widget.querySelectorAll('.carousel-slide');
        const counter = widget.querySelector('.slide-counter');
        const total = slides.length;
        let current = parseInt(widget.getAttribute('data-current') || '0');

        // Hide current
        slides[current].classList.remove('opacity-100');
        slides[current].classList.add('opacity-0');

        // Compute next
        current = (current + direction + total) % total;

        // Show next
        slides[current].classList.remove('opacity-0');
        slides[current].classList.add('opacity-100');

        widget.setAttribute('data-current', current);
        if (counter) counter.textContent = `${current + 1} / ${total}`;
    };

    // ── Fullscreen Modal Viewer ──
    let modalState = { articleIndex: -1, slideIndex: 0, isOpen: false };

    function createModal() {
        const modal = document.createElement('div');
        modal.id = 'article-modal';
        modal.className = 'fixed inset-0 z-[9999] hidden items-center justify-center';
        modal.innerHTML = `
            <!-- Backdrop -->
            <div id="modal-backdrop" class="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

            <!-- Modal Content -->
            <div class="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 py-8 md:px-12 md:py-12">
                <!-- Close Button -->
                <button id="modal-close" class="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-accent-gold hover:text-primary transition-all duration-200" aria-label="Close">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>

                <!-- Title -->
                <h3 id="modal-title" class="text-xl md:text-2xl font-serif font-bold text-white mb-4 text-center max-w-2xl"></h3>

                <!-- Image Container -->
                <div class="relative flex items-center justify-center flex-grow w-full max-w-5xl">
                    <!-- Prev -->
                    <button id="modal-prev" class="absolute left-0 md:left-2 z-30 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-accent-gold hover:text-primary transition-all duration-200" aria-label="Previous slide">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                    </button>

                    <!-- Image -->
                    <img id="modal-image" src="" alt="" class="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl select-none" draggable="false" oncontextmenu="return false;" />

                    <!-- Next -->
                    <button id="modal-next" class="absolute right-0 md:right-2 z-30 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-accent-gold hover:text-primary transition-all duration-200" aria-label="Next slide">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </button>
                </div>

                <!-- Counter -->
                <div class="mt-4 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
                    <span id="modal-counter" class="text-sm font-mono font-semibold text-accent-gold tracking-wider"></span>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Event listeners
        document.getElementById('modal-close').addEventListener('click', closeModal);
        document.getElementById('modal-backdrop').addEventListener('click', closeModal);
        document.getElementById('modal-prev').addEventListener('click', () => modalNavigate(-1));
        document.getElementById('modal-next').addEventListener('click', () => modalNavigate(1));

        document.addEventListener('keydown', (e) => {
            if (!modalState.isOpen) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') modalNavigate(-1);
            if (e.key === 'ArrowRight') modalNavigate(1);
        });
    }

    function openModal(articleIndex, slideIndex) {
        const modal = document.getElementById('article-modal');
        const article = articlesData[articleIndex];
        if (!modal || !article) return;

        modalState = { articleIndex, slideIndex: slideIndex || 0, isOpen: true };
        updateModalContent();

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const modal = document.getElementById('article-modal');
        if (!modal) return;

        modalState.isOpen = false;
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    function modalNavigate(direction) {
        const article = articlesData[modalState.articleIndex];
        if (!article) return;
        const total = article.slides.length;
        modalState.slideIndex = (modalState.slideIndex + direction + total) % total;
        updateModalContent();
    }

    function updateModalContent() {
        const article = articlesData[modalState.articleIndex];
        if (!article) return;

        document.getElementById('modal-image').src = article.slides[modalState.slideIndex];
        document.getElementById('modal-image').alt = `${article.title} — Slide ${modalState.slideIndex + 1}`;
        document.getElementById('modal-title').textContent = article.title;
        document.getElementById('modal-counter').textContent = `${modalState.slideIndex + 1} / ${article.slides.length}`;
    }

    // Make openModal globally accessible for onclick
    window.openArticleModal = openModal;

    // Create the modal DOM
    createModal();

    function renderArticles() {
        archiveGrid.innerHTML = '';

        articlesData.forEach((article, index) => {
            const widgetId = `widget-${index}`;
            const delay = (index % 12) * 80;

            // Build slide layers
            let slidesHtml = '';
            article.slides.forEach((slide, sIdx) => {
                slidesHtml += `
                    <div class="carousel-slide absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${sIdx === 0 ? 'opacity-100' : 'opacity-0'}">
                        <img src="${slide}" alt="${article.title} — Slide ${sIdx + 1}" draggable="false"
                             class="w-full h-full object-contain bg-secondary select-none" loading="lazy"
                             oncontextmenu="return false;">
                    </div>
                `;
            });

            const widget = document.createElement('div');
            widget.className = 'group rounded-2xl overflow-hidden border border-accent-silver/10 bg-secondary transition-all duration-500 hover:shadow-glow hover:-translate-y-1 flex flex-col';
            widget.style.animation = `fade-in-up 0.5s ease-out ${delay}ms both`;

            widget.innerHTML = `
                <!-- Image Area with Carousel -->
                <div id="${widgetId}" data-current="0" class="relative w-full aspect-[4/5] bg-secondary overflow-hidden select-none">
                    ${slidesHtml}

                    <!-- Prev Arrow -->
                    <button onclick="navigateSlide('${widgetId}', -1, event)"
                        class="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-accent-gold hover:text-primary transition-all duration-200 opacity-0 group-hover:opacity-100 focus:outline-none"
                        aria-label="Previous slide">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                    </button>

                    <!-- Next Arrow -->
                    <button onclick="navigateSlide('${widgetId}', 1, event)"
                        class="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-accent-gold hover:text-primary transition-all duration-200 opacity-0 group-hover:opacity-100 focus:outline-none"
                        aria-label="Next slide">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </button>

                    <!-- Expand Button -->
                    <button onclick="openArticleModal(${index}, parseInt(document.getElementById('${widgetId}').getAttribute('data-current') || '0')); event.stopPropagation();"
                        class="absolute top-2 right-2 z-30 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-accent-gold hover:text-primary transition-all duration-200 opacity-0 group-hover:opacity-100 focus:outline-none"
                        aria-label="Expand for better readability">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9m-11.25 11.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15"/></svg>
                    </button>

                    <!-- Slide Counter -->
                    <div class="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                        <span class="slide-counter text-xs font-mono font-semibold text-accent-gold tracking-wider">1 / ${article.slides.length}</span>
                    </div>
                </div>

                <!-- Title Bar -->
                <div class="px-5 py-4 bg-secondary border-t border-accent-silver/5 select-none">
                    <span class="text-[10px] font-sans text-accent-gold tracking-widest uppercase font-semibold block mb-1">${article.date || 'LATEST'}</span>
                    <h3 class="text-lg font-serif font-bold text-accent-silver leading-snug">${article.title}</h3>
                </div>
            `;

            archiveGrid.appendChild(widget);
        });
    }

    renderArticles();
});

// Resources Page Logic
document.addEventListener('DOMContentLoaded', () => {
    const categoryNav = document.getElementById('category-nav');
    const resourcesGrid = document.getElementById('resources-grid');
    const currentCategoryTitle = document.getElementById('current-category-title');
    const resourceCount = document.getElementById('resource-count');
    const noResults = document.getElementById('no-results');
    const categoryDescription = document.getElementById('category-description');
    const typeFilterContainer = document.getElementById('type-filter');

    if (!categoryNav || !resourcesGrid || typeof resourcesData === 'undefined' || resourcesData.length === 0) return;

    let currentCategoryId = resourcesData[0].id;
    let currentTypeFilter = 'all'; // 'all', 'reading', 'video'

    // Initialize Categories Sidebar with item counts
    function renderCategories() {
        categoryNav.innerHTML = '';

        resourcesData.forEach(category => {
            const btn = document.createElement('button');
            const isActive = currentCategoryId === category.id;
            const itemCount = category.items.length;

            btn.className = `category-tab text-left w-auto md:w-full px-3 py-2 md:px-4 md:py-4 rounded-full md:rounded-r-xl md:rounded-l-none font-semibold text-xs md:text-base shrink transition-all duration-300 relative overflow-hidden group border border-accent-silver/10 md:border-0`;

            if (isActive) {
                btn.className += ` text-accent-gold bg-accent-silver/5 shadow-glass md:-ml-[1px] md:border-l-4 md:border-accent-gold`;
            } else {
                btn.className += ` text-blue-100/80 hover:text-white border border-transparent md:-ml-[1px] md:border-l-4 md:border-transparent hover:bg-accent-silver/5`;
            }

            btn.innerHTML = `
                <span class="relative z-10 font-montserrat tracking-wide flex items-center justify-between w-full">
                    <span>${category.title}</span>
                    <span class="ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${isActive ? 'bg-accent-gold/20 text-accent-gold' : 'bg-accent-silver/10 text-accent-silver/40'}">${itemCount}</span>
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-accent-gold/10 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 z-0"></div>
            `;

            btn.onclick = () => selectCategory(category.id);
            categoryNav.appendChild(btn);
        });
    }

    function selectCategory(id) {
        currentCategoryId = id;
        currentTypeFilter = 'all'; // Reset type filter on category change
        renderCategories();
        filterAndRenderResources();
    }

    // Helper to pick icons
    function getIconSVG(type, source = '') {
        const lowerSource = source.toLowerCase();

        if (lowerSource.includes('youtube')) {
            return `<svg class="w-4 h-4 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`;
        }
        if (lowerSource.includes('google drive') || lowerSource.includes('docs')) {
            return `<svg class="w-4 h-4 text-[#0F9D58]" fill="currentColor" viewBox="0 0 24 24"><path d="M7.71 3.5L1.15 15l3.43 6 6.55-11.5M9.73 15L13 20.69l9.85-17.19H16.3M22.85 15H9.74l-3.43-6h13.11" /></svg>`;
        }
        if (lowerSource.includes('investopedia')) {
            return `<svg class="w-4 h-4 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>`;
        }
        if (lowerSource.includes('zerodha')) {
            return `<svg class="w-4 h-4 text-[#387ED1]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" /></svg>`;
        }

        if (type === 'video') {
            return `<svg class="w-4 h-4 text-accent-gold" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" /></svg>`;
        }
        return `<svg class="w-4 h-4 text-accent-silver/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>`;
    }

    // Get type badge HTML
    function getTypeBadge(type) {
        if (type === 'video') {
            return `<span class="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-400/20">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" /></svg>
                Video</span>`;
        }
        return `<span class="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-400/20">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            Reading</span>`;
    }

    // Render type filter pills
    function renderTypeFilter(allItems) {
        if (!typeFilterContainer) return;
        const videoCount = allItems.filter(i => i.type === 'video').length;
        const readingCount = allItems.filter(i => i.type === 'reading').length;

        // Only show filter if both types exist
        if (videoCount === 0 || readingCount === 0) {
            typeFilterContainer.innerHTML = '';
            return;
        }

        const pills = [
            { id: 'all', label: 'All', count: allItems.length },
            { id: 'reading', label: 'Reading', count: readingCount },
            { id: 'video', label: 'Video', count: videoCount }
        ];

        typeFilterContainer.innerHTML = pills.map(pill => {
            const isActive = currentTypeFilter === pill.id;
            const activeClass = isActive
                ? 'bg-accent-gold/20 text-accent-gold border-accent-gold/40'
                : 'bg-secondary/60 text-accent-silver/60 border-accent-silver/10 hover:text-accent-silver hover:border-accent-silver/30';
            return `<button data-type="${pill.id}" class="type-filter-pill px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${activeClass}">
                ${pill.label} <span class="ml-1 font-mono text-[10px] opacity-70">${pill.count}</span>
            </button>`;
        }).join('');

        // Attach click handlers
        typeFilterContainer.querySelectorAll('.type-filter-pill').forEach(btn => {
            btn.addEventListener('click', () => {
                currentTypeFilter = btn.dataset.type;
                filterAndRenderResources();
            });
        });
    }

    function renderResources(items) {
        resourcesGrid.innerHTML = '';

        if (items.length === 0) {
            resourcesGrid.classList.add('hidden');
            noResults.classList.remove('hidden');
            noResults.style.display = 'flex';
        } else {
            resourcesGrid.classList.remove('hidden');
            noResults.classList.add('hidden');
            noResults.style.display = 'none';
            items.forEach((item, index) => {
                const delay = (index % 10) * 50;
                const num = index + 1;

                const card = document.createElement('a');
                card.href = item.url;
                card.target = "_blank";
                card.rel = "noopener noreferrer";

                card.className = "group relative glassmorphism rounded-xl p-5 border border-accent-silver/5 hover:border-accent-silver/10 hover-lift hover-glow transition-all duration-300 flex flex-col items-start gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] bg-secondary/40 backdrop-blur-md overflow-hidden block w-full leading-normal break-inside-avoid shadow-soft";
                card.style.animation = `fade-in-up 0.5s ease-out ${delay}ms both`;

                card.innerHTML = `
                    <div class="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none z-0"></div>
                    <div class="w-full relative z-10 flex flex-col h-full">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/30 border border-accent-silver/5">
                                ${getIconSVG(item.type, item.source)}
                                <span class="text-[10px] font-sans tracking-widest font-medium text-accent-silver/60 uppercase">${item.source}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-[11px] font-mono font-bold text-accent-gold/40">#${num}</span>
                                <svg class="w-4 h-4 text-accent-silver/30 group-hover:text-accent-gold transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </div>
                        </div>
                        <h4 class="text-base md:text-[17px] font-montserrat font-semibold text-accent-silver group-hover:text-white transition-colors mb-2 leading-snug pr-2">${item.title}</h4>
                        <div class="mt-auto flex items-center justify-between w-full">
                            ${getTypeBadge(item.type)}
                        </div>
                    </div>
                `;
                resourcesGrid.appendChild(card);
            });
            const cat = resourcesData.find(c => c.id === currentCategoryId);
            currentCategoryTitle.textContent = cat ? cat.title : "Filtered Resources";
            resourceCount.textContent = `${items.length} item${items.length !== 1 ? 's' : ''}`;
        }
    }

    function filterAndRenderResources() {
        const category = resourcesData.find(cat => cat.id === currentCategoryId);
        if (!category) return;

        // Update description
        if (categoryDescription) {
            categoryDescription.textContent = category.description || '';
        }

        // Render type filter pills (based on all items, before type filtering)
        renderTypeFilter(category.items);

        // Apply type filter
        let itemsToRender = category.items;
        if (currentTypeFilter !== 'all') {
            itemsToRender = category.items.filter(item => item.type === currentTypeFilter);
        }

        renderResources(itemsToRender);
    }

    renderCategories();
    filterAndRenderResources();
});

// Team Page Logic
document.addEventListener('DOMContentLoaded', () => {
    const yearSelector = document.getElementById('year-selector');
    const container = document.getElementById('team-hierarchy-container');

    if (!yearSelector || !container || typeof teamData === 'undefined' || teamData.length === 0) return;

    teamData.forEach(teamSet => {
        const option = document.createElement('option');
        option.value = teamSet.year;
        option.textContent = teamSet.year;
        option.className = "bg-primary text-accent-silver font-sans";
        yearSelector.appendChild(option);
    });

    yearSelector.addEventListener('change', (e) => renderTeam(e.target.value));
    renderTeam(teamData[0].year);

    function createMemberCard(member, cardStyle = '') {
        const initials = member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        const photoHtml = member.photo
            ? `<img src="${member.photo}" alt="${member.name}" class="w-full h-full object-cover rounded-full" draggable="false" loading="lazy">`
            : `<span class="text-2xl font-serif font-bold text-accent-gold/80">${initials}</span>`;
        return `
            <div class="glassmorphism rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover-glow hover-lift border border-accent-silver/10 shadow-glass ${cardStyle}">
                <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-secondary to-primary border-2 border-accent-gold/40 flex items-center justify-center mb-4 shadow-inner overflow-hidden">
                    ${photoHtml}
                </div>
                <h3 class="text-lg md:text-xl font-montserrat font-bold text-accent-silver mb-1">${member.name}</h3>
                <p class="text-xs md:text-sm font-sans text-accent-gold tracking-widest uppercase font-semibold">${member.role}</p>
            </div>
        `;
    }


    function renderTeam(selectedYear) {
        container.innerHTML = '';
        const teamSet = teamData.find(t => t.year === selectedYear);
        if (!teamSet) return;

        const members = teamSet.members;
        const level0 = members.filter(m => m.level === 0); // Faculty President
        const level1 = members.filter(m => m.level === 1); // OC
        const level2 = members.filter(m => m.level === 2); // Co-OC
        const level3 = members.filter(m => m.level === 3); // CTMs
        const level4 = members.filter(m => m.level === 4); // Coordinators

        let htmlString = '';

        // Level 0 (Faculty President)
        if (level0.length > 0) {
            htmlString += `
                <div class="mb-12" data-aos="fade-up" data-aos-delay="25">
                    <div class="flex justify-center max-w-sm mx-auto">
                        ${level0.map(m => createMemberCard(m, 'w-full')).join('')}
                    </div>
                </div>
            `;
        }

        // Level 1 & 2
        if (level1.length > 0 || level2.length > 0) {
            htmlString += `
                <div class="flex flex-col md:flex-row justify-center items-stretch gap-6 mb-12 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="50">
                    ${level1.length > 0 ? `
                        <div class="flex-1 w-full flex flex-col">
                            ${level1.map(m => createMemberCard(m, 'h-full flex-grow')).join('')}
                        </div>
                    ` : ''}
                    ${level2.length > 0 ? `
                        <div class="flex-1 w-full flex flex-col">
                            ${level2.map(m => createMemberCard(m, 'h-full flex-grow')).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }

        // Level 3
        if (level3.length > 0) {
            htmlString += `
                <div class="mb-12" data-aos="fade-up" data-aos-delay="250">
                    <h2 class="text-center font-serif text-2xl text-accent-silver/50 mb-6 relative">
                        <span class="bg-primary/50 relative z-10 px-4 backdrop-blur-sm rounded-full border border-accent-silver/5">Core Team Members</span>
                        <div class="absolute w-full h-px bg-accent-silver/10 top-1/2 left-0 transform -translate-y-1/2 z-0"></div>
                    </h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        ${level3.map(m => createMemberCard(m)).join('')}
                    </div>
                </div>
            `;
        }

        // Level 4
        if (level4.length > 0) {
            htmlString += `
                <div data-aos="fade-up" data-aos-delay="350">
                    <h2 class="text-center font-serif text-2xl text-accent-silver/50 mb-6 relative">
                         <span class="bg-primary/50 relative z-10 px-4 backdrop-blur-sm rounded-full border border-accent-silver/5">Coordinators</span>
                         <div class="absolute w-full h-px bg-accent-silver/10 top-1/2 left-0 transform -translate-y-1/2 z-0"></div>
                    </h2>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                        ${level4.map(m => createMemberCard(m, 'p-4 md:p-6 !max-w-none')).join('')}
                    </div>
                </div>
            `;
        }

        container.innerHTML = htmlString;
    }
});

// Latest Insights logic (index.html)
document.addEventListener('DOMContentLoaded', () => {
    const insightsContainer = document.getElementById('insights-container');
    if (!insightsContainer || typeof articlesData === 'undefined') return;

    // Grab up to 3 latest articles
    const latestArticles = articlesData.slice(0, 3);

    let htmlString = '';
    latestArticles.forEach((article, index) => {
        const delay = index * 150 + 100;
        const snippet = article.snippet || '';

        htmlString += `
            <a href="articles.html" class="stacked-card group relative glassmorphism-heavy rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-glow hover:-translate-y-3 block" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="aspect-[4/3] overflow-hidden relative">
                    <img src="${article.slides[0]}" alt="${article.title}" draggable="false" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none" loading="lazy">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/50 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-6 z-10">
                        <div class="text-[10px] font-sans text-accent-gold mb-2 tracking-widest uppercase font-semibold">${article.date || 'LATEST'}</div>
                        <h3 class="text-xl font-serif font-bold text-white mb-2 leading-snug drop-shadow-lg">${article.title}</h3>
                    </div>
                </div>
                <div class="px-6 py-4 relative z-10">
                    <p class="text-sm text-accent-silver/50 font-light line-clamp-2 mb-3">${snippet}</p>
                    <span class="inline-flex items-center text-sm font-medium text-accent-gold group-hover:text-white transition-colors">
                        Read Summary 
                        <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </span>
                </div>
            </a>
        `;
    });
    insightsContainer.innerHTML = htmlString;
});

// Events Carousel Auto-Slide (index.html)
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('events-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.events-carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const progressBar = document.getElementById('carousel-progress');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoPlayInterval = null;
    let progressInterval = null;
    const SLIDE_DURATION = 5000; // 5 seconds
    const PROGRESS_STEP = 50; // ms

    function goToSlide(index) {
        // Remove active from current
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');

        // Update index
        currentIndex = (index + totalSlides) % totalSlides;

        // Add active to new
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');

        // Reset progress
        resetProgress();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Progress bar
    function resetProgress() {
        if (progressBar) {
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            // Force reflow
            progressBar.offsetHeight;
            progressBar.style.transition = `width ${SLIDE_DURATION}ms linear`;
            progressBar.style.width = '100%';
        }
    }

    // Auto-play
    function startAutoPlay() {
        stopAutoPlay();
        resetProgress();
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, SLIDE_DURATION);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
        if (progressBar) {
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
        }
    }

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
            startAutoPlay(); // restart timer
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
            startAutoPlay(); // restart timer
        });
    }

    // Dot click handlers
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            goToSlide(index);
            startAutoPlay(); // restart timer
        });
    });

    // Pause on hover, resume on leave
    carousel.addEventListener('mouseenter', () => {
        stopAutoPlay();
    });

    carousel.addEventListener('mouseleave', () => {
        startAutoPlay();
    });

    // Keyboard navigation
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            startAutoPlay();
        }
    });

    // Start
    startAutoPlay();
});

