import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import './custom.css'  // ← 关键：引入自定义样式
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ProjectsSection', ProjectsSection)
  },
} satisfies Theme
