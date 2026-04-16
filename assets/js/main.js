// Theme management
const initTheme = () => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
                  (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
        document.documentElement.classList.add('dark');
        updateThemeIcons(true);
    }
};

const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcons(isDark);
};

const updateThemeIcons = (isDark) => {
    const icons = document.querySelectorAll('.theme-toggle-icon');
    icons.forEach(icon => {
        icon.textContent = isDark ? '☀️' : '🌙';
    });
};

// Mobile menu
const toggleMobileMenu = () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
};

// Search Logic
const searchIndex = [
    { url: 'history.html', title: '競走履歴', text: '毎日王冠 金鯱賞 1998 宝塚記念 天皇賞' },
    { url: 'scenes.html', title: '名場面', text: '大逃げ 11馬身 57.4秒 最後のレース' },
    { url: 'memoirs.html', title: '回顧録', text: '武豊 岡部幸雄 藤田伸二 ジョッキー 騎手' },
    { url: 'board.html', title: '掲示板', text: 'ファン掲示板 書き込み メッセージ 交流' },
    { url: 'memorial.html', title: 'メモリアル', text: '平取町 稲原牧場 お墓 墓参' },
    { url: 'goods.html', title: 'コレクション', text: 'ぬいぐるみ グッズ' }
];

const initSearch = () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if (!searchInput || !searchResults) return;

    searchInput.oninput = (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) {
            searchResults.classList.add('hidden');
            return;
        }

        const matches = searchIndex.filter(p => 
            p.title.includes(query) || p.text.includes(query)
        );

        if (matches.length > 0) {
            searchResults.innerHTML = matches.map(m => `
                <a href="${m.url}" class="block w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-stone-700 border-b dark:border-stone-700 last:border-0 transition">
                    <div class="font-bold text-sm text-green-primary dark:text-green-400">${m.title}</div>
                    <div class="text-xs text-gray-500 truncate">${m.text}</div>
                </a>
            `).join('');
            searchResults.classList.remove('hidden');
        } else {
            searchResults.innerHTML = '<div class="p-4 text-xs text-gray-400">見つかりません</div>';
            searchResults.classList.remove('hidden');
        }
    };

    // Close search on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#searchInput') && !e.target.closest('#searchResults')) {
            searchResults.classList.add('hidden');
        }
    });
};

// View Count Logic
const initViewCount = () => {
    const viewCountEl = document.getElementById('viewCount');
    if (!viewCountEl) return;

    let count = parseInt(localStorage.getItem('page_views') || '128402'); // Starting with a high base number
    count++;
    localStorage.setItem('page_views', count);
    
    // Animate counter
    let current = count - 100; // Start animation from 100 below
    if (current < 0) current = 0;
    
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuad = t => t * (2 - t);
        const val = Math.floor(current + (count - current) * easeOutQuad(progress));
        
        viewCountEl.textContent = val.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    requestAnimationFrame(animate);
};

// Initialize everything on load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSearch();
    initViewCount();
});
