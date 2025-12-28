# AI Visibility Optimizer API Server

RESTful API 서버 및 WebSocket 실시간 모니터링

## 설치

```bash
cd api
npm install
```

## 실행

```bash
# 개발 모드
npm run dev

# 프로덕션 모드
npm start
```

## API 엔드포인트

### Health Check
- `GET /health` - 서버 상태 확인

### SEO
- `POST /api/seo/analyze` - SEO 분석

### AI SEO
- `POST /api/ai-seo/keywords` - 키워드 리서치

### GEO
- `POST /api/geo/analyze` - GEO 분석

### AIO
- `POST /api/aio/analyze` - 종합 분석

### AI Visibility
- `POST /api/visibility/analyze` - AI 가시성 분석

### 기타
- `POST /api/social/analyze` - 소셜 미디어 분석
- `POST /api/media/analyze` - 미디어 최적화 분석
- `POST /api/i18n/analyze` - 다국어 분석
- `POST /api/amp/analyze` - AMP 분석
- `POST /api/pwa/analyze` - PWA 분석
- `POST /api/voice/analyze` - 음성 검색 분석
- `POST /api/benchmark/analyze` - 성능 벤치마킹

## WebSocket

WebSocket 연결: `ws://localhost:3000/ws`

### 메시지 형식

```json
{
  "type": "analyze",
  "url": "https://example.com"
}
```

### 응답 형식

```json
{
  "type": "result",
  "data": { ... }
}
```

## API 문서

Swagger UI: `http://localhost:3000/api-docs`

## 환경 변수

`.env` 파일 생성:

```
PORT=3000
NODE_ENV=development
```

