import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

// 모듈 import
import seo from '../src/modules/seo/index.js';
import aiSeo from '../src/modules/ai-seo/index.js';
import geo from '../src/modules/geo/index.js';
import aio from '../src/modules/aio/index.js';
import aiVisibility from '../src/modules/ai-visibility/index.js';
import socialMedia from '../src/modules/social-media/index.js';
import mediaOptimizer from '../src/modules/media-optimizer/index.js';
import i18n from '../src/modules/i18n/index.js';
import amp from '../src/modules/amp/index.js';
import pwa from '../src/modules/pwa/index.js';
import voiceSeo from '../src/modules/voice-seo/index.js';
import performanceBenchmark from '../src/modules/performance-benchmark/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100 // 최대 100 요청
});
app.use('/api/', limiter);

// Swagger 설정
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Visibility Optimizer API',
      version: '1.0.0',
      description: 'AI 기반 검색 엔진 및 생성형 AI 엔진 최적화 API',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./api/routes/*.js', './api/server.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
const router = express.Router();

/**
 * @swagger
 * /api/seo/analyze:
 *   post:
 *     summary: SEO 분석
 *     tags: [SEO]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: 분석 결과
 */
router.post('/seo/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const result = await seo.analyze(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/ai-seo/keywords', async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }
    const result = await aiSeo.researchKeywords(topic);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/geo/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const result = await geo.analyzeContent(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/aio/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const result = await aio.comprehensiveAnalysis(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/visibility/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const result = await aiVisibility.analyze(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/social/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const result = await socialMedia.analyze(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/media/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const result = await mediaOptimizer.analyze(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/i18n/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const result = await i18n.analyze(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/amp/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const result = await amp.analyze(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/pwa/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const result = await pwa.analyze(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/voice/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const result = await voiceSeo.analyze(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/benchmark/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const result = await performanceBenchmark.analyze(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use('/api', router);

// HTTP 서버 생성
const server = createServer(app);

// WebSocket 서버 생성
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (ws) => {
  console.log('WebSocket 클라이언트 연결됨');

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message.toString());
      
      if (data.type === 'analyze') {
        // 분석 시작
        ws.send(JSON.stringify({ type: 'status', message: '분석 시작...' }));
        
        // 분석 실행 (예시)
        const result = await aio.comprehensiveAnalysis(data.url);
        
        // 결과 전송
        ws.send(JSON.stringify({ type: 'result', data: result }));
      }
    } catch (error) {
      ws.send(JSON.stringify({ type: 'error', message: error.message }));
    }
  });

  ws.on('close', () => {
    console.log('WebSocket 클라이언트 연결 종료');
  });
});

// 서버 시작
server.listen(PORT, () => {
  console.log(`🚀 API 서버가 포트 ${PORT}에서 실행 중입니다`);
  console.log(`📚 API 문서: http://localhost:${PORT}/api-docs`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}/ws`);
});

export default app;

