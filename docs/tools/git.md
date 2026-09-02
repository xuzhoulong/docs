---
title: Git
description: 常用 Git 命令、分支管理与提交规范
---

# Git

> 开发工具 · Git 使用笔记。本页为骨架内容,可按需继续补充。

## 常用命令

| 场景 | 命令 |
| --- | --- |
| 初始化仓库 | `git init` |
| 克隆仓库 | `git clone <url>` |
| 查看状态 | `git status` |
| 暂存改动 | `git add .` |
| 提交改动 | `git commit -m "msg"` |
| 查看历史 | `git log --oneline --graph` |

## 分支管理

```bash
git branch            # 查看本地分支
git checkout -b feat/x # 创建并切换分支
git merge feat/x       # 合并分支
git rebase main        # 变基,保持线性历史
```

## 提交规范

采用 [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` 新功能
- `fix:` 缺陷修复
- `docs:` 文档变更
- `style:` 代码格式(不影响逻辑)
- `refactor:` 重构
- `perf:` 性能优化
- `chore:` 构建/工具链
