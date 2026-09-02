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
      {
        text: '文档',
        // 下拉只展示分组入口，点击分组进入其落地页；具体文档改由左侧侧边栏展示
        activeMatch: '/(tools|tips|openPro)/',
        items: [
          { text: '开发工具', link: '/tools/' },
          { text: '开发技巧', link: '/tips/' },
          { text: '开源项目', link: '/openPro/cesium' },
          // { text: '开源项目', link: '/openPro/' },
        ],
      },
    ],

    // 多侧边栏：按路径前缀区分，进入某个分组时左侧展示该分组下的全部文档
    // 后续新增分组时，在此追加一个路径前缀对应的侧边栏即可
    sidebar: {
      '/tools/': [
        {
          text: '开发工具',
          items: [
            { text: 'Git', link: '/tools/git' },
            { text: 'VS Code', link: '/tools/vscode' },
            { text: 'Chrome DevTools', link: '/tools/chrome-devtools' },
          ],
        },
      ],
      '/tips/': [
        {
          text: '开发技巧',
          items: [
            { text: '调试技巧', link: '/tips/debugging' },
            { text: '性能优化', link: '/tips/performance' },
            { text: '代码规范', link: '/tips/code-style' },
          ],
        },
      ],
      '/openPro/': [
        {
          text: '开源项目',
          items: [
            { text: 'Cesium', link: '/openPro/cesium' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xuzhoulong' }
    ]
  }
})
