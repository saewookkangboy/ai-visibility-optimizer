import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const PWA_DIR = path.join(process.cwd(), '.project-data', 'pwa');
const PWA_CONFIG_FILE = path.join(PWA_DIR, 'pwa-config.json');
const PWA_REPORT_FILE = path.join(PWA_DIR, 'pwa-report.json');

/**
 * PWA (Progressive Web App) 최적화 모듈
 * Service Worker, Manifest.json, 오프라인 지원
 */
class PWAOptimizer {
  constructor() {
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(PWA_DIR)) {
      fs.mkdirSync(PWA_DIR, { recursive: true });
    }
  }

  async loadConfig() {
    try {
      if (fs.existsSync(PWA_CONFIG_FILE)) {
        return await fs.readJson(PWA_CONFIG_FILE);
      }
      return this.getDefaultConfig();
    } catch (error) {
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      enabled: true,
      generateServiceWorker: true,
      generateManifest: true,
      offlineSupport: true,
      installable: true
    };
  }

  async analyze(urlOrPath) {
    try {
      console.log(chalk.blue.bold(`\n📱 PWA 최적화 분석 시작: ${urlOrPath}\n`));

      const analysis = {
        url: urlOrPath,
        timestamp: new Date().toISOString(),
        manifest: {
          present: false,
          valid: false
        },
        serviceWorker: {
          present: false,
          registered: false
        },
        installable: false,
        offlineSupport: false,
        issues: [],
        recommendations: [],
        score: 0
      };

      // Manifest.json 확인
      analysis.manifest = await this.analyzeManifest(urlOrPath);

      // Service Worker 확인
      analysis.serviceWorker = await this.analyzeServiceWorker(urlOrPath);

      // 설치 가능성 확인
      analysis.installable = await this.checkInstallable(urlOrPath);

      // 오프라인 지원 확인
      analysis.offlineSupport = await this.checkOfflineSupport(urlOrPath);

      // 이슈 및 권장사항 생성
      if (!analysis.manifest.present) {
        analysis.issues.push({
          type: 'missing',
          message: 'Manifest.json이 없습니다',
          severity: 'high'
        });
        analysis.recommendations.push({
          type: 'generate',
          message: 'Manifest.json 생성',
          action: 'PWA Manifest 생성'
        });
      }

      if (!analysis.serviceWorker.present) {
        analysis.issues.push({
          type: 'missing',
          message: 'Service Worker가 없습니다',
          severity: 'high'
        });
        analysis.recommendations.push({
          type: 'generate',
          message: 'Service Worker 생성',
          action: 'Service Worker 생성'
        });
      }

      // 점수 계산
      analysis.score = this.calculateScore(analysis);

      // 리포트 저장
      await fs.writeJson(PWA_REPORT_FILE, analysis, { spaces: 2 });

      // 결과 출력
      this.printAnalysis(analysis);

      return analysis;
    } catch (error) {
      console.error(chalk.red(`❌ PWA 분석 실패: ${error.message}`));
      throw error;
    }
  }

  async analyzeManifest(urlOrPath) {
    return {
      present: false,
      valid: false
    };
  }

  async analyzeServiceWorker(urlOrPath) {
    return {
      present: false,
      registered: false
    };
  }

  async checkInstallable(urlOrPath) {
    return false;
  }

  async checkOfflineSupport(urlOrPath) {
    return false;
  }

  calculateScore(analysis) {
    let score = 0;

    if (analysis.manifest.present) score += 25;
    if (analysis.manifest.valid) score += 10;
    if (analysis.serviceWorker.present) score += 25;
    if (analysis.serviceWorker.registered) score += 10;
    if (analysis.installable) score += 15;
    if (analysis.offlineSupport) score += 15;

    return score;
  }

  printAnalysis(analysis) {
    console.log(chalk.bold.cyan('📱 PWA 최적화 분석 결과:\n'));
    console.log(chalk.blue(`점수: ${chalk.bold(analysis.score)}/100\n`));
    console.log(chalk.blue(`Manifest.json: ${analysis.manifest.present ? '✅' : '❌'}`));
    console.log(chalk.blue(`Service Worker: ${analysis.serviceWorker.present ? '✅' : '❌'}`));
    console.log(chalk.blue(`설치 가능: ${analysis.installable ? '✅' : '❌'}`));
    console.log(chalk.blue(`오프라인 지원: ${analysis.offlineSupport ? '✅' : '❌'}\n`));

    if (analysis.recommendations.length > 0) {
      console.log(chalk.yellow(`💡 권장사항 (${analysis.recommendations.length}개):\n`));
      analysis.recommendations.forEach(rec => {
        console.log(`  • ${rec.message}`);
        console.log(chalk.gray(`    → ${rec.action}`));
      });
    }

    console.log(chalk.blue(`\n📄 상세 리포트: ${PWA_REPORT_FILE}\n`));
  }

  async generateManifest(metadata) {
    try {
      console.log(chalk.blue(`\n📱 PWA Manifest 생성 중...\n`));

      const manifest = {
        name: metadata.name || 'My App',
        short_name: metadata.shortName || metadata.name || 'App',
        description: metadata.description || '',
        start_url: metadata.startUrl || '/',
        display: metadata.display || 'standalone',
        background_color: metadata.backgroundColor || '#ffffff',
        theme_color: metadata.themeColor || '#000000',
        icons: metadata.icons || [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      };

      const manifestFile = path.join(process.cwd(), 'public', 'manifest.json');
      const manifestDir = path.dirname(manifestFile);

      if (!fs.existsSync(manifestDir)) {
        fs.mkdirSync(manifestDir, { recursive: true });
      }

      await fs.writeJson(manifestFile, manifest, { spaces: 2 });
      console.log(chalk.green(`✅ Manifest.json 생성 완료: ${manifestFile}\n`));

      return manifestFile;
    } catch (error) {
      console.error(chalk.red(`❌ Manifest 생성 실패: ${error.message}`));
      throw error;
    }
  }

  async generateServiceWorker(options = {}) {
    try {
      console.log(chalk.blue(`\n⚙️  Service Worker 생성 중...\n`));

      const serviceWorker = `// Service Worker
const CACHE_NAME = '${options.cacheName || 'app-cache-v1'}';
const urlsToCache = ${JSON.stringify(options.urlsToCache || [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js'
], null, 2)};

// 설치 이벤트
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// fetch 이벤트
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 캐시에서 찾으면 반환, 없으면 네트워크 요청
        return response || fetch(event.request);
      })
  );
});

// 활성화 이벤트
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
`;

      const swFile = path.join(process.cwd(), 'public', 'sw.js');
      const swDir = path.dirname(swFile);

      if (!fs.existsSync(swDir)) {
        fs.mkdirSync(swDir, { recursive: true });
      }

      await fs.writeFile(swFile, serviceWorker);
      console.log(chalk.green(`✅ Service Worker 생성 완료: ${swFile}\n`));

      return swFile;
    } catch (error) {
      console.error(chalk.red(`❌ Service Worker 생성 실패: ${error.message}`));
      throw error;
    }
  }
}

export default new PWAOptimizer();

