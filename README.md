# AI Visibility Optimizer

AI 기반 검색 엔진 및 생성형 AI 엔진 최적화 통합 솔루션

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

> **오픈소스 프로젝트**: 이 프로젝트는 누구나 자유롭게 사용, 수정 및 배포할 수 있는 오픈소스 프로젝트입니다.  
> **Open Source Project**: This is an open-source project that anyone can use, modify, and distribute freely.

## 개요

AI Visibility Optimizer는 웹 서비스와 앱 서비스를 위한 종합 최적화 도구입니다. SEO, AI SEO, GEO (Generative Engine Optimization), AIO (All-In-One) 최적화를 통합하여 제공하며, AI 자동 학습 및 지속적인 기술 고도화를 지원합니다.

## 주요 기능

### 1. SEO (Search Engine Optimization) 최적화
- 검색 엔진 최적화 분석
- 메타 태그 및 키워드 분석
- Sitemap 및 Robots.txt 생성
- 구조화된 데이터 검증
- 모바일 최적화 분석
- 성능 분석 (Core Web Vitals)

### 2. AI SEO 최적화
- AI 기반 키워드 리서치
- 콘텐츠 자동 최적화
- 키워드 밀도 및 가독성 분석
- 경쟁사 키워드 분석
- AI 인용 모니터링
- 멀티모달 콘텐츠 최적화

### 3. GEO (Generative Engine Optimization) 최적화
- 생성형 AI 검색 엔진 최적화 (ChatGPT, Claude, Perplexity, Gemini 등)
- AI 친화적인 콘텐츠 구조 분석
- FAQ, HowTo, Article 스키마 생성
- 다중 AI 엔진 호환성 최적화
- 인용 가능성 및 신뢰도 향상
- llms.txt 및 팩트 시트 생성

### 4. AIO (All-In-One) 종합 최적화
- SEO, AI SEO, GEO 종합 분석
- 성능, 접근성, 보안 분석
- 소셜 미디어 최적화
- 자동 최적화 및 리포트 생성
- AI 피드백 루프 구축
- AI 가시성 모니터링
- AEO (Answer Engine Optimization) 최적화

### 5. 자동 반영 시스템 (Auto Injector)
- 개발 진행 시 자동으로 웹서비스/앱 서비스에 SEO/AIO/GEO/AI SEO 반영
- 빌드 프로세스 통합
- 실시간 최적화 적용
- 설정 기반 자동화

### 6. Agent Lightning 통합
- Microsoft Agent Lightning 기반 강화학습 통합
- 온라인 SEO/AIO/GEO/AI SEO 관련 내용 자동 검색 및 학습
- 지속적인 업데이트 및 기술 고도화
- 자동 알고리즘 개선

### 7. AI Visibility 분석
- AI 검색 엔진별 가시성 분석
- 인용 추적 및 모니터링
- 순위 및 노출 분석
- 성능 고도화 자동화
- 다중 AI 엔진 비교 분석

## 설치

### 기본 설치

```bash
# 저장소 클론
git clone https://github.com/saewookkangboy/ai-visibility-optimizer.git
cd ai-visibility-optimizer

# 의존성 설치
npm install

# 설정
npm run setup
```

### 전역 설치 (선택사항)

```bash
npm link
# 또는
npm install -g .
```

설치 후 `ai-visibility` 명령어를 어디서나 사용할 수 있습니다.

## 사용 방법

### 프로젝트 초기화

```bash
npm run init
# 또는
ai-visibility init
```

### SEO 최적화

```bash
# SEO 분석
ai-visibility seo analyze https://example.com

# Sitemap 생성
ai-visibility seo sitemap -u https://example.com https://example.com/about

# Robots.txt 생성
ai-visibility seo robots
```

### AI SEO 최적화

```bash
# AI 키워드 리서치
ai-visibility ai-seo keywords "웹 개발"

# 콘텐츠 최적화
ai-visibility ai-seo optimize "콘텐츠 내용" -k "키워드1" "키워드2"

# 경쟁사 분석
ai-visibility ai-seo competitors example.com -c competitor1.com
```

### GEO (Generative Engine Optimization) 최적화

```bash
# GEO 분석 (AI 검색 엔진 최적화)
ai-visibility geo analyze https://example.com

# FAQ 스키마 생성
ai-visibility geo faq -q "질문1" "질문2"

# HowTo 스키마 생성
ai-visibility geo howto -n "가이드명" -s "단계1" "단계2"

# Article 스키마 생성
ai-visibility geo article -h "제목" -a "작성자" -u "https://example.com"

# 생성형 엔진 최적화
ai-visibility geo optimize https://example.com -e chatgpt claude perplexity
```

### AIO 종합 최적화

```bash
# 종합 분석
ai-visibility aio analyze https://example.com

# 자동 최적화
ai-visibility aio optimize https://example.com

# 리포트 생성
ai-visibility aio report -f markdown

# AI 가시성 모니터링
ai-visibility aio visibility https://example.com
```

### 자동 반영 시스템

```bash
# 자동 반영 활성화
ai-visibility auto-inject enable

# 빌드 통합 설정
ai-visibility auto-inject setup --framework react
ai-visibility auto-inject setup --framework nextjs
ai-visibility auto-inject setup --framework vue

# 수동 적용
ai-visibility auto-inject apply
```

### Agent Lightning 학습

```bash
# 학습 시작
ai-visibility lightning train --episodes 100

# 온라인 학습 활성화
ai-visibility lightning online --enable

# 학습 상태 확인
ai-visibility lightning status
```

### AI Visibility 분석

```bash
# AI 가시성 분석
ai-visibility visibility analyze https://example.com

# 인용 추적
ai-visibility visibility track https://example.com

# 성능 고도화
ai-visibility visibility optimize https://example.com
```

## 프로젝트 구조

```
ai-visibility-optimizer/
├── src/
│   ├── index.js                    # 메인 진입점
│   ├── modules/
│   │   ├── seo/                    # SEO 최적화 모듈
│   │   ├── ai-seo/                  # AI SEO 최적화 모듈
│   │   ├── geo/                     # GEO 최적화 모듈
│   │   ├── aio/                     # AIO 종합 최적화 모듈
│   │   ├── auto-injector/           # 자동 반영 시스템
│   │   ├── agent-lightning/         # Agent Lightning 통합
│   │   └── ai-visibility/           # AI Visibility 분석
│   ├── utils/                       # 유틸리티 함수
│   └── config/                      # 설정 파일
├── docs/
│   ├── SKILLS.md                    # Skills 문서
│   ├── BACKGROUND.md                # Background 가이드
│   ├── ARCHITECTURE.md              # 아키텍처 문서
│   └── USAGE.md                     # 사용 가이드
├── config/                          # 설정 파일
├── scripts/                         # 스크립트
├── tests/                           # 테스트
├── bin/
│   └── cli.js                       # CLI 진입점
├── .env.example                     # 환경 변수 예시
├── .gitignore                       # Git 무시 파일
└── package.json                     # 프로젝트 설정
```

## 문서

- [Skills 문서](docs/SKILLS.md) - SEO/AIO/GEO/AI SEO Skills 가이드
- [Background 가이드](docs/BACKGROUND.md) - 가이드라인 및 알고리즘 설계
- [아키텍처 문서](docs/ARCHITECTURE.md) - 시스템 구조 및 설계
- [사용 가이드](docs/USAGE.md) - 상세한 사용 방법

## 개발 워크플로우

### 1. 초기 설정

```bash
# 프로젝트 초기화
ai-visibility init

# 자동 반영 시스템 설정
ai-visibility auto-inject setup --framework nextjs
```

### 2. 개발 중 자동 최적화

```bash
# 개발 서버 실행 시 자동 최적화 적용
npm run dev  # 자동으로 SEO/AIO/GEO/AI SEO 반영
```

### 3. 분석 및 최적화

```bash
# 종합 분석
ai-visibility aio analyze https://example.com

# 자동 최적화
ai-visibility aio optimize https://example.com

# AI 가시성 확인
ai-visibility visibility analyze https://example.com
```

### 4. 지속적 학습

```bash
# Agent Lightning 온라인 학습 활성화
ai-visibility lightning online --enable

# 주기적 학습 및 업데이트
ai-visibility lightning train --schedule daily
```

## 기여하기

프로젝트에 기여하고 싶으시다면 [기여 가이드](CONTRIBUTING.md)를 참고해주세요.

버그 리포트, 기능 제안, Pull Request를 환영합니다!

## 라이선스

MIT License

Copyright (c) 2025 Park chunghyo

이 프로젝트는 누구나 자유롭게 사용, 수정 및 배포할 수 있는 오픈소스 프로젝트입니다.  
This is an open-source project that anyone can use, modify, and distribute freely.

자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.

## 참고 리소스

### 핵심 통합 리소스

- [Agent Lightning](https://github.com/microsoft/agent-lightning) - AI 강화학습
- [Schema.org](https://schema.org/) - 구조화된 데이터
- [Google Search Central](https://developers.google.com/search) - SEO 가이드

### 관련 도구

- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - 웹 성능 분석
- [PageSpeed Insights](https://pagespeed.web.dev/) - 페이지 속도 분석
- [Web.dev](https://web.dev/) - 웹 개발 가이드

## 작성자

**Park chunghyo**

- GitHub: [@saewookkangboy](https://github.com/saewookkangboy)

## 스타

이 프로젝트가 도움이 되셨다면 ⭐를 눌러주세요!

