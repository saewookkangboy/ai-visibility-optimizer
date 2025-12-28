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

