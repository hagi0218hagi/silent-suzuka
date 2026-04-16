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

// Initialize everything on load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSearch();
});
