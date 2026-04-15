import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import fs from 'node:fs'
import path from 'node:path'
import markdownItKatex from 'markdown-it-katex'

// ディレクトリ構造からサイドバーを自動生成する関数
function getSidebarItems(dir: string, baseDir: string = '') {
  const items: any[] = [];
  const fullPath = path.join(dir, baseDir);
  if (!fs.existsSync(fullPath)) return items;

  const files = fs.readdirSync(fullPath);
  for (const file of files) {
    if (file.startsWith('.') || file === 'node_modules' || file === 'index.md') continue;
    const filePath = path.join(fullPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      const children = getSidebarItems(dir, path.join(baseDir, file));
      if (children.length > 0) {
        items.push({
          text: file,
          collapsed: false,
          items: children
        });
      }
    } else if (file.endsWith('.md')) {
      const name = file.replace(/\.md$/, '');
      items.push({
        text: name,
        link: '/' + path.join(baseDir, name).replace(/\\/g, '/')
      });
    }
  }
  return items;
}

export default withMermaid(defineConfig({
  title: "サイレントスズカ",
  description: "異次元の逃亡者、サイレントスズカの非公式ファンサイト",
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.8/katex.min.css' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: '記事一覧', link: '/example' }
    ],
    sidebar: [
      {
        text: 'コンテンツ',
        items: getSidebarItems('.')
      }
    ],
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/silent-suzuka' }
    ]
  },
  markdown: {
    config: (md) => {
      md.use(markdownItKatex)
    }
  }
}));
