# Background 가이드 - 가이드라인 및 알고리즘 설계

이 문서는 SEO, AI SEO, GEO, AIO 최적화 기술 개발 시 참고할 수 있는 가이드라인과 알고리즘 설계 배경을 제공합니다.

## 목차

1. [SEO 알고리즘 설계](#seo-알고리즘-설계)
2. [AI SEO 알고리즘 설계](#ai-seo-알고리즘-설계)
3. [GEO 알고리즘 설계](#geo-알고리즘-설계)
4. [AIO 알고리즘 설계](#aio-알고리즘-설계)
5. [자동 반영 시스템 설계](#자동-반영-시스템-설계)
6. [Agent Lightning 통합 설계](#agent-lightning-통합-설계)
7. [AI Visibility 분석 설계](#ai-visibility-분석-설계)

## SEO 알고리즘 설계

### 메타 태그 분석 알고리즘

**목적**: Title과 Description 태그의 최적화 상태를 평가합니다.

**알고리즘**:
```
점수 = 100
- Title 길이 검증
  - 30자 미만: -20점
  - 60자 초과: -15점
  - 30-60자: 0점
- Description 길이 검증
  - 120자 미만: -15점
  - 160자 초과: -10점
  - 120-160자: 0점
- 키워드 포함 여부
  - Title에 주요 키워드 없음: -10점
  - Description에 주요 키워드 없음: -5점
```

**구현 예시**:
```javascript
function analyzeMetaTags(title, description, keywords) {
  let score = 100;
  const issues = [];
  const recommendations = [];

  // Title 분석
  if (title.length < 30) {
    score -= 20;
    issues.push({ type: 'title', severity: 'high', message: 'Title이 너무 짧습니다' });
  } else if (title.length > 60) {
    score -= 15;
    issues.push({ type: 'title', severity: 'medium', message: 'Title이 너무 깁니다' });
  }

  // Description 분석
  if (description.length < 120) {
    score -= 15;
    issues.push({ type: 'description', severity: 'medium', message: 'Description이 너무 짧습니다' });
  } else if (description.length > 160) {
    score -= 10;
    issues.push({ type: 'description', severity: 'low', message: 'Description이 너무 깁니다' });
  }

  return { score: Math.max(0, score), issues, recommendations };
}
```

### 키워드 밀도 계산 알고리즘

**목적**: 콘텐츠 내 키워드 밀도를 계산하여 최적 범위(0.5-2.0%)를 유지합니다.

**알고리즘**:
```
키워드 밀도 = (키워드 출현 횟수 / 전체 단어 수) × 100

점수 계산:
- 0.5% 미만: 낮음, -15점
- 0.5-2.0%: 최적, 0점
- 2.0-3.0%: 높음, -10점
- 3.0% 초과: 과도, -20점
```

**구현 예시**:
```javascript
function calculateKeywordDensity(content, keyword) {
  const contentLower = content.toLowerCase();
  const keywordLower = keyword.toLowerCase();
  const keywordCount = (contentLower.match(new RegExp(keywordLower, 'g')) || []).length;
  const wordCount = content.split(/\s+/).length;
  const density = (keywordCount / wordCount) * 100;

  let score = 100;
  if (density < 0.5) {
    score -= 15;
  } else if (density > 2.0 && density <= 3.0) {
    score -= 10;
  } else if (density > 3.0) {
    score -= 20;
  }

  return { density, score };
}
```

### Core Web Vitals 점수 계산

**목적**: 웹 성능 지표를 종합 평가합니다.

**알고리즘**:
```
점수 = 100

- LCP (Largest Contentful Paint)
  - ≤ 2.5초: 0점 감소
  - 2.5-4.0초: -10점
  - > 4.0초: -20점

- FID (First Input Delay)
  - ≤ 100ms: 0점 감소
  - 100-300ms: -10점
  - > 300ms: -20점

- CLS (Cumulative Layout Shift)
  - ≤ 0.1: 0점 감소
  - 0.1-0.25: -10점
  - > 0.25: -20점
```

## AI SEO 알고리즘 설계

### AI 키워드 리서치 알고리즘

**목적**: AI를 활용하여 관련 키워드를 자동으로 발견합니다.

**알고리즘**:
```
1. 주요 키워드 확장
   - 동의어 생성
   - 관련어 생성
   - 롱테일 변형 생성

2. 의미론적 키워드 매핑
   - Word2Vec 또는 BERT 임베딩 활용
   - 유사도 계산
   - 상위 N개 선택

3. 경쟁사 키워드 분석
   - 경쟁사 콘텐츠 크롤링
   - 키워드 추출
   - 빈도 분석
```

**구현 예시**:
```javascript
async function researchKeywords(topic, aiModel = 'claude-3-5-sonnet') {
  const keywords = {
    primary: topic,
    secondary: [],
    longTail: [],
    semantic: []
  };

  // AI를 통한 키워드 확장
  const prompt = `다음 주제에 대한 SEO 키워드를 생성하세요: ${topic}`;
  const aiResponse = await callAI(aiModel, prompt);
  
  // 응답 파싱 및 분류
  keywords.secondary = extractSecondaryKeywords(aiResponse);
  keywords.longTail = extractLongTailKeywords(aiResponse);
  keywords.semantic = extractSemanticKeywords(aiResponse);

  return keywords;
}
```

### 콘텐츠 가독성 계산

**목적**: Flesch Reading Ease 기반 가독성 점수를 계산합니다.

**알고리즘**:
```
Flesch Reading Ease = 206.835 - (1.015 × ASL) - (84.6 × ASW)

ASL = 평균 문장 길이 (단어 수)
ASW = 평균 음절 수 (단어당)

점수 해석:
- 90-100: 매우 쉬움
- 80-89: 쉬움
- 70-79: 보통
- 60-69: 어려움
- 0-59: 매우 어려움
```

**구현 예시**:
```javascript
function calculateReadability(content) {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = content.split(/\s+/).filter(w => w.length > 0);
  const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0);

  if (sentences.length === 0 || words.length === 0) return 0;

  const avgSentenceLength = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;

  const score = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
  return Math.max(0, Math.min(100, score));
}

function countSyllables(word) {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}
```

## GEO 알고리즘 설계

### AI 엔진별 최적화 점수 계산

**목적**: 각 AI 검색 엔진에 대한 최적화 상태를 평가합니다.

**알고리즘**:
```
엔진별 점수 = (콘텐츠 명확성 × 0.3) + (구조 품질 × 0.3) + (인용 품질 × 0.2) + (답변 형식 × 0.2)

엔진별 가중치:
- ChatGPT: 구조 품질 가중치 증가
- Claude: 인용 품질 가중치 증가
- Perplexity: 인용 품질 가중치 증가
- Gemini: 구조 품질 가중치 증가
```

**구현 예시**:
```javascript
function calculateEngineScore(analysis, engine) {
  const weights = getEngineWeights(engine);
  
  const score = 
    analysis.contentClarity * weights.contentClarity +
    analysis.structureQuality * weights.structureQuality +
    analysis.citationQuality * weights.citationQuality +
    analysis.answerFormat * weights.answerFormat;

  return Math.round(score);
}

function getEngineWeights(engine) {
  const baseWeights = {
    contentClarity: 0.3,
    structureQuality: 0.3,
    citationQuality: 0.2,
    answerFormat: 0.2
  };

  switch (engine) {
    case 'chatgpt':
      return { ...baseWeights, structureQuality: 0.4, citationQuality: 0.1 };
    case 'claude':
      return { ...baseWeights, citationQuality: 0.3, structureQuality: 0.2 };
    case 'perplexity':
      return { ...baseWeights, citationQuality: 0.4, structureQuality: 0.1 };
    default:
      return baseWeights;
  }
}
```

### 구조화된 데이터 검증 알고리즘

**목적**: Schema.org 스키마의 유효성을 검증합니다.

**알고리즘**:
```
점수 = 100

필수 필드 검증:
- 각 스키마 타입별 필수 필드 확인
- 필수 필드 누락: -20점

데이터 타입 검증:
- 잘못된 데이터 타입: -10점

중첩 구조 검증:
- 잘못된 중첩: -15점
```

## AIO 알고리즘 설계

### 종합 점수 계산 알고리즘

**목적**: 모든 최적화 영역을 종합하여 전체 점수를 계산합니다.

**알고리즘**:
```
전체 점수 = (SEO × 0.25) + (AI SEO × 0.25) + (GEO × 0.20) + (성능 × 0.15) + (접근성 × 0.10) + (보안 × 0.05)

가중치 조정:
- 웹사이트 유형에 따라 가중치 조정
- 비즈니스 목표에 따라 가중치 조정
```

**구현 예시**:
```javascript
function calculateOverallScore(scores, weights = null) {
  const defaultWeights = {
    seo: 0.25,
    aiSeo: 0.25,
    geo: 0.20,
    performance: 0.15,
    accessibility: 0.10,
    security: 0.05
  };

  const finalWeights = weights || defaultWeights;
  
  let totalScore = 0;
  let totalWeight = 0;

  Object.entries(finalWeights).forEach(([key, weight]) => {
    if (scores[key] !== undefined) {
      totalScore += scores[key] * weight;
      totalWeight += weight;
    }
  });

  return Math.round(totalScore / totalWeight);
}
```

### 권장사항 우선순위 알고리즘

**목적**: 최적화 권장사항에 우선순위를 부여합니다.

**알고리즘**:
```
우선순위 점수 = (영향도 × 0.4) + (난이도 역수 × 0.3) + (긴급도 × 0.3)

영향도: 0-100 (점수 개선 기대치)
난이도: 0-100 (구현 난이도, 높을수록 어려움)
긴급도: 0-100 (시급성)

우선순위:
- High: 우선순위 점수 ≥ 70
- Medium: 50 ≤ 우선순위 점수 < 70
- Low: 우선순위 점수 < 50
```

## 자동 반영 시스템 설계

### 빌드 통합 알고리즘

**목적**: 빌드 프로세스에 자동으로 최적화를 적용합니다.

**알고리즘**:
```
1. 빌드 전 단계
   - 설정 파일 읽기
   - 최적화 규칙 로드

2. 빌드 중 단계
   - HTML 파싱
   - 메타 태그 자동 생성/업데이트
   - 구조화된 데이터 삽입
   - 이미지 최적화

3. 빌드 후 단계
   - Sitemap 생성
   - Robots.txt 생성
   - 검증 및 리포트 생성
```

**구현 예시**:
```javascript
async function autoInject(buildConfig) {
  const files = await getBuildFiles(buildConfig);
  
  for (const file of files) {
    if (isHTMLFile(file)) {
      // 메타 태그 자동 생성
      await injectMetaTags(file);
      
      // 구조화된 데이터 삽입
      await injectStructuredData(file);
      
      // 성능 최적화
      await optimizePerformance(file);
    }
  }
  
  // 빌드 후 작업
  await generateSitemap();
  await generateRobotsTxt();
}
```

## Agent Lightning 통합 설계

### 강화학습 알고리즘

**목적**: 최적화 전략을 지속적으로 개선합니다.

**알고리즘**:
```
Q-Learning 기반 최적화:

상태 (State):
- 현재 SEO 점수
- 현재 AI SEO 점수
- 현재 GEO 점수
- 현재 AIO 점수

행동 (Action):
- 메타 태그 최적화
- 키워드 밀도 조정
- 구조화된 데이터 추가
- 콘텐츠 구조 개선

보상 (Reward):
- 점수 개선: +10
- 점수 유지: +5
- 점수 하락: -10

정책 (Policy):
- ε-greedy: 탐험 vs 활용 균형
- 학습률: 0.1
- 할인율: 0.9
```

**구현 예시**:
```javascript
class OptimizationAgent {
  constructor() {
    this.qTable = new Map();
    this.epsilon = 0.1;
    this.learningRate = 0.1;
    this.discountFactor = 0.9;
  }

  selectAction(state) {
    if (Math.random() < this.epsilon) {
      // 탐험: 랜덤 행동
      return this.getRandomAction();
    } else {
      // 활용: 최적 행동
      return this.getBestAction(state);
    }
  }

  updateQValue(state, action, reward, nextState) {
    const currentQ = this.getQValue(state, action);
    const maxNextQ = this.getMaxQValue(nextState);
    const newQ = currentQ + this.learningRate * (reward + this.discountFactor * maxNextQ - currentQ);
    this.setQValue(state, action, newQ);
  }
}
```

### 온라인 학습 알고리즘

**목적**: 온라인에서 최신 SEO/AIO/GEO/AI SEO 트렌드를 학습합니다.

**알고리즘**:
```
1. 웹 크롤링
   - 최신 SEO 가이드 수집
   - AI SEO 트렌드 수집
   - GEO 최적화 사례 수집

2. 데이터 처리
   - 텍스트 추출
   - 패턴 인식
   - 규칙 추출

3. 모델 업데이트
   - 기존 규칙과 비교
   - 새로운 규칙 통합
   - 성능 검증
```

## AI Visibility 분석 설계

### 가시성 점수 계산

**목적**: AI 검색 엔진에서의 가시성을 종합 평가합니다.

**알고리즘**:
```
가시성 점수 = (인용 점수 × 0.4) + (노출 점수 × 0.3) + (순위 점수 × 0.3)

인용 점수 = min(100, (인용 횟수 / 목표 인용 횟수) × 100)
노출 점수 = min(100, (노출 횟수 / 목표 노출 횟수) × 100)
순위 점수 = max(0, 100 - (순위 - 1) × 10)

전체 가시성 = 모든 엔진의 가시성 점수 평균
```

**구현 예시**:
```javascript
function calculateVisibilityScore(metrics) {
  const citationScore = Math.min(100, (metrics.citations / metrics.targetCitations) * 100);
  const impressionScore = Math.min(100, (metrics.impressions / metrics.targetImpressions) * 100);
  const rankingScore = Math.max(0, 100 - (metrics.ranking - 1) * 10);

  const visibilityScore = 
    citationScore * 0.4 +
    impressionScore * 0.3 +
    rankingScore * 0.3;

  return Math.round(visibilityScore);
}
```

### 성능 고도화 알고리즘

**목적**: AI Visibility 성능을 지속적으로 개선합니다.

**알고리즘**:
```
1. 성능 측정
   - 현재 가시성 점수
   - 인용 추이
   - 순위 변화

2. 개선 전략 생성
   - 약점 영역 식별
   - 개선 액션 제안
   - 우선순위 부여

3. 자동 적용
   - 낮은 위험도 액션 자동 적용
   - 높은 위험도 액션 승인 요청
   - 결과 모니터링
```

## 참고 자료

- [Google Search Algorithm](https://developers.google.com/search/docs/appearance/google-search)
- [Schema.org Documentation](https://schema.org/docs/documents.html)
- [Reinforcement Learning](https://spinningup.openai.com/en/latest/)
- [Web Performance](https://web.dev/performance/)

