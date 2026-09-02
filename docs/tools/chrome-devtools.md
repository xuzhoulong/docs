---
title: Chrome DevTools
description: 调试、性能与网络分析面板速查
---

# Chrome DevTools

> 开发工具 · 浏览器调试利器笔记。本页为骨架内容,可按需继续补充。

## 面板速查

- **Elements** — 查看/修改 DOM 与样式
- **Console** — 执行脚本、查看日志
- **Sources** — 断点调试、查看请求源码
- **Network** — 分析请求耗时、瀑布图
- **Performance** — 记录运行时性能、定位长任务
- **Application** — 查看 LocalStorage、Cookie、缓存

## 常用调试技巧

- 在 Sources 中用 `debugger` 或点击行号打断点。
- Network 面板勾选 `Disable cache` 排除缓存干扰。
- 用 `console.table()` 打印数组/对象,更易读。
- 用 `console.time()` / `console.timeEnd()` 测量代码块耗时。

## 快捷键

| 功能 | 快捷键 |
| --- | --- |
| 打开 DevTools | `F12` / `Ctrl + Shift + I` |
| 打开命令菜单 | `Ctrl + Shift + P` |
| 全局搜索源码 | `Ctrl + Shift + F` |
