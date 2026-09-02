---
title: 代码规范
description: 统一风格、提升可维护性的约定
---

# 代码规范

> 开发技巧 · 让协作更顺畅。本页为骨架内容,可按需继续补充。

## 为什么要规范

- 降低阅读与维护成本
- 减少无意义的格式争论
- 让 diff 更聚焦于逻辑变化

## 工具链

- **ESLint** — 语法与最佳实践检查
- **Prettier** — 统一格式化
- **Stylelint** — 样式规范
- **Commitlint + husky** — 提交信息校验
- **EditorConfig** — 跨编辑器基础一致

## 命名约定

| 类型 | 风格 | 示例 |
| --- | --- | --- |
| 变量/函数 | camelCase | `getUserInfo` |
| 类/组件 | PascalCase | `UserCard` |
| 常量 | UPPER_SNAKE | `MAX_RETRY` |
| 文件(组件) | PascalCase | `UserCard.vue` |
| CSS 类 | kebab-case | `.user-card` |

> 规范的价值在于**自动执行**而非口头约定,尽量用工具在提交前拦截。
