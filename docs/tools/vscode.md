---
title: VS Code
description: 推荐扩展、快捷键与个性化配置
---

# VS Code

> 开发工具 · VS Code 效率配置笔记。本页为骨架内容,可按需继续补充。

## 推荐扩展

- **ESLint** — 实时代码检查
- **Prettier** — 统一代码格式化
- **EditorConfig for VS Code** — 尊重 `.editorconfig`
- **GitLens** — 增强 Git 内联提示
- **Error Lens** — 行内高亮错误/警告

## 高频快捷键

| 功能 | Windows |
| --- | --- |
| 命令面板 | `Ctrl + Shift + P` |
| 全局搜索 | `Ctrl + Shift + F` |
| 快速打开文件 | `Ctrl + P` |
| 多光标同名选中 | `Ctrl + D` |
| 折叠/展开代码块 | `Ctrl + Shift + [` / `]` |

## 常用设置片段

```jsonc
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "files.eol": "\n",
  "git.autofetch": true
}
```
