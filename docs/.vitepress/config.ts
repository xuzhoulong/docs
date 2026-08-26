import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/docs/',
  title: "XUZHOULONG",
  description: "个人网站",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '项目', link: '/#projects' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xuzhoulong' }
    ]
  }
})
