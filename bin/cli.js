#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';

// 모듈 import
import seo from '../src/modules/seo/index.js';
import aiSeo from '../src/modules/ai-seo/index.js';
import geo from '../src/modules/geo/index.js';
import aio from '../src/modules/aio/index.js';
import autoInjector from '../src/modules/auto-injector/index.js';
import agentLightning from '../src/modules/agent-lightning/index.js';
import aiVisibility from '../src/modules/ai-visibility/index.js';
import socialMedia from '../src/modules/social-media/index.js';
import mediaOptimizer from '../src/modules/media-optimizer/index.js';
import i18n from '../src/modules/i18n/index.js';
import amp from '../src/modules/amp/index.js';
import pwa from '../src/modules/pwa/index.js';
import voiceSeo from '../src/modules/voice-seo/index.js';
import performanceBenchmark from '../src/modules/performance-benchmark/index.js';
import batchProcessor from '../src/modules/batch-processor/index.js';
import notification from '../src/modules/notification/index.js';

const program = new Command();

program
  .name('ai-visibility')
  .description('AI 기반 검색 엔진 및 생성형 AI 엔진 최적화 통합 솔루션')
  .version('1.0.0');

// SEO 명령어
const seoCommand = program.command('seo');
seoCommand
  .command('analyze')
  .description('SEO 분석')
  .argument('<url>', '분석할 URL')
  .action(async (url) => {
    await seo.analyze(url);
  });

seoCommand
  .command('sitemap')
  .description('Sitemap 생성')
  .option('-u, --urls <urls...>', 'URL 목록')
  .action(async (options) => {
    await seo.generateSitemap(options.urls || []);
  });

seoCommand
  .command('robots')
  .description('Robots.txt 생성')
  .action(async () => {
    await seo.generateRobotsTxt();
  });

// AI SEO 명령어
const aiSeoCommand = program.command('ai-seo');
aiSeoCommand
  .command('keywords')
  .description('AI 키워드 리서치')
  .argument('<topic>', '주제')
  .action(async (topic) => {
    await aiSeo.researchKeywords(topic);
  });

aiSeoCommand
  .command('optimize')
  .description('콘텐츠 최적화')
  .argument('<content>', '콘텐츠')
  .option('-k, --keywords <keywords...>', '키워드 목록')
  .action(async (content, options) => {
    await aiSeo.optimizeContent(content, options.keywords || []);
  });

aiSeoCommand
  .command('competitors')
  .description('경쟁사 분석')
  .argument('<domain>', '도메인')
  .option('-c, --competitors <competitors...>', '경쟁사 목록')
  .action(async (domain, options) => {
    await aiSeo.analyzeCompetitors(domain, options.competitors || []);
  });

// GEO 명령어
const geoCommand = program.command('geo');
geoCommand
  .command('analyze')
  .description('GEO 분석')
  .argument('<url>', '분석할 URL')
  .action(async (url) => {
    await geo.analyzeContent(url);
  });

geoCommand
  .command('faq')
  .description('FAQ 스키마 생성')
  .option('-q, --questions <questions...>', '질문 목록')
  .action(async (options) => {
    const faqs = (options.questions || []).map(q => ({ question: q, answer: '' }));
    await geo.generateFAQSchema(faqs);
  });

geoCommand
  .command('howto')
  .description('HowTo 스키마 생성')
  .option('-n, --name <name>', '가이드 이름')
  .option('-s, --steps <steps...>', '단계 목록')
  .action(async (options) => {
    const steps = (options.steps || []).map((step, index) => ({
      name: `단계 ${index + 1}`,
      text: step
    }));
    await geo.generateHowToSchema({ name: options.name || '', steps });
  });

geoCommand
  .command('article')
  .description('Article 스키마 생성')
  .option('-h, --headline <headline>', '제목')
  .option('-a, --author <author>', '작성자')
  .option('-u, --url <url>', 'URL')
  .action(async (options) => {
    await geo.generateArticleSchema({
      headline: options.headline || '',
      author: { name: options.author || '' },
      url: options.url || '',
      publisher: { name: '', logo: '' }
    });
  });

geoCommand
  .command('optimize')
  .description('생성형 엔진 최적화')
  .argument('<url>', 'URL')
  .option('-e, --engines <engines...>', '엔진 목록')
  .action(async (url, options) => {
    await geo.optimizeForEngines(url, options.engines || []);
  });

// AIO 명령어
const aioCommand = program.command('aio');
aioCommand
  .command('analyze')
  .description('종합 분석')
  .argument('<url>', '분석할 URL')
  .action(async (url) => {
    await aio.comprehensiveAnalysis(url);
  });

aioCommand
  .command('optimize')
  .description('자동 최적화')
  .argument('<url>', 'URL')
  .action(async (url) => {
    await aio.autoOptimize(url);
  });

aioCommand
  .command('report')
  .description('리포트 생성')
  .option('-f, --format <format>', '형식 (json, markdown)', 'json')
  .action(async (options) => {
    await aio.generateReport(options.format);
  });

aioCommand
  .command('visibility')
  .description('AI 가시성 모니터링')
  .argument('<url>', 'URL')
  .action(async (url) => {
    await aio.monitorAIVisibility(url);
  });

// 자동 반영 시스템 명령어
const autoInjectCommand = program.command('auto-inject');
autoInjectCommand
  .command('enable')
  .description('자동 반영 활성화')
  .action(async () => {
    await autoInjector.enable();
  });

autoInjectCommand
  .command('disable')
  .description('자동 반영 비활성화')
  .action(async () => {
    await autoInjector.disable();
  });

autoInjectCommand
  .command('setup')
  .description('프레임워크 설정')
  .option('-f, --framework <framework>', '프레임워크 (nextjs, react, vue)')
  .action(async (options) => {
    if (!options.framework) {
      console.error(chalk.red('❌ 프레임워크를 지정해주세요.'));
      return;
    }
    await autoInjector.setup(options.framework);
  });

autoInjectCommand
  .command('apply')
  .description('수동 적용')
  .action(async () => {
    await autoInjector.apply();
  });

autoInjectCommand
  .command('pre-build')
  .description('빌드 전 최적화')
  .action(async () => {
    await autoInjector.preBuild();
  });

autoInjectCommand
  .command('post-build')
  .description('빌드 후 최적화')
  .action(async () => {
    await autoInjector.postBuild();
  });

autoInjectCommand
  .command('status')
  .description('상태 확인')
  .action(async () => {
    await autoInjector.status();
  });

// Agent Lightning 명령어
const lightningCommand = program.command('lightning');
lightningCommand
  .command('train')
  .description('학습 시작')
  .option('-e, --episodes <episodes>', '에피소드 수', '100')
  .action(async (options) => {
    await agentLightning.train({ episodes: parseInt(options.episodes) });
  });

lightningCommand
  .command('online')
  .description('온라인 학습')
  .option('-e, --enable', '활성화')
  .option('-d, --disable', '비활성화')
  .action(async (options) => {
    if (options.enable) {
      await agentLightning.enableOnlineLearning();
    } else if (options.disable) {
      await agentLightning.disableOnlineLearning();
    }
  });

lightningCommand
  .command('status')
  .description('학습 상태 확인')
  .action(async () => {
    await agentLightning.status();
  });

// AI Visibility 명령어
const visibilityCommand = program.command('visibility');
visibilityCommand
  .command('analyze')
  .description('AI 가시성 분석')
  .argument('<url>', 'URL')
  .action(async (url) => {
    await aiVisibility.analyze(url);
  });

visibilityCommand
  .command('track')
  .description('인용 추적')
  .argument('<url>', 'URL')
  .action(async (url) => {
    await aiVisibility.track(url);
  });

visibilityCommand
  .command('optimize')
  .description('성능 고도화')
  .argument('<url>', 'URL')
  .action(async (url) => {
    await aiVisibility.optimize(url);
  });

// 소셜 미디어 명령어
const socialMediaCommand = program.command('social');
socialMediaCommand
  .command('analyze')
  .description('소셜 미디어 최적화 분석')
  .argument('<url>', 'URL')
  .action(async (url) => {
    await socialMedia.analyze(url);
  });

socialMediaCommand
  .command('generate')
  .description('소셜 미디어 태그 생성')
  .option('-t, --title <title>', '제목')
  .option('-d, --description <description>', '설명')
  .option('-i, --image <image>', '이미지 URL')
  .option('-u, --url <url>', 'URL')
  .action(async (options) => {
    await socialMedia.generateTags({
      title: options.title,
      description: options.description,
      image: options.image,
      url: options.url
    });
  });

// 미디어 최적화 명령어
const mediaCommand = program.command('media');
mediaCommand
  .command('analyze')
  .description('미디어 최적화 분석')
  .argument('<url>', 'URL')
  .action(async (url) => {
    await mediaOptimizer.analyze(url);
  });

mediaCommand
  .command('optimize-image')
  .description('이미지 최적화')
  .argument('<imagePath>', '이미지 경로')
  .option('-f, --format <format>', '포맷 (webp, avif)', 'webp')
  .action(async (imagePath, options) => {
    await mediaOptimizer.optimizeImage(imagePath, { format: options.format });
  });

mediaCommand
  .command('generate-alt')
  .description('AI 기반 Alt 텍스트 생성')
  .argument('<imagePath>', '이미지 경로')
  .action(async (imagePath) => {
    await mediaOptimizer.generateAltText(imagePath);
  });

// 다국어 명령어
const i18nCommand = program.command('i18n');
i18nCommand
  .command('analyze')
  .description('다국어 최적화 분석')
  .argument('<url>', 'URL')
  .action(async (url) => {
    await i18n.analyze(url);
  });

i18nCommand
  .command('generate-hreflang')
  .description('hreflang 태그 생성')
  .action(async () => {
    const config = await i18n.loadConfig();
    await i18n.generateHreflangTags(config);
  });

i18nCommand
  .command('generate-sitemap')
  .description('다국어 Sitemap 생성')
  .option('-u, --urls <urls...>', 'URL 목록')
  .action(async (options) => {
    const config = await i18n.loadConfig();
    const urls = (options.urls || []).map(url => ({ url, baseUrl: 'https://example.com', path: url }));
    await i18n.generateMultilingualSitemap(urls, config);
  });

// AMP 명령어
const ampCommand = program.command('amp');
ampCommand
  .command('analyze')
  .description('AMP 최적화 분석')
  .argument('<url>', 'URL')
  .action(async (url) => {
    await amp.analyze(url);
  });

ampCommand
  .command('generate')
  .description('AMP 페이지 생성')
  .option('-t, --title <title>', '제목')
  .option('-c, --content <content>', '콘텐츠')
  .option('-f, --filename <filename>', '파일명', 'index')
  .action(async (options) => {
    await amp.generateAMP(options.content || '', {
      title: options.title,
      filename: options.filename
    });
  });

ampCommand
  .command('validate')
  .description('AMP 페이지 검증')
  .argument('<ampFilePath>', 'AMP 파일 경로')
  .action(async (ampFilePath) => {
    await amp.validateAMPFile(ampFilePath);
  });

// PWA 명령어
const pwaCommand = program.command('pwa');
pwaCommand
  .command('analyze')
  .description('PWA 최적화 분석')
  .argument('<url>', 'URL')
  .action(async (url) => {
    await pwa.analyze(url);
  });

pwaCommand
  .command('generate-manifest')
  .description('Manifest.json 생성')
  .option('-n, --name <name>', '앱 이름')
  .option('-s, --short-name <shortName>', '짧은 이름')
  .option('-d, --description <description>', '설명')
  .action(async (options) => {
    await pwa.generateManifest({
      name: options.name,
      shortName: options.shortName,
      description: options.description
    });
  });

pwaCommand
  .command('generate-sw')
  .description('Service Worker 생성')
  .option('-c, --cache-name <cacheName>', '캐시 이름', 'app-cache-v1')
  .action(async (options) => {
    await pwa.generateServiceWorker({ cacheName: options.cacheName });
  });

// 음성 검색 명령어
const voiceCommand = program.command('voice');
voiceCommand
  .command('analyze')
  .description('음성 검색 최적화 분석')
  .argument('<url>', 'URL')
  .action(async (url) => {
    await voiceSeo.analyze(url);
  });

voiceCommand
  .command('generate-content')
  .description('음성 검색 최적화 콘텐츠 생성')
  .argument('<topic>', '주제')
  .action(async (topic) => {
    await voiceSeo.generateVoiceOptimizedContent(topic);
  });

// 성능 벤치마킹 명령어
const benchmarkCommand = program.command('benchmark');
benchmarkCommand
  .command('analyze')
  .description('성능 벤치마킹 분석')
  .argument('<url>', 'URL')
  .action(async (url) => {
    await performanceBenchmark.analyze(url);
  });

benchmarkCommand
  .command('set-baseline')
  .description('성능 기준선 설정')
  .argument('<url>', 'URL')
  .action(async (url) => {
    await performanceBenchmark.setBaseline(url);
  });

// 배치 처리 명령어
const batchCommand = program.command('batch');
batchCommand
  .command('process')
  .description('배치 처리 실행')
  .argument('<filePath>', 'URL 파일 경로 (CSV/JSON/TXT)')
  .action(async (filePath) => {
    await batchProcessor.processFromFile(filePath);
  });

batchCommand
  .command('schedule')
  .description('스케줄 작업 등록')
  .argument('<cronExpression>', 'Cron 표현식')
  .argument('<filePath>', 'URL 파일 경로')
  .action(async (cronExpression, filePath) => {
    await batchProcessor.scheduleJob(cronExpression, filePath);
  });

batchCommand
  .command('status')
  .description('작업 상태 확인')
  .argument('[jobId]', '작업 ID')
  .action(async (jobId) => {
    if (jobId) {
      const job = await batchProcessor.getJobStatus(jobId);
      if (job) {
        console.log(chalk.blue(`\n작업 상태: ${job.status}`));
        console.log(chalk.blue(`완료: ${job.completed}/${job.total}`));
        console.log(chalk.blue(`실패: ${job.failed}/${job.total}\n`));
      } else {
        console.log(chalk.red(`작업을 찾을 수 없습니다: ${jobId}`));
      }
    } else {
      const jobs = await batchProcessor.listJobs();
      console.log(chalk.blue(`\n총 ${jobs.length}개 작업\n`));
      jobs.forEach(job => {
        console.log(`  ${job.id}: ${job.status} (${job.completed}/${job.total})`);
      });
      console.log();
    }
  });

// 알림 명령어
const notifyCommand = program.command('notify');
notifyCommand
  .command('send')
  .description('알림 전송')
  .option('-t, --type <type>', '알림 타입 (email, slack, discord, all)', 'all')
  .option('-s, --subject <subject>', '제목')
  .option('-m, --message <message>', '메시지')
  .action(async (options) => {
    if (!options.subject || !options.message) {
      console.error(chalk.red('제목과 메시지가 필요합니다.'));
      return;
    }
    await notification.sendNotification(options.type, options.subject, options.message);
  });

notifyCommand
  .command('daily-report')
  .description('일일 리포트 전송')
  .argument('<url>', 'URL')
  .action(async (url) => {
    // 메트릭 가져오기
    const { default: aioModule } = await import('../src/modules/aio/index.js');
    const analysis = await aioModule.comprehensiveAnalysis(url);
    await notification.sendDailyReport(url, analysis.scores);
  });

// API 서버 명령어
program
  .command('api:start')
  .description('API 서버 시작')
  .option('-p, --port <port>', '포트 번호', '3000')
  .action(async (options) => {
    process.env.PORT = options.port;
    await import('../api/server.js');
  });

// 초기화 명령어
program
  .command('init')
  .description('프로젝트 초기화')
  .action(async () => {
    console.log(chalk.blue('🚀 AI Visibility Optimizer 초기화 중...\n'));
    // 초기화 로직
    console.log(chalk.green('✅ 초기화 완료\n'));
  });

program.parse();

