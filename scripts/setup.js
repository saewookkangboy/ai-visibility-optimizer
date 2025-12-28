import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

/**
 * 설정 스크립트
 */
async function setup() {
  try {
    console.log(chalk.blue.bold('\n🔧 AI Visibility Optimizer 설정 중...\n'));

    // 기본 설정 파일 생성
    const configs = {
      seo: {
        meta: {
          title: { maxLength: 60, minLength: 30, recommended: 50 },
          description: { maxLength: 160, minLength: 120, recommended: 155 }
        },
        sitemap: { enabled: true, changefreq: 'weekly', priority: 0.8 },
        robots: { enabled: true, allow: ['/'], disallow: ['/admin', '/private'] }
      },
      'ai-seo': {
        optimization: {
          keywordDensity: { min: 0.5, max: 2.0, optimal: 1.0 },
          semanticKeywords: true,
          contentQuality: { minScore: 80, readability: true }
        }
      },
      geo: {
        targetEngines: ['chatgpt', 'claude', 'perplexity', 'gemini'],
        structuredData: { enabled: true, types: ['FAQPage', 'HowTo', 'Article'] }
      },
      aio: {
        optimization: {
          seo: true,
          aiSeo: true,
          geo: true,
          performance: true,
          accessibility: true,
          security: true,
          social: true
        }
      }
    };

    for (const [module, config] of Object.entries(configs)) {
      const configDir = path.join(process.cwd(), '.project-data', module);
      const configFile = path.join(configDir, `${module}-config.json`);

      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }

      if (!fs.existsSync(configFile)) {
        await fs.writeJson(configFile, config, { spaces: 2 });
        console.log(chalk.green(`✅ ${module} 설정 파일 생성`));
      }
    }

    console.log(chalk.green('\n✅ 설정 완료!\n'));
  } catch (error) {
    console.error(chalk.red(`❌ 설정 실패: ${error.message}`));
    process.exit(1);
  }
}

setup();

