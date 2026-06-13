import { FavoriteService } from '../../services/favorites.service.js';
import { CompareService } from '../../services/compare.service.js';
import { CarService } from '../../services/cars.service.js';
import { formatPrice } from './utils.js';

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
  // Inject Custom Stylesheet if not already present
  if (!document.querySelector('link[href*="custom.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/css/custom.css';
    document.head.appendChild(link);
  }

  // 1. INJECT HEADER & FOOTER
  injectHeader();
  injectFooter();
  injectCompareDrawer();

  // 2. SETUP LISTENERS FOR REALTIME BADGE UPDATES
  window.addEventListener('drivex:favorites-updated', (e) => {
    updateBadges();
  });

  window.addEventListener('drivex:compare-updated', (e) => {
    updateBadges();
    renderCompareDrawer();
  });

  // Initial Badge Setup
  setTimeout(() => {
    updateBadges();
    renderCompareDrawer();
    setupMobileMenu();
    setupNewsletter();
  }, 100);
});

function injectHeader() {
  const container = document.getElementById('header-container');
  if (!container) return;

  const currentPath = window.location.pathname;
  const isPageActive = (path) => currentPath.endsWith(path) || (path === 'index.html' && (currentPath === '/' || currentPath === ''));

  container.innerHTML = `
    <header class="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl transition-all duration-300">
      <div class="max-w-7xl mx-auto px-6">
        <div class="h-20 flex items-center justify-between">

          <!-- Logo -->
          <a href="index.html" class="flex items-center gap-3 group">
            <div class="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-white group-hover:bg-brand-500 transition duration-300">
              DX
            </div>
            <span class="font-black text-2xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">DriveX</span>
          </a>

          <!-- Navigation Links -->
          <nav class="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <a href="index.html" class="${isPageActive('index.html') ? 'text-white border-b-2 border-brand-500 pb-1' : 'hover:text-white transition'}">Home</a>
            <a href="cars.html" class="${isPageActive('cars.html') ? 'text-white border-b-2 border-brand-500 pb-1' : 'hover:text-white transition'}">Cars</a>
            <a href="brands.html" class="${isPageActive('brands.html') ? 'text-white border-b-2 border-brand-500 pb-1' : 'hover:text-white transition'}">Brands</a>
            <a href="articles.html" class="${isPageActive('articles.html') ? 'text-white border-b-2 border-brand-500 pb-1' : 'hover:text-white transition'}">Articles</a>
            <a href="reviews.html" class="${isPageActive('reviews.html') ? 'text-white border-b-2 border-brand-500 pb-1' : 'hover:text-white transition'}">Reviews</a>
            <a href="news.html" class="${isPageActive('news.html') ? 'text-white border-b-2 border-brand-500 pb-1' : 'hover:text-white transition'}">News</a>
          </nav>

          <!-- Interaction Icons & Action -->
          <div class="flex items-center gap-4">
            
            <!-- Compare -->
            <a href="compare.html" title="Compare Vehicles" class="relative p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition text-zinc-300 hover:text-white">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"></path>
              </svg>
              <span id="compare-badge" class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center hidden">0</span>
            </a>

            <!-- Favorites -->
            <a href="favorites.html" title="Favorites" class="relative p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition text-zinc-300 hover:text-white">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span id="favs-badge" class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center hidden">0</span>
            </a>

            <a href="cars.html" class="hidden md:inline-flex px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 transition font-semibold text-sm shadow-lg shadow-brand-600/20">
              Browse Cars
            </a>

            <!-- Mobile Menu Toggle -->
            <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Dropdown Navigation -->
      <div id="mobile-menu" class="hidden lg:hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl px-6 py-6 space-y-4">
        <a href="index.html" class="block text-lg font-medium text-zinc-300 hover:text-white">Home</a>
        <a href="cars.html" class="block text-lg font-medium text-zinc-300 hover:text-white">Cars</a>
        <a href="brands.html" class="block text-lg font-medium text-zinc-300 hover:text-white">Brands</a>
        <a href="articles.html" class="block text-lg font-medium text-zinc-300 hover:text-white">Articles</a>
        <a href="reviews.html" class="block text-lg font-medium text-zinc-300 hover:text-white">Reviews</a>
        <a href="news.html" class="block text-lg font-medium text-zinc-300 hover:text-white">News</a>
        <div class="pt-4 border-t border-white/5 flex flex-col gap-4">
          <a href="compare.html" class="flex items-center gap-3 text-zinc-300 hover:text-white">
            Compare Matrix
          </a>
          <a href="favorites.html" class="flex items-center gap-3 text-zinc-300 hover:text-white">
            My Favorites
          </a>
          <a href="cars.html" class="w-full text-center py-3 rounded-xl bg-brand-600 hover:bg-brand-500 transition font-semibold text-sm">
            Browse Cars
          </a>
        </div>
      </div>
    </header>
  `;
}

function injectFooter() {
  const container = document.getElementById('footer-container');
  if (!container) return;

  container.innerHTML = `
    <footer class="border-t border-white/10 bg-zinc-950 py-16 text-zinc-400">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-12 mb-12">
          
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-white">
                DX
              </div>
              <span class="font-black text-2xl text-white tracking-wider">DriveX</span>
            </div>
            <p class="text-sm text-zinc-500 leading-relaxed">
              Premium automotive digital magazine and luxury vehicle discovery ecosystem. Your portal to high performance, EV innovations, and industry research.
            </p>
          </div>

          <div>
            <h4 class="text-white font-bold mb-6 tracking-wide">Explore</h4>
            <div class="flex flex-col gap-3.5 text-sm">
              <a href="cars.html" class="hover:text-white transition">Luxury Vehicles</a>
              <a href="brands.html" class="hover:text-white transition">Automotive Brands</a>
              <a href="compare.html" class="hover:text-white transition">Compare Cars</a>
              <a href="favorites.html" class="hover:text-white transition">Saved Garage</a>
            </div>
          </div>

          <div>
            <h4 class="text-white font-bold mb-6 tracking-wide">Insights</h4>
            <div class="flex flex-col gap-3.5 text-sm">
              <a href="articles.html" class="hover:text-white transition">Expert Articles</a>
              <a href="reviews.html" class="hover:text-white transition">Vehicle Reviews</a>
              <a href="news.html" class="hover:text-white transition">Automotive News</a>
              <a href="#" class="hover:text-white transition">Electric Vehicles Hub</a>
            </div>
          </div>

          <div>
            <h4 class="text-white font-bold mb-6 tracking-wide">Contact</h4>
            <div class="flex flex-col gap-3.5 text-sm text-zinc-500">
              <p>Email: contact@drivex.com</p>
              <p>Phone: +1-555-123-4567</p>
              <p>Office: Automotive Avenue, New York, USA</p>
            </div>
          </div>

        </div>

        <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <p>&copy; ${new Date().getFullYear()} DriveX Automotive. All rights reserved.</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" class="hover:text-zinc-400">Terms of Service</a>
            <a href="#" class="hover:text-zinc-400">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function injectCompareDrawer() {
  // If we are already on the compare page, do not inject the floating drawer
  if (window.location.pathname.endsWith('compare.html')) return;

  const drawer = document.createElement('div');
  drawer.id = 'compare-drawer';
  drawer.className = 'fixed bottom-0 left-0 right-0 z-40 bg-zinc-900/95 border-t border-white/10 glass-intense transform translate-y-full compare-drawer shadow-2xl';
  document.body.appendChild(drawer);
}

function updateBadges() {
  const favBadge = document.getElementById('favs-badge');
  const compBadge = document.getElementById('compare-badge');

  const favCount = FavoriteService.getFavorites().length;
  const compCount = CompareService.getCompareList().length;

  if (favBadge) {
    favBadge.textContent = favCount;
    favBadge.classList.toggle('hidden', favCount === 0);
  }

  if (compBadge) {
    compBadge.textContent = compCount;
    compBadge.classList.toggle('hidden', compCount === 0);
  }
}

async function renderCompareDrawer() {
  const container = document.getElementById('compare-drawer');
  if (!container) return;

  const compareIds = CompareService.getCompareList();
  if (compareIds.length === 0) {
    container.classList.add('translate-y-full');
    return;
  }

  // Load selected cars info
  const carPromises = compareIds.map(id => CarService.getCarById(id));
  const cars = await Promise.all(carPromises);

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-4 flex-wrap justify-center">
        <div class="text-sm font-semibold text-white mr-2">
          Comparing (${cars.length}/4)
        </div>
        <div class="flex items-center gap-3">
          ${cars.filter(c => c).map(car => `
            <div class="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-zinc-300">
              <img src="${car.images[0]}" class="w-8 h-6 object-cover rounded-md">
              <span class="truncate max-w-[100px]">${car.name}</span>
              <button class="remove-compare-item ml-1 text-zinc-500 hover:text-white transition" data-id="${car.id}">
                &times;
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button id="clear-all-compare" class="text-xs text-zinc-400 hover:text-white transition px-3 py-2">
          Clear All
        </button>
        <a href="compare.html" class="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition tracking-wide flex items-center gap-1.5 shadow-lg shadow-brand-600/20">
          Compare Now
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
          </svg>
        </a>
      </div>
    </div>
  `;

  // Animate slide up
  container.classList.remove('translate-y-full');

  // Bind close buttons
  container.querySelectorAll('.remove-compare-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      CompareService.removeCompare(id);
    });
  });

  const clearBtn = container.querySelector('#clear-all-compare');
  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      CompareService.clearCompare();
    });
  }
}

function setupMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}

function setupNewsletter() {
  const forms = document.querySelectorAll('form[id*="newsletter"], div[class*="newsletter"] button');
  forms.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const input = btn.parentElement.querySelector('input[type="email"]');
      if (!input || !input.value) return;
      e.preventDefault();
      
      const email = input.value.trim();
      if (email.includes('@')) {
        alert(`Thank you for subscribing, ${email}! You've been signed up for DriveX updates.`);
        input.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  });
}
