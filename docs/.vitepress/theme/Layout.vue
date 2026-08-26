<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ThreeDSphere from '../components/ThreeDSphere.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <!-- 把三维球注入首页 hero 的图片位 -->
    <template #home-hero-image>
      <ThreeDSphere />
    </template>
  </Layout>
</template>
