<script setup lang="ts">
interface Project {
  icon: string
  title: string
  desc: string
  tags: string[]
  link: string
}

// TODO: 把下面这些占位项目替换成你自己的真实项目
const projects: Project[] = [
  {
    icon: '⚡',
    title: 'VitePress 个人网站',
    desc: '本网站：VitePress + 自定义三维球交互与项目卡片展示。',
    tags: ['VitePress', 'Vue', 'TypeScript'],
    link: '/',
  },
  {
    icon: '📦',
    title: 'Awesome Tools',
    desc: '收集并实现的常用前端工具库：日期、格式化、数组、类型守卫等。',
    tags: ['TypeScript', 'npm'],
    link: 'https://github.com/xuzhoulong/awesome-tools',
  },
  {
    icon: '🖥️',
    title: 'DataV 可视化组件',
    desc: '基于 Canvas / SVG 的数据可视化组件集，支持大屏配置与主题切换。',
    tags: ['Vue', 'Canvas', 'ECharts'],
    link: 'https://github.com/xuzhoulong/datav-components',
  },
  {
    icon: '🤖',
    title: 'AI Chat 助手',
    desc: '接入大模型 API 的 Web 聊天应用，支持会话管理、Markdown 渲染。',
    tags: ['AI', 'WebSocket', 'Vue'],
    link: 'https://github.com/xuzhoulong/ai-chat',
  },
  {
    icon: '📝',
    title: '技术博客',
    desc: '记录前端、工程化与三维图形相关的学习笔记与踩坑经验。',
    tags: ['Blog', 'Markdown'],
    link: 'https://github.com/xuzhoulong/blog',
  },
  {
    icon: '🧩',
    title: 'CLI 脚手架',
    desc: '快速生成项目模板的命令行工具，支持交互式问答与模板扩展。',
    tags: ['Node.js', 'CLI'],
    link: 'https://github.com/xuzhoulong/create-starter',
  },
]

function onMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const nx = (e.clientX - rect.left) / rect.width - 0.5
  const ny = (e.clientY - rect.top) / rect.height - 0.5
  el.style.setProperty('--tilt-x', `${(-ny * 10).toFixed(2)}deg`)
  el.style.setProperty('--tilt-y', `${(nx * 12).toFixed(2)}deg`)
  el.style.setProperty('--glare-x', `${((nx + 0.5) * 100).toFixed(1)}%`)
  el.style.setProperty('--glare-y', `${((ny + 0.5) * 100).toFixed(1)}%`)
}

function onLeave(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  el.style.setProperty('--tilt-x', '0deg')
  el.style.setProperty('--tilt-y', '0deg')
}
</script>

<template>
  <div id="projects" class="projects">
    <h2 class="projects-title">
      <span class="projects-title-mark">✦</span>
      个人项目
    </h2>
    <p class="projects-subtitle">这里展示我的一些开源与个人项目，点击卡片即可跳转。</p>

    <div class="projects-grid">
      <a
        v-for="p in projects"
        :key="p.title"
        class="project-card"
        :href="p.link"
        :target="p.link.startsWith('http') ? '_blank' : undefined"
        :rel="p.link.startsWith('http') ? 'noopener noreferrer' : undefined"
        @mousemove="onMove"
        @mouseleave="onLeave"
      >
        <span class="card-glare" />
        <span class="card-icon">{{ p.icon }}</span>
        <h3 class="card-title">{{ p.title }}</h3>
        <p class="card-desc">{{ p.desc }}</p>
        <div class="card-tags">
          <span v-for="t in p.tags" :key="t" class="card-tag">{{ t }}</span>
        </div>
        <span class="card-arrow">跳转 →</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.projects {
  padding: 16px 0 8px;
}

.projects-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 8px;
  font-size: 28px;
  line-height: 1.4;
  border-top: none !important;
  padding-top: 0 !important;
}

.projects-title-mark {
  color: var(--vp-c-brand-1);
  font-size: 20px;
}

.projects-subtitle {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.project-card {
  position: relative;
  display: block;
  padding: 22px 22px 18px;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  overflow: hidden;
  text-decoration: none !important;
  color: var(--vp-c-text-1);
  transform: perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateY(-2px);
  transition: transform 0.18s ease-out, box-shadow 0.25s ease, border-color 0.25s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  will-change: transform;
}

.project-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.14);
  transform: perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateY(-4px);
}

/* 跟随鼠标的光晕 */
.card-glare {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    260px circle at var(--glare-x, 50%) var(--glare-y, 50%),
    var(--vp-c-brand-soft),
    transparent 62%
  );
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.project-card:hover .card-glare {
  opacity: 1;
}

.card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  font-size: 22px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 14px;
}

.card-title {
  margin: 0 0 8px;
  font-size: 17px;
  line-height: 1.4;
  border: none !important;
  padding: 0 !important;
}

.card-desc {
  margin: 0 0 14px;
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.card-tag {
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 12px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-soft);
}

.card-arrow {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.project-card:hover .card-arrow {
  opacity: 1;
  transform: none;
}
</style>
