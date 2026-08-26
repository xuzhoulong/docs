<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
// @ts-ignore zdog 未提供类型声明
import Zdog from 'zdog'

const canvasRef = ref<HTMLCanvasElement | null>(null)

/* ---------- 常量 ---------- */
const DIAMETER = 260 // 球体直径（视口坐标）
const LINE_FALLBACK = '#ffffff80'
const DOT_FALLBACK = '#ffffff80'
// const LINE_FALLBACK = '#7c8cff'
// const DOT_FALLBACK = '#aab8ff'


/* ---------- 状态 ---------- */
let illo: any = null
let lineShapes: any[] = []
let dotShapes: any[] = []
let rafId = 0
let dragging = false
let zoomTarget = 1
let hoverZoom = 1
let themeObserver: MutationObserver | null = null
let initialized = false

const isDragging = ref(false)

function readThemeColor(variable: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
  return value || fallback
}

/* ---------- 搭建球体：经线 + 纬线 + 装饰亮点 ---------- */
function buildOrb() {
  const orb = new Zdog.Group({ addTo: illo })

  // 经线：6 条，每 30° 一条
  for (let i = 0; i < 6; i++) {
    lineShapes.push(
      new Zdog.Ellipse({
        addTo: orb,
        diameter: DIAMETER,
        stroke: 2,
        color: LINE_FALLBACK,
        rotate: { y: (i / 6) * Math.PI },
      }),
    )
  }

  // 纬线：赤道 ± 30°/60°
  for (const lat of [-60, -30, 0, 30, 60]) {
    const rad = (lat * Math.PI) / 180
    const r = (DIAMETER / 2) * Math.cos(rad)
    lineShapes.push(
      new Zdog.Ellipse({
        addTo: orb,
        width: r * 2,
        height: r * 2,
        stroke: 2,
        color: LINE_FALLBACK,
        translate: { z: (DIAMETER / 2) * Math.sin(rad) },
      }),
    )
  }

  // 装饰亮点：斐波那契球面均匀分布
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < 48; i++) {
    const y = 1 - (i / 47) * 2
    const rr = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = goldenAngle * i
    dotShapes.push(
      new Zdog.Shape({
        addTo: orb,
        stroke: 3,
        color: DOT_FALLBACK,
        translate: {
          x: rr * Math.cos(theta) * (DIAMETER / 2),
          y: y * (DIAMETER / 2),
          z: rr * Math.sin(theta) * (DIAMETER / 2),
        },
      }),
    )
  }
}

/* 深浅色主题切换时，线条/亮点颜色跟随 --vp-c-brand-* 变化 */
function applyTheme() {
  // const line = readThemeColor('--vp-c-brand-1', LINE_FALLBACK)
  // const dot = readThemeColor('--vp-c-brand-2', DOT_FALLBACK)
  const theme = getCurrentTheme()
  const line = theme === 'dark' ? '#7c8cff' : '#ffffff80'
  const dot = theme === 'dark' ? '#aab8ff' : '#ffffff80'
  lineShapes.forEach((s) => { s.color = line })
  dotShapes.forEach((s) => { s.color = dot })
}
function getCurrentTheme() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}
function animate() {
  if (illo) {
    if (!dragging) illo.rotate.y += 0.004 // 待机自转
    // 缩放平滑过渡
    illo.zoom += (zoomTarget * hoverZoom - illo.zoom) * 0.1
    illo.updateRenderGraph()
  }
  rafId = requestAnimationFrame(animate)
}

/* ---------- 鼠标交互 ---------- */
function onWheel(e: WheelEvent) {
  return
  e.preventDefault()
  zoomTarget = Math.max(0.8, Math.min(1.6, zoomTarget - Math.sign(e.deltaY) * 0.1))
}

function onEnter() { hoverZoom = 1.06 } // 悬停轻微放大
function onLeave() { hoverZoom = 1 }

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas || initialized) return
  initialized = true

  illo = new Zdog.Illustration({
    element: canvas,
    dragRotate: true, // Zdog 内置拖拽旋转
    resize: true, // 跟随容器/窗口尺寸变化
    rotate: { x: -0.35, y: 0.6 },
    onDragStart: () => { dragging = true; isDragging.value = true },
    onDragEnd: () => { dragging = false; isDragging.value = false },
  })

  applyTheme()
  buildOrb()
  illo.updateRenderGraph()

  // 监听主题 class 变化（html.dark 等），重取品牌色
  themeObserver = new MutationObserver(applyTheme)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  rafId = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  themeObserver?.disconnect()
})
</script>

<template>
  <div
    class="sphere-scene"
    :class="{ 'is-dragging': isDragging }"
    @wheel.prevent="onWheel"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <canvas ref="canvasRef" class="sphere-canvas" aria-label="三维球体，可拖拽旋转" />
  </div>
</template>

<style scoped>
.sphere-scene {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 300px;
  max-height: 460px;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
}

.sphere-scene.is-dragging {
  cursor: grabbing;
}

.sphere-canvas {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
}

/* 背景光晕，随鼠标悬停增强 */
.sphere-scene::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(300px, 78%);
  aspect-ratio: 1;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, var(--vp-c-brand-soft), transparent 65%);
  filter: blur(12px);
  animation: sphere-pulse 4.5s ease-in-out infinite;
  pointer-events: none;
}

.sphere-scene:hover::before {
  filter: blur(12px) saturate(1.5);
}

@keyframes sphere-pulse {
  0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
  50%      { opacity: 1;    transform: translate(-50%, -50%) scale(1.06); }
}
</style>
