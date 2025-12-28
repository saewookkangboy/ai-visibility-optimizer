# SEO/AIO/GEO/AI SEO Skills 가이드

이 문서는 AI Visibility Optimizer에서 제공하는 SEO, AI SEO, GEO, AIO 최적화 Skills에 대한 상세 가이드입니다.

## 목차

1. [SEO Skills](#seo-skills)
2. [AI SEO Skills](#ai-seo-skills)
3. [GEO Skills](#geo-skills)
4. [AIO Skills](#aio-skills)
5. [통합 Skills](#통합-skills)

## SEO Skills

### 기본 SEO 분석

**기능**: 웹사이트의 기본 SEO 요소를 분석합니다.

**사용법**:
```bash
ai-visibility seo analyze <url>
```

**분석 항목**:
- 메타 태그 (Title, Description)
- 키워드 분석
- 구조화된 데이터 (JSON-LD)
- 모바일 최적화
- 성능 (Core Web Vitals)
- 백링크 품질

**출력**:
- SEO 점수 (0-100)
- 발견된 문제점
- 권장사항

### Sitemap 생성

**기능**: XML Sitemap을 자동으로 생성합니다.

**사용법**:
```bash
ai-visibility seo sitemap -u <url1> <url2> ...
```

**특징**:
- 자동 URL 구조 분석
- 우선순위 및 변경 빈도 설정
- 다국어 지원

### Robots.txt 생성

**기능**: 검색 엔진 크롤러를 위한 robots.txt 파일을 생성합니다.

**사용법**:
```bash
ai-visibility seo robots
```

**설정 옵션**:
- Allow/Disallow 경로 설정
- 크롤러별 규칙
- Sitemap 위치 지정

## AI SEO Skills

### AI 키워드 리서치

**기능**: AI를 활용하여 최적의 키워드를 연구합니다.

**사용법**:
```bash
ai-visibility ai-seo keywords "<주제>"
```

**제공 정보**:
- 주요 키워드
- 보조 키워드
- 롱테일 키워드
- 의미론적 키워드
- 검색량 및 난이도

### 콘텐츠 최적화

**기능**: AI 기반 콘텐츠 최적화를 수행합니다.

**사용법**:
```bash
ai-visibility ai-seo optimize "<콘텐츠>" -k "키워드1" "키워드2"
```

**최적화 항목**:
- 키워드 밀도 (0.5-2.0% 권장)
- 가독성 점수
- 콘텐츠 품질 평가
- 자동 개선 제안

### 경쟁사 분석

**기능**: 경쟁사의 SEO 전략을 분석합니다.

**사용법**:
```bash
ai-visibility ai-seo competitors <도메인> -c <경쟁사1> <경쟁사2>
```

**분석 항목**:
- 경쟁사 키워드 추출
- 백링크 분석
- 도메인 권한 평가
- 콘텐츠 점수 비교

### AI 인용 모니터링

**기능**: AI 검색 엔진에서의 인용 현황을 모니터링합니다.

**사용법**:
```bash
ai-visibility ai-seo monitor <url>
```

**모니터링 엔진**:
- ChatGPT
- Claude
- Perplexity
- Gemini

## GEO Skills

### GEO 분석

**기능**: 생성형 AI 검색 엔진 최적화를 분석합니다.

**사용법**:
```bash
ai-visibility geo analyze <url>
```

**분석 항목**:
- AI 엔진별 최적화 점수
- 콘텐츠 구조 분석
- 구조화된 데이터 분석
- AI 친화적 형식 분석
- 인용 가능성 분석

**대상 엔진**:
- ChatGPT
- Claude
- Perplexity
- Gemini
- Copilot

### FAQ 스키마 생성

**기능**: FAQPage 스키마를 생성합니다.

**사용법**:
```bash
ai-visibility geo faq -q "질문1" "질문2" ...
```

**생성 형식**:
- JSON-LD 형식
- Schema.org FAQPage 스키마
- HTML 삽입 코드 제공

### HowTo 스키마 생성

**기능**: HowTo 스키마를 생성합니다.

**사용법**:
```bash
ai-visibility geo howto -n "<가이드명>" -s "단계1" "단계2" ...
```

**특징**:
- 단계별 가이드 구조화
- 이미지 및 설명 지원
- AI가 이해하기 쉬운 형식

### Article 스키마 생성

**기능**: Article 스키마를 생성합니다.

**사용법**:
```bash
ai-visibility geo article -h "<제목>" -a "<작성자>" -u <url>
```

**포함 정보**:
- 제목 및 설명
- 작성자 정보
- 발행 및 수정 날짜
- 출판사 정보

### 생성형 엔진 최적화

**기능**: 특정 AI 엔진에 최적화합니다.

**사용법**:
```bash
ai-visibility geo optimize <url> -e chatgpt claude perplexity
```

**엔진별 특화**:
- **ChatGPT**: 단계별 가이드 선호
- **Claude**: 상세한 설명과 인용 선호
- **Perplexity**: 신뢰할 수 있는 소스 중요
- **Gemini**: 구조화된 데이터 선호

### llms.txt 생성

**기능**: AI 모델을 위한 llms.txt 파일을 생성합니다.

**사용법**:
```bash
ai-visibility geo llms-txt
```

**포함 정보**:
- 사이트 정보
- 주요 콘텐츠 목록
- 연락처 정보
- 업데이트 정보

## AIO Skills

### 종합 분석

**기능**: 모든 최적화 영역을 종합적으로 분석합니다.

**사용법**:
```bash
ai-visibility aio analyze <url>
```

**분석 영역**:
- SEO 점수
- AI SEO 점수
- GEO 점수
- 성능 점수
- 접근성 점수
- 보안 점수
- 소셜 미디어 점수

**출력**:
- 전체 점수
- 영역별 점수
- 우선순위별 권장사항

### 자동 최적화

**기능**: 분석 결과를 바탕으로 자동 최적화를 적용합니다.

**사용법**:
```bash
ai-visibility aio optimize <url>
```

**적용 항목**:
- Sitemap 자동 생성
- Robots.txt 자동 생성
- 이미지 최적화 권장
- 보안 헤더 설정
- 성능 최적화 제안

### 리포트 생성

**기능**: 분석 결과를 리포트로 생성합니다.

**사용법**:
```bash
ai-visibility aio report -f markdown
```

**지원 형식**:
- JSON
- Markdown
- HTML (향후 지원)

### AI 가시성 모니터링

**기능**: AI 검색 엔진에서의 가시성을 모니터링합니다.

**사용법**:
```bash
ai-visibility aio visibility <url>
```

**모니터링 항목**:
- 엔진별 인용 횟수
- 노출 횟수
- 순위
- 가시성 점수

**트렌드 분석**:
- 시간별 인용 추이
- 엔진별 성과 비교
- 개선 권장사항

### AI 피드백 루프

**기능**: 지속적인 AI 피드백 루프를 구축합니다.

**사용법**:
```bash
ai-visibility aio feedback <url> --frequency daily
```

**기능**:
- 주기적 분석
- 자동 최적화
- 리포트 생성
- 성능 추적

### AEO (Answer Engine Optimization)

**기능**: 답변 엔진 최적화를 수행합니다.

**사용법**:
```bash
ai-visibility aio aeo <url>
```

**최적화 항목**:
- 음성 검색 최적화
- 자연어 질문 형식
- 직접 답변 형식
- 대화형 AI 구조화

## 통합 Skills

### 자동 반영 시스템

**기능**: 개발 중 자동으로 최적화를 적용합니다.

**사용법**:
```bash
# 활성화
ai-visibility auto-inject enable

# 프레임워크별 설정
ai-visibility auto-inject setup --framework nextjs
ai-visibility auto-inject setup --framework react
ai-visibility auto-inject setup --framework vue
```

**지원 프레임워크**:
- Next.js
- React
- Vue.js
- Angular (향후 지원)

**자동 적용 항목**:
- 메타 태그 자동 생성
- 구조화된 데이터 자동 삽입
- Sitemap 자동 업데이트
- 성능 최적화 자동 적용

### Agent Lightning 통합

**기능**: AI 강화학습을 통한 지속적 개선.

**사용법**:
```bash
# 학습 시작
ai-visibility lightning train --episodes 100

# 온라인 학습
ai-visibility lightning online --enable

# 학습 상태
ai-visibility lightning status
```

**학습 항목**:
- 최적화 알고리즘 개선
- 온라인 SEO/AIO/GEO/AI SEO 트렌드 학습
- 자동 업데이트 및 고도화
- 성능 최적화 패턴 학습

### AI Visibility 분석

**기능**: AI 검색 엔진에서의 가시성을 종합 분석합니다.

**사용법**:
```bash
# 분석
ai-visibility visibility analyze <url>

# 추적
ai-visibility visibility track <url>

# 최적화
ai-visibility visibility optimize <url>
```

**분석 항목**:
- 엔진별 가시성 점수
- 인용 추적
- 순위 모니터링
- 성능 고도화 제안

## Best Practices

### 1. SEO 최적화

- Title 태그: 50자 권장
- Description 태그: 155자 권장
- 키워드 밀도: 1-2% 유지
- 구조화된 데이터 필수

### 2. AI SEO 최적화

- 의미론적 키워드 활용
- 가독성 점수 60 이상 유지
- 경쟁사 분석 정기 수행
- AI 인용 모니터링 활성화

### 3. GEO 최적화

- FAQ 스키마 필수
- HowTo 스키마 활용
- 명확한 제목 구조
- 인용 및 출처 명시

### 4. AIO 최적화

- 종합 점수 80 이상 목표
- 정기적 분석 (주 1회)
- 자동 최적화 활성화
- AI 피드백 루프 구축

## 참고 자료

- [Schema.org](https://schema.org/) - 구조화된 데이터 스키마
- [Google Search Central](https://developers.google.com/search) - SEO 가이드
- [Web.dev](https://web.dev/) - 웹 최적화 가이드
- [Agent Lightning](https://github.com/microsoft/agent-lightning) - AI 강화학습

