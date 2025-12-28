# AI Visibility Optimizer

AI-powered search engine and generative AI engine optimization integrated solution

<img width="2752" height="1536" alt="title img" src="https://github.com/user-attachments/assets/05df2f27-5ffa-4e21-a5c8-29c6778ca893" />

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

> **Open Source Project**: This is an open-source project that anyone can use, modify, and distribute freely.

## Language Selection

- [한국어 (Korean)](README.ko.md) | [English](README.en.md) | [中文 (Chinese)](README.zh.md) | [Español (Spanish)](README.es.md)

## Overview

AI Visibility Optimizer is a comprehensive optimization tool for web services and applications. It integrates SEO, AI SEO, GEO (Generative Engine Optimization), and AIO (All-In-One) optimization, supporting AI automatic learning and continuous technical advancement.

## Key Features

### 1. SEO (Search Engine Optimization)
- Search engine optimization analysis
- Meta tags and keyword analysis
- Sitemap and Robots.txt generation
- Structured data validation
- Mobile optimization analysis
- Performance analysis (Core Web Vitals)

### 2. AI SEO Optimization
- AI-based keyword research
- Automatic content optimization
- Keyword density and readability analysis
- Competitor keyword analysis
- AI citation monitoring
- Multimodal content optimization

### 3. GEO (Generative Engine Optimization)
- Generative AI search engine optimization (ChatGPT, Claude, Perplexity, Gemini, etc.)
- AI-friendly content structure analysis
- FAQ, HowTo, Article schema generation
- Multi-AI engine compatibility optimization
- Citation and credibility enhancement
- llms.txt and fact sheet generation

### 4. AIO (All-In-One) Comprehensive Optimization
- SEO, AI SEO, GEO comprehensive analysis
- Performance, accessibility, security analysis
- Social media optimization
- Automatic optimization and report generation
- AI feedback loop construction
- AI visibility monitoring
- AEO (Answer Engine Optimization) optimization

### 5. Auto Injector System
- Automatically apply SEO/AIO/GEO/AI SEO to web/app services during development
- Build process integration
- Real-time optimization application
- Configuration-based automation

### 6. Agent Lightning Integration
- Microsoft Agent Lightning-based reinforcement learning integration
- Automatic search and learning of online SEO/AIO/GEO/AI SEO content
- Continuous updates and technical advancement
- Automatic algorithm improvement

### 7. AI Visibility Analysis
- AI search engine-specific visibility analysis
- Citation tracking and monitoring
- Ranking and exposure analysis
- Performance enhancement automation
- Multi-AI engine comparative analysis

## Installation

### Basic Installation

```bash
# Clone repository
git clone https://github.com/saewookkangboy/ai-visibility-optimizer.git
cd ai-visibility-optimizer

# Install dependencies
npm install

# Setup
npm run setup
```

### Global Installation (Optional)

```bash
npm link
# or
npm install -g .
```

After installation, you can use the `ai-visibility` command anywhere.

## Usage

### Project Initialization

```bash
npm run init
# or
ai-visibility init
```

### SEO Optimization

```bash
# SEO analysis
ai-visibility seo analyze https://example.com

# Generate Sitemap
ai-visibility seo sitemap -u https://example.com https://example.com/about

# Generate Robots.txt
ai-visibility seo robots
```

### AI SEO Optimization

```bash
# AI keyword research
ai-visibility ai-seo keywords "web development"

# Content optimization
ai-visibility ai-seo optimize "content" -k "keyword1" "keyword2"

# Competitor analysis
ai-visibility ai-seo competitors example.com -c competitor1.com
```

### GEO (Generative Engine Optimization)

```bash
# GEO analysis (AI search engine optimization)
ai-visibility geo analyze https://example.com

# Generate FAQ schema
ai-visibility geo faq -q "Question1" "Question2"

# Generate HowTo schema
ai-visibility geo howto -n "Guide Name" -s "Step1" "Step2"

# Generate Article schema
ai-visibility geo article -h "Title" -a "Author" -u "https://example.com"

# Optimize for generative engines
ai-visibility geo optimize https://example.com -e chatgpt claude perplexity
```

### AIO Comprehensive Optimization

```bash
# Comprehensive analysis
ai-visibility aio analyze https://example.com

# Automatic optimization
ai-visibility aio optimize https://example.com

# Generate report
ai-visibility aio report -f markdown

# AI visibility monitoring
ai-visibility aio visibility https://example.com
```

### Auto Injector System

```bash
# Enable auto injection
ai-visibility auto-inject enable

# Build integration setup
ai-visibility auto-inject setup --framework react
ai-visibility auto-inject setup --framework nextjs
ai-visibility auto-inject setup --framework vue

# Manual apply
ai-visibility auto-inject apply
```

### Agent Lightning Training

```bash
# Start training
ai-visibility lightning train --episodes 100

# Enable online learning
ai-visibility lightning online --enable

# Check training status
ai-visibility lightning status
```

### AI Visibility Analysis

```bash
# AI visibility analysis
ai-visibility visibility analyze https://example.com

# Citation tracking
ai-visibility visibility track https://example.com

# Performance enhancement
ai-visibility visibility optimize https://example.com
```

## Project Structure

```
ai-visibility-optimizer/
├── src/
│   ├── index.js                    # Main entry point
│   ├── modules/
│   │   ├── seo/                     # SEO optimization module
│   │   ├── ai-seo/                  # AI SEO optimization module
│   │   ├── geo/                     # GEO optimization module
│   │   ├── aio/                     # AIO comprehensive optimization module
│   │   ├── auto-injector/           # Auto injector system
│   │   ├── agent-lightning/         # Agent Lightning integration
│   │   └── ai-visibility/           # AI Visibility analysis
│   ├── utils/                       # Utility functions
│   └── config/                      # Configuration files
├── docs/
│   ├── SKILLS.md                    # Skills documentation
│   ├── BACKGROUND.md                # Background guide
│   ├── ARCHITECTURE.md              # Architecture documentation
│   └── USAGE.md                     # Usage guide
├── config/                          # Configuration files
├── scripts/                         # Scripts
├── tests/                           # Tests
├── bin/
│   └── cli.js                       # CLI entry point
├── .env.example                     # Environment variables example
├── .gitignore                       # Git ignore file
└── package.json                     # Project configuration
```

## Documentation

- [Skills Documentation](docs/SKILLS.md) - SEO/AIO/GEO/AI SEO Skills guide
- [Background Guide](docs/BACKGROUND.md) - Guidelines and algorithm design
- [Architecture Documentation](docs/ARCHITECTURE.md) - System structure and design
- [Usage Guide](docs/USAGE.md) - Detailed usage instructions

## Development Workflow

### 1. Initial Setup

```bash
# Initialize project
ai-visibility init

# Setup auto injector system
ai-visibility auto-inject setup --framework nextjs
```

### 2. Automatic Optimization During Development

```bash
# Automatic optimization applied when running dev server
npm run dev  # Automatically applies SEO/AIO/GEO/AI SEO
```

### 3. Analysis and Optimization

```bash
# Comprehensive analysis
ai-visibility aio analyze https://example.com

# Automatic optimization
ai-visibility aio optimize https://example.com

# Check AI visibility
ai-visibility visibility analyze https://example.com
```

### 4. Continuous Learning

```bash
# Enable Agent Lightning online learning
ai-visibility lightning online --enable

# Periodic learning and updates
ai-visibility lightning train --schedule daily
```

## Contributing

If you want to contribute to the project, please refer to the [Contributing Guide](CONTRIBUTING.md).

Bug reports, feature suggestions, and Pull Requests are welcome!

## License

MIT License

Copyright (c) 2025 Park chunghyo

This is an open-source project that anyone can use, modify, and distribute freely.

For more details, please refer to the [LICENSE](LICENSE) file.

## Reference Resources

### Core Integration Resources

- [Agent Lightning](https://github.com/microsoft/agent-lightning) - AI reinforcement learning
- [Schema.org](https://schema.org/) - Structured data
- [Google Search Central](https://developers.google.com/search) - SEO guide

### Related Tools

- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Web performance analysis
- [PageSpeed Insights](https://pagespeed.web.dev/) - Page speed analysis
- [Web.dev](https://web.dev/) - Web development guide

## Author

**Park chunghyo**

- GitHub: [@saewookkangboy](https://github.com/saewookkangboy)
- Module and package development was done with Cursor AI

## Star

If this project was helpful, please give it a ⭐!

