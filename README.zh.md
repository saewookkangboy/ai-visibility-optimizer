# AI Visibility Optimizer

基于AI的搜索引擎和生成式AI引擎优化集成解决方案

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

> **开源项目**: 这是一个任何人都可以自由使用、修改和分发的开源项目。

## 语言选择 / Language Selection

- [한국어 (Korean)](README.ko.md) | [English](README.en.md) | [中文 (Chinese)](README.zh.md) | [Español (Spanish)](README.es.md)

## 概述

AI Visibility Optimizer 是一个用于网络服务和应用程序的综合优化工具。它集成了 SEO、AI SEO、GEO（生成式引擎优化）和 AIO（一体化）优化，支持 AI 自动学习和持续的技术提升。

## 主要功能

### 1. SEO（搜索引擎优化）
- 搜索引擎优化分析
- 元标签和关键词分析
- Sitemap 和 Robots.txt 生成
- 结构化数据验证
- 移动优化分析
- 性能分析（Core Web Vitals）

### 2. AI SEO 优化
- 基于 AI 的关键词研究
- 自动内容优化
- 关键词密度和可读性分析
- 竞争对手关键词分析
- AI 引用监控
- 多模态内容优化

### 3. GEO（生成式引擎优化）
- 生成式 AI 搜索引擎优化（ChatGPT、Claude、Perplexity、Gemini 等）
- AI 友好的内容结构分析
- FAQ、HowTo、Article 架构生成
- 多 AI 引擎兼容性优化
- 引用和可信度提升
- llms.txt 和事实表生成

### 4. AIO（一体化）综合优化
- SEO、AI SEO、GEO 综合分析
- 性能、可访问性、安全性分析
- 社交媒体优化
- 自动优化和报告生成
- AI 反馈循环构建
- AI 可见性监控
- AEO（答案引擎优化）优化

### 5. 自动注入系统
- 在开发过程中自动将 SEO/AIO/GEO/AI SEO 应用到网络/应用服务
- 构建过程集成
- 实时优化应用
- 基于配置的自动化

### 6. Agent Lightning 集成
- 基于 Microsoft Agent Lightning 的强化学习集成
- 自动搜索和学习在线 SEO/AIO/GEO/AI SEO 相关内容
- 持续更新和技术提升
- 自动算法改进

### 7. AI 可见性分析
- AI 搜索引擎特定可见性分析
- 引用跟踪和监控
- 排名和曝光分析
- 性能提升自动化
- 多 AI 引擎对比分析

## 安装

### 基本安装

```bash
# 克隆仓库
git clone https://github.com/saewookkangboy/ai-visibility-optimizer.git
cd ai-visibility-optimizer

# 安装依赖
npm install

# 设置
npm run setup
```

### 全局安装（可选）

```bash
npm link
# 或
npm install -g .
```

安装后，您可以在任何地方使用 `ai-visibility` 命令。

## 使用方法

### 项目初始化

```bash
npm run init
# 或
ai-visibility init
```

### SEO 优化

```bash
# SEO 分析
ai-visibility seo analyze https://example.com

# 生成 Sitemap
ai-visibility seo sitemap -u https://example.com https://example.com/about

# 生成 Robots.txt
ai-visibility seo robots
```

### AI SEO 优化

```bash
# AI 关键词研究
ai-visibility ai-seo keywords "网页开发"

# 内容优化
ai-visibility ai-seo optimize "内容" -k "关键词1" "关键词2"

# 竞争对手分析
ai-visibility ai-seo competitors example.com -c competitor1.com
```

### GEO（生成式引擎优化）

```bash
# GEO 分析（AI 搜索引擎优化）
ai-visibility geo analyze https://example.com

# 生成 FAQ 架构
ai-visibility geo faq -q "问题1" "问题2"

# 生成 HowTo 架构
ai-visibility geo howto -n "指南名称" -s "步骤1" "步骤2"

# 生成 Article 架构
ai-visibility geo article -h "标题" -a "作者" -u "https://example.com"

# 生成式引擎优化
ai-visibility geo optimize https://example.com -e chatgpt claude perplexity
```

### AIO 综合优化

```bash
# 综合分析
ai-visibility aio analyze https://example.com

# 自动优化
ai-visibility aio optimize https://example.com

# 生成报告
ai-visibility aio report -f markdown

# AI 可见性监控
ai-visibility aio visibility https://example.com
```

### 自动注入系统

```bash
# 启用自动注入
ai-visibility auto-inject enable

# 构建集成设置
ai-visibility auto-inject setup --framework react
ai-visibility auto-inject setup --framework nextjs
ai-visibility auto-inject setup --framework vue

# 手动应用
ai-visibility auto-inject apply
```

### Agent Lightning 训练

```bash
# 开始训练
ai-visibility lightning train --episodes 100

# 启用在线学习
ai-visibility lightning online --enable

# 检查训练状态
ai-visibility lightning status
```

### AI 可见性分析

```bash
# AI 可见性分析
ai-visibility visibility analyze https://example.com

# 引用跟踪
ai-visibility visibility track https://example.com

# 性能提升
ai-visibility visibility optimize https://example.com
```

## 项目结构

```
ai-visibility-optimizer/
├── src/
│   ├── index.js                    # 主入口点
│   ├── modules/
│   │   ├── seo/                     # SEO 优化模块
│   │   ├── ai-seo/                  # AI SEO 优化模块
│   │   ├── geo/                     # GEO 优化模块
│   │   ├── aio/                     # AIO 综合优化模块
│   │   ├── auto-injector/           # 自动注入系统
│   │   ├── agent-lightning/         # Agent Lightning 集成
│   │   └── ai-visibility/           # AI 可见性分析
│   ├── utils/                       # 工具函数
│   └── config/                      # 配置文件
├── docs/
│   ├── SKILLS.md                    # Skills 文档
│   ├── BACKGROUND.md                # Background 指南
│   ├── ARCHITECTURE.md              # 架构文档
│   └── USAGE.md                     # 使用指南
├── config/                          # 配置文件
├── scripts/                         # 脚本
├── tests/                           # 测试
├── bin/
│   └── cli.js                       # CLI 入口点
├── .env.example                     # 环境变量示例
├── .gitignore                       # Git 忽略文件
└── package.json                     # 项目配置
```

## 文档

- [Skills 文档](docs/SKILLS.md) - SEO/AIO/GEO/AI SEO Skills 指南
- [Background 指南](docs/BACKGROUND.md) - 指南和算法设计
- [架构文档](docs/ARCHITECTURE.md) - 系统结构和设计
- [使用指南](docs/USAGE.md) - 详细使用说明

## 开发工作流

### 1. 初始设置

```bash
# 初始化项目
ai-visibility init

# 设置自动注入系统
ai-visibility auto-inject setup --framework nextjs
```

### 2. 开发中的自动优化

```bash
# 运行开发服务器时自动应用优化
npm run dev  # 自动应用 SEO/AIO/GEO/AI SEO
```

### 3. 分析和优化

```bash
# 综合分析
ai-visibility aio analyze https://example.com

# 自动优化
ai-visibility aio optimize https://example.com

# 检查 AI 可见性
ai-visibility visibility analyze https://example.com
```

### 4. 持续学习

```bash
# 启用 Agent Lightning 在线学习
ai-visibility lightning online --enable

# 定期学习和更新
ai-visibility lightning train --schedule daily
```

## 贡献

如果您想为项目做出贡献，请参考[贡献指南](CONTRIBUTING.md)。

欢迎错误报告、功能建议和 Pull Request！

## 许可证

MIT License

Copyright (c) 2025 Park chunghyo

这是一个任何人都可以自由使用、修改和分发的开源项目。

更多详情，请参考 [LICENSE](LICENSE) 文件。

## 参考资源

### 核心集成资源

- [Agent Lightning](https://github.com/microsoft/agent-lightning) - AI 强化学习
- [Schema.org](https://schema.org/) - 结构化数据
- [Google Search Central](https://developers.google.com/search) - SEO 指南

### 相关工具

- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - 网络性能分析
- [PageSpeed Insights](https://pagespeed.web.dev/) - 页面速度分析
- [Web.dev](https://web.dev/) - 网络开发指南

## 作者

**Park chunghyo**

- GitHub: [@saewookkangboy](https://github.com/saewookkangboy)
- 模块和包开发使用 Cursor AI 完成

## 星标

如果这个项目对您有帮助，请给它一个 ⭐！

