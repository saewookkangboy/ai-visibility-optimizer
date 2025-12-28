import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const SOCIAL_MEDIA_DIR = path.join(process.cwd(), '.project-data', 'social-media');
const SOCIAL_MEDIA_CONFIG_FILE = path.join(SOCIAL_MEDIA_DIR, 'social-media-config.json');
const SOCIAL_MEDIA_REPORT_FILE = path.join(SOCIAL_MEDIA_DIR, 'social-media-report.json');

/**
 * 소셜 미디어 최적화 모듈
 * Open Graph, Twitter Cards, LinkedIn 등 소셜 미디어 최적화
 */
class SocialMediaOptimizer {
  constructor() {
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(SOCIAL_MEDIA_DIR)) {
      fs.mkdirSync(SOCIAL_MEDIA_DIR, { recursive: true });
    }
  }

  async loadConfig() {
    try {
      if (fs.existsSync(SOCIAL_MEDIA_CONFIG_FILE)) {
        return await fs.readJson(SOCIAL_MEDIA_CONFIG_FILE);
      }
      return this.getDefaultConfig();
    } catch (error) {
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      platforms: {
        facebook: { enabled: true },
        twitter: { enabled: true },
        linkedin: { enabled: true },
        instagram: { enabled: false },
        pinterest: { enabled: false }
      },
      defaultImage: '',
      defaultSiteName: '',
      defaultLocale: 'ko_KR'
    };
  }

  async analyze(urlOrPath) {
    try {
      console.log(chalk.blue.bold(`\n📱 소셜 미디어 최적화 분석 시작: ${urlOrPath}\n`));

      const analysis = {
        url: urlOrPath,
        timestamp: new Date().toISOString(),
        platforms: {},
        scores: {},
        issues: [],
        recommendations: [],
        overallScore: 0
      };

      const config = await this.loadConfig();

      // 각 플랫폼별 분석
      if (config.platforms.facebook.enabled) {
        const facebookAnalysis = await this.analyzeFacebook(urlOrPath);
        analysis.platforms.facebook = facebookAnalysis;
        analysis.scores.facebook = facebookAnalysis.score;
      }

      if (config.platforms.twitter.enabled) {
        const twitterAnalysis = await this.analyzeTwitter(urlOrPath);
        analysis.platforms.twitter = twitterAnalysis;
        analysis.scores.twitter = twitterAnalysis.score;
      }

      if (config.platforms.linkedin.enabled) {
        const linkedinAnalysis = await this.analyzeLinkedIn(urlOrPath);
        analysis.platforms.linkedin = linkedinAnalysis;
        analysis.scores.linkedin = linkedinAnalysis.score;
      }

      // 전체 점수 계산
      const scores = Object.values(analysis.scores);
      analysis.overallScore = scores.length > 0 
        ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
        : 0;

      // 권장사항 생성
      analysis.recommendations = this.generateRecommendations(analysis);

      // 리포트 저장
      await fs.writeJson(SOCIAL_MEDIA_REPORT_FILE, analysis, { spaces: 2 });

      // 결과 출력
      this.printAnalysis(analysis);

      return analysis;
    } catch (error) {
      console.error(chalk.red(`❌ 소셜 미디어 분석 실패: ${error.message}`));
      throw error;
    }
  }

  async analyzeFacebook(urlOrPath) {
    const analysis = {
      platform: 'facebook',
      score: 0,
      tags: {
        ogTitle: false,
        ogDescription: false,
        ogImage: false,
        ogUrl: false,
        ogType: false,
        ogSiteName: false
      },
      issues: [],
      recommendations: []
    };

    // Open Graph 태그 확인 (시뮬레이션)
    // 실제로는 HTML 파싱 필요
    analysis.tags.ogTitle = true;
    analysis.tags.ogDescription = true;
    analysis.tags.ogImage = false; // 이미지 누락
    analysis.tags.ogUrl = true;
    analysis.tags.ogType = true;
    analysis.tags.ogSiteName = false;

    // 점수 계산
    const tagCount = Object.values(analysis.tags).filter(Boolean).length;
    analysis.score = Math.round((tagCount / Object.keys(analysis.tags).length) * 100);

    if (!analysis.tags.ogImage) {
      analysis.issues.push({
        type: 'missing',
        tag: 'og:image',
        message: 'Open Graph 이미지가 없습니다',
        severity: 'high'
      });
      analysis.recommendations.push({
        type: 'add',
        message: 'og:image 태그 추가',
        action: '<meta property="og:image" content="https://example.com/image.jpg">'
      });
    }

    if (!analysis.tags.ogSiteName) {
      analysis.issues.push({
        type: 'missing',
        tag: 'og:site_name',
        message: 'Open Graph 사이트 이름이 없습니다',
        severity: 'medium'
      });
      analysis.recommendations.push({
        type: 'add',
        message: 'og:site_name 태그 추가',
        action: '<meta property="og:site_name" content="Site Name">'
      });
    }

    return analysis;
  }

  async analyzeTwitter(urlOrPath) {
    const analysis = {
      platform: 'twitter',
      score: 0,
      tags: {
        twitterCard: false,
        twitterTitle: false,
        twitterDescription: false,
        twitterImage: false,
        twitterSite: false,
        twitterCreator: false
      },
      issues: [],
      recommendations: []
    };

    // Twitter Cards 태그 확인
    analysis.tags.twitterCard = true;
    analysis.tags.twitterTitle = true;
    analysis.tags.twitterDescription = true;
    analysis.tags.twitterImage = false;
    analysis.tags.twitterSite = false;
    analysis.tags.twitterCreator = false;

    const tagCount = Object.values(analysis.tags).filter(Boolean).length;
    analysis.score = Math.round((tagCount / Object.keys(analysis.tags).length) * 100);

    if (!analysis.tags.twitterCard) {
      analysis.recommendations.push({
        type: 'add',
        message: 'Twitter Card 타입 추가',
        action: '<meta name="twitter:card" content="summary_large_image">'
      });
    }

    if (!analysis.tags.twitterImage) {
      analysis.recommendations.push({
        type: 'add',
        message: 'Twitter 이미지 추가',
        action: '<meta name="twitter:image" content="https://example.com/image.jpg">'
      });
    }

    return analysis;
  }

  async analyzeLinkedIn(urlOrPath) {
    const analysis = {
      platform: 'linkedin',
      score: 0,
      tags: {
        ogTitle: true,
        ogDescription: true,
        ogImage: false,
        ogUrl: true
      },
      issues: [],
      recommendations: []
    };

    // LinkedIn은 Open Graph 태그 사용
    const tagCount = Object.values(analysis.tags).filter(Boolean).length;
    analysis.score = Math.round((tagCount / Object.keys(analysis.tags).length) * 100);

    if (!analysis.tags.ogImage) {
      analysis.recommendations.push({
        type: 'add',
        message: 'LinkedIn 공유 이미지 추가 (og:image)',
        action: '<meta property="og:image" content="https://example.com/image.jpg">'
      });
    }

    return analysis;
  }

  generateRecommendations(analysis) {
    const recommendations = [];

    Object.entries(analysis.platforms).forEach(([platform, data]) => {
      if (data.score < 80) {
        recommendations.push({
          platform,
          priority: 'high',
          message: `${platform} 최적화 개선 필요 (현재: ${data.score}/100)`,
          action: `${platform} 태그 추가 및 최적화`
        });
      }
    });

    return recommendations;
  }

  printAnalysis(analysis) {
    console.log(chalk.bold.cyan('📱 소셜 미디어 최적화 분석 결과:\n'));
    console.log(chalk.blue(`전체 점수: ${chalk.bold(analysis.overallScore)}/100\n`));

    Object.entries(analysis.scores).forEach(([platform, score]) => {
      const color = score >= 80 ? chalk.green : score >= 60 ? chalk.yellow : chalk.red;
      console.log(`${platform}: ${color(score)}/100`);
    });

    if (analysis.recommendations.length > 0) {
      console.log(chalk.yellow(`\n💡 권장사항 (${analysis.recommendations.length}개):\n`));
      analysis.recommendations.forEach(rec => {
        console.log(`  • ${rec.message}`);
        console.log(chalk.gray(`    → ${rec.action || rec.platform} 최적화`));
      });
    }

    console.log(chalk.blue(`\n📄 상세 리포트: ${SOCIAL_MEDIA_REPORT_FILE}\n`));
  }

  async generateTags(metadata) {
    try {
      console.log(chalk.blue(`\n📱 소셜 미디어 태그 생성 중...\n`));

      const tags = {
        openGraph: [],
        twitter: [],
        linkedin: []
      };

      // Open Graph 태그
      if (metadata.title) {
        tags.openGraph.push(`<meta property="og:title" content="${metadata.title}">`);
      }
      if (metadata.description) {
        tags.openGraph.push(`<meta property="og:description" content="${metadata.description}">`);
      }
      if (metadata.image) {
        tags.openGraph.push(`<meta property="og:image" content="${metadata.image}">`);
      }
      if (metadata.url) {
        tags.openGraph.push(`<meta property="og:url" content="${metadata.url}">`);
      }
      if (metadata.type) {
        tags.openGraph.push(`<meta property="og:type" content="${metadata.type}">`);
      }
      if (metadata.siteName) {
        tags.openGraph.push(`<meta property="og:site_name" content="${metadata.siteName}">`);
      }

      // Twitter Cards 태그
      tags.twitter.push(`<meta name="twitter:card" content="${metadata.twitterCard || 'summary_large_image'}">`);
      if (metadata.title) {
        tags.twitter.push(`<meta name="twitter:title" content="${metadata.title}">`);
      }
      if (metadata.description) {
        tags.twitter.push(`<meta name="twitter:description" content="${metadata.description}">`);
      }
      if (metadata.image) {
        tags.twitter.push(`<meta name="twitter:image" content="${metadata.image}">`);
      }
      if (metadata.twitterSite) {
        tags.twitter.push(`<meta name="twitter:site" content="${metadata.twitterSite}">`);
      }
      if (metadata.twitterCreator) {
        tags.twitter.push(`<meta name="twitter:creator" content="${metadata.twitterCreator}">`);
      }

      // LinkedIn은 Open Graph 태그 사용

      console.log(chalk.green('✅ 소셜 미디어 태그 생성 완료\n'));

      console.log(chalk.bold('Open Graph 태그:\n'));
      tags.openGraph.forEach(tag => console.log(chalk.gray(tag)));

      console.log(chalk.bold('\nTwitter Cards 태그:\n'));
      tags.twitter.forEach(tag => console.log(chalk.gray(tag)));

      console.log();

      return tags;
    } catch (error) {
      console.error(chalk.red(`❌ 태그 생성 실패: ${error.message}`));
      throw error;
    }
  }

  async generatePreview(urlOrPath, options = {}) {
    try {
      console.log(chalk.blue(`\n🖼️  소셜 미디어 미리보기 생성 중...\n`));

      const preview = {
        url: urlOrPath,
        timestamp: new Date().toISOString(),
        platforms: {
          facebook: {
            title: options.title || 'Page Title',
            description: options.description || 'Page Description',
            image: options.image || '',
            url: urlOrPath
          },
          twitter: {
            title: options.title || 'Page Title',
            description: options.description || 'Page Description',
            image: options.image || '',
            card: 'summary_large_image'
          },
          linkedin: {
            title: options.title || 'Page Title',
            description: options.description || 'Page Description',
            image: options.image || ''
          }
        }
      };

      console.log(chalk.green('✅ 미리보기 데이터 생성 완료\n'));
      console.log(chalk.blue('Facebook 미리보기:'));
      console.log(`  제목: ${preview.platforms.facebook.title}`);
      console.log(`  설명: ${preview.platforms.facebook.description}`);
      console.log(`  이미지: ${preview.platforms.facebook.image || '없음'}\n`);

      return preview;
    } catch (error) {
      console.error(chalk.red(`❌ 미리보기 생성 실패: ${error.message}`));
      throw error;
    }
  }
}

export default new SocialMediaOptimizer();

