import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const I18N_DIR = path.join(process.cwd(), '.project-data', 'i18n');
const I18N_CONFIG_FILE = path.join(I18N_DIR, 'i18n-config.json');
const I18N_REPORT_FILE = path.join(I18N_DIR, 'i18n-report.json');

/**
 * 다국어 및 국제화 지원 모듈
 * hreflang, 다국어 Sitemap, 언어별 최적화
 */
class I18nOptimizer {
  constructor() {
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(I18N_DIR)) {
      fs.mkdirSync(I18N_DIR, { recursive: true });
    }
  }

  async loadConfig() {
    try {
      if (fs.existsSync(I18N_CONFIG_FILE)) {
        return await fs.readJson(I18N_CONFIG_FILE);
      }
      return this.getDefaultConfig();
    } catch (error) {
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      languages: ['ko', 'en'],
      defaultLanguage: 'ko',
      regions: {
        ko: 'KR',
        en: 'US'
      },
      generateHreflang: true,
      generateMultilingualSitemap: true
    };
  }

  async analyze(urlOrPath) {
    try {
      console.log(chalk.blue.bold(`\n🌍 다국어 최적화 분석 시작: ${urlOrPath}\n`));

      const analysis = {
        url: urlOrPath,
        timestamp: new Date().toISOString(),
        languages: [],
        hreflang: {
          present: false,
          correct: false,
          tags: []
        },
        sitemap: {
          multilingual: false,
          languages: []
        },
        issues: [],
        recommendations: [],
        score: 0
      };

      const config = await this.loadConfig();

      // hreflang 태그 분석
      const hreflangAnalysis = await this.analyzeHreflang(urlOrPath, config);
      analysis.hreflang = hreflangAnalysis;

      // 다국어 Sitemap 분석
      const sitemapAnalysis = await this.analyzeSitemap(urlOrPath, config);
      analysis.sitemap = sitemapAnalysis;

      // 언어별 콘텐츠 분석
      for (const lang of config.languages) {
        const langAnalysis = await this.analyzeLanguage(urlOrPath, lang);
        analysis.languages.push(langAnalysis);
      }

      // 점수 계산
      analysis.score = this.calculateScore(analysis);

      // 권장사항 생성
      analysis.recommendations = this.generateRecommendations(analysis, config);

      // 리포트 저장
      await fs.writeJson(I18N_REPORT_FILE, analysis, { spaces: 2 });

      // 결과 출력
      this.printAnalysis(analysis);

      return analysis;
    } catch (error) {
      console.error(chalk.red(`❌ 다국어 분석 실패: ${error.message}`));
      throw error;
    }
  }

  async analyzeHreflang(urlOrPath, config) {
    const analysis = {
      present: false,
      correct: false,
      tags: [],
      issues: []
    };

    // 시뮬레이션: 실제로는 HTML 파싱
    // hreflang 태그가 있는지 확인
    analysis.present = false; // 시뮬레이션

    if (!analysis.present) {
      analysis.issues.push({
        type: 'missing',
        message: 'hreflang 태그가 없습니다',
        severity: 'high'
      });
    }

    return analysis;
  }

  async analyzeSitemap(urlOrPath, config) {
    const analysis = {
      multilingual: false,
      languages: [],
      issues: []
    };

    // 다국어 Sitemap 확인
    analysis.multilingual = false; // 시뮬레이션

    if (!analysis.multilingual && config.languages.length > 1) {
      analysis.issues.push({
        type: 'missing',
        message: '다국어 Sitemap이 없습니다',
        severity: 'medium'
      });
    }

    return analysis;
  }

  async analyzeLanguage(urlOrPath, language) {
    return {
      language,
      present: true,
      quality: 85,
      issues: []
    };
  }

  calculateScore(analysis) {
    let score = 100;

    if (!analysis.hreflang.present) {
      score -= 30;
    }

    if (!analysis.sitemap.multilingual) {
      score -= 20;
    }

    return Math.max(0, Math.min(100, score));
  }

  generateRecommendations(analysis, config) {
    const recommendations = [];

    if (!analysis.hreflang.present) {
      recommendations.push({
        type: 'add',
        priority: 'high',
        message: 'hreflang 태그 추가',
        action: this.generateHreflangTags(config)
      });
    }

    if (!analysis.sitemap.multilingual && config.languages.length > 1) {
      recommendations.push({
        type: 'add',
        priority: 'medium',
        message: '다국어 Sitemap 생성',
        action: '다국어 Sitemap 생성'
      });
    }

    return recommendations;
  }

  printAnalysis(analysis) {
    console.log(chalk.bold.cyan('🌍 다국어 최적화 분석 결과:\n'));
    console.log(chalk.blue(`점수: ${chalk.bold(analysis.score)}/100\n`));
    console.log(chalk.blue(`지원 언어: ${analysis.languages.length}개`));
    console.log(chalk.blue(`hreflang 태그: ${analysis.hreflang.present ? '✅' : '❌'}`));
    console.log(chalk.blue(`다국어 Sitemap: ${analysis.sitemap.multilingual ? '✅' : '❌'}\n`));

    if (analysis.recommendations.length > 0) {
      console.log(chalk.yellow(`💡 권장사항 (${analysis.recommendations.length}개):\n`));
      analysis.recommendations.forEach(rec => {
        const priorityIcon = rec.priority === 'high' ? '🔴' : '🟡';
        console.log(`${priorityIcon} ${rec.message}`);
        if (typeof rec.action === 'string') {
          console.log(chalk.gray(`   → ${rec.action}`));
        }
      });
    }

    console.log(chalk.blue(`\n📄 상세 리포트: ${I18N_REPORT_FILE}\n`));
  }

  async generateHreflangTags(config) {
    try {
      console.log(chalk.blue(`\n🌍 hreflang 태그 생성 중...\n`));

      const tags = [];

      config.languages.forEach(lang => {
        const region = config.regions[lang] || '';
        const langCode = region ? `${lang}-${region}` : lang;
        tags.push(`<link rel="alternate" hreflang="${langCode}" href="https://example.com/${lang}/">`);
      });

      // x-default 추가
      tags.push(`<link rel="alternate" hreflang="x-default" href="https://example.com/${config.defaultLanguage}/">`);

      console.log(chalk.green('✅ hreflang 태그 생성 완료\n'));
      tags.forEach(tag => console.log(chalk.gray(tag)));
      console.log();

      return tags;
    } catch (error) {
      console.error(chalk.red(`❌ hreflang 태그 생성 실패: ${error.message}`));
      throw error;
    }
  }

  async generateMultilingualSitemap(urls, config) {
    try {
      console.log(chalk.blue(`\n🗺️  다국어 Sitemap 생성 중...\n`));

      const sitemap = {
        urlset: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
          'xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
          url: []
        }
      };

      urls.forEach(url => {
        const urlEntry = {
          loc: url.url,
          'xhtml:link': []
        };

        config.languages.forEach(lang => {
          const region = config.regions[lang] || '';
          const langCode = region ? `${lang}-${region}` : lang;
          urlEntry['xhtml:link'].push({
            rel: 'alternate',
            hreflang: langCode,
            href: `${url.baseUrl}/${lang}${url.path}`
          });
        });

        sitemap.urlset.url.push(urlEntry);
      });

      const sitemapFile = path.join(process.cwd(), 'public', 'sitemap-multilingual.xml');
      const sitemapDir = path.dirname(sitemapFile);

      if (!fs.existsSync(sitemapDir)) {
        fs.mkdirSync(sitemapDir, { recursive: true });
      }

      // XML 생성 (간단한 버전)
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
      
      sitemap.urlset.url.forEach(url => {
        xml += `  <url>\n`;
        xml += `    <loc>${url.loc}</loc>\n`;
        url['xhtml:link'].forEach(link => {
          xml += `    <xhtml:link rel="${link.rel}" hreflang="${link.hreflang}" href="${link.href}"/>\n`;
        });
        xml += `  </url>\n`;
      });
      
      xml += '</urlset>';

      await fs.writeFile(sitemapFile, xml);
      console.log(chalk.green(`✅ 다국어 Sitemap 생성 완료: ${sitemapFile}\n`));

      return sitemapFile;
    } catch (error) {
      console.error(chalk.red(`❌ 다국어 Sitemap 생성 실패: ${error.message}`));
      throw error;
    }
  }
}

export default new I18nOptimizer();

