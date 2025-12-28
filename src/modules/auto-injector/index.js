import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const AUTO_INJECT_DIR = path.join(process.cwd(), '.project-data', 'auto-injector');
const AUTO_INJECT_CONFIG_FILE = path.join(AUTO_INJECT_DIR, 'auto-inject-config.json');

/**
 * 자동 반영 시스템 모듈
 * 개발 진행 시 자동으로 웹서비스/앱 서비스에 SEO/AIO/GEO/AI SEO 반영
 */
class AutoInjector {
  constructor() {
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(AUTO_INJECT_DIR)) {
      fs.mkdirSync(AUTO_INJECT_DIR, { recursive: true });
    }
  }

  async loadConfig() {
    try {
      if (fs.existsSync(AUTO_INJECT_CONFIG_FILE)) {
        return await fs.readJson(AUTO_INJECT_CONFIG_FILE);
      }
      return this.getDefaultConfig();
    } catch (error) {
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      enabled: false,
      framework: null,
      optimization: {
        seo: true,
        aiSeo: true,
        geo: true,
        aio: true
      },
      buildIntegration: {
        preBuild: true,
        postBuild: true,
        watch: false
      },
      autoGenerate: {
        metaTags: true,
        structuredData: true,
        sitemap: true,
        robots: true
      }
    };
  }

  async enable() {
    try {
      const config = await this.loadConfig();
      config.enabled = true;
      await fs.writeJson(AUTO_INJECT_CONFIG_FILE, config, { spaces: 2 });
      console.log(chalk.green('✅ 자동 반영 시스템이 활성화되었습니다.'));
      return config;
    } catch (error) {
      console.error(chalk.red(`❌ 활성화 실패: ${error.message}`));
      throw error;
    }
  }

  async disable() {
    try {
      const config = await this.loadConfig();
      config.enabled = false;
      await fs.writeJson(AUTO_INJECT_CONFIG_FILE, config, { spaces: 2 });
      console.log(chalk.yellow('⚠️  자동 반영 시스템이 비활성화되었습니다.'));
      return config;
    } catch (error) {
      console.error(chalk.red(`❌ 비활성화 실패: ${error.message}`));
      throw error;
    }
  }

  async setup(framework) {
    try {
      console.log(chalk.blue(`\n🔧 ${framework} 프레임워크 설정 중...\n`));

      const config = await this.loadConfig();
      config.framework = framework;
      config.enabled = true;

      // 프레임워크별 설정
      const frameworkConfig = this.getFrameworkConfig(framework);
      Object.assign(config, frameworkConfig);

      await fs.writeJson(AUTO_INJECT_CONFIG_FILE, config, { spaces: 2 });

      // 빌드 스크립트 수정
      await this.integrateBuildScript(framework);

      console.log(chalk.green(`✅ ${framework} 설정 완료\n`));
      return config;
    } catch (error) {
      console.error(chalk.red(`❌ 설정 실패: ${error.message}`));
      throw error;
    }
  }

  getFrameworkConfig(framework) {
    const configs = {
      nextjs: {
        buildIntegration: {
          preBuild: true,
          postBuild: true,
          watch: true
        },
        paths: {
          pages: 'pages',
          app: 'app',
          public: 'public'
        }
      },
      react: {
        buildIntegration: {
          preBuild: true,
          postBuild: true,
          watch: true
        },
        paths: {
          src: 'src',
          public: 'public'
        }
      },
      vue: {
        buildIntegration: {
          preBuild: true,
          postBuild: true,
          watch: true
        },
        paths: {
          src: 'src',
          public: 'public'
        }
      }
    };

    return configs[framework] || configs.react;
  }

  async integrateBuildScript(framework) {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      console.log(chalk.yellow('⚠️  package.json을 찾을 수 없습니다.'));
      return;
    }

    const packageJson = await fs.readJson(packageJsonPath);
    
    // 빌드 스크립트에 자동 반영 추가
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    if (framework === 'nextjs') {
      packageJson.scripts['prebuild'] = 'ai-visibility auto-inject pre-build';
      packageJson.scripts['postbuild'] = 'ai-visibility auto-inject post-build';
    } else {
      packageJson.scripts['prebuild'] = 'ai-visibility auto-inject pre-build';
      packageJson.scripts['postbuild'] = 'ai-visibility auto-inject post-build';
    }

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    console.log(chalk.blue('✅ 빌드 스크립트에 통합되었습니다.'));
  }

  async apply(options = {}) {
    try {
      const config = await this.loadConfig();
      
      if (!config.enabled) {
        console.log(chalk.yellow('⚠️  자동 반영 시스템이 비활성화되어 있습니다.'));
        return;
      }

      console.log(chalk.blue.bold('\n🚀 자동 반영 적용 중...\n'));

      const results = {
        timestamp: new Date().toISOString(),
        applied: [],
        skipped: []
      };

      // SEO 최적화
      if (config.optimization.seo && config.autoGenerate.metaTags) {
        console.log(chalk.blue('📊 SEO 메타 태그 생성 중...'));
        await this.injectMetaTags(config);
        results.applied.push('SEO 메타 태그');
      }

      // 구조화된 데이터
      if (config.autoGenerate.structuredData) {
        console.log(chalk.blue('📋 구조화된 데이터 삽입 중...'));
        await this.injectStructuredData(config);
        results.applied.push('구조화된 데이터');
      }

      // Sitemap 생성
      if (config.autoGenerate.sitemap) {
        console.log(chalk.blue('🗺️  Sitemap 생성 중...'));
        const { default: seoModule } = await import('../seo/index.js');
        await seoModule.generateSitemap();
        results.applied.push('Sitemap');
      }

      // Robots.txt 생성
      if (config.autoGenerate.robots) {
        console.log(chalk.blue('🤖 Robots.txt 생성 중...'));
        const { default: seoModule } = await import('../seo/index.js');
        await seoModule.generateRobotsTxt();
        results.applied.push('Robots.txt');
      }

      console.log(chalk.green(`\n✅ 자동 반영 완료 (${results.applied.length}개 적용)\n`));
      return results;
    } catch (error) {
      console.error(chalk.red(`❌ 자동 반영 실패: ${error.message}`));
      throw error;
    }
  }

  async injectMetaTags(config) {
    // HTML 파일 찾기
    const htmlFiles = await this.findHTMLFiles(config);
    
    for (const file of htmlFiles) {
      let content = await fs.readFile(file, 'utf-8');
      
      // 메타 태그가 없으면 생성
      if (!content.includes('<title>')) {
        const title = this.extractTitleFromPath(file);
        content = content.replace('<head>', `<head>\n  <title>${title}</title>`);
      }

      if (!content.includes('<meta name="description"')) {
        const description = this.generateDescription(file);
        content = content.replace('<head>', `<head>\n  <meta name="description" content="${description}">`);
      }

      await fs.writeFile(file, content);
    }
  }

  async injectStructuredData(config) {
    const htmlFiles = await this.findHTMLFiles(config);
    
    for (const file of htmlFiles) {
      let content = await fs.readFile(file, 'utf-8');
      
      // 구조화된 데이터가 없으면 생성
      if (!content.includes('application/ld+json')) {
        const structuredData = this.generateStructuredData(file);
        const scriptTag = `<script type="application/ld+json">\n${JSON.stringify(structuredData, null, 2)}\n</script>`;
        content = content.replace('</head>', `  ${scriptTag}\n</head>`);
        await fs.writeFile(file, content);
      }
    }
  }

  async findHTMLFiles(config) {
    const files = [];
    const searchPaths = this.getSearchPaths(config);

    for (const searchPath of searchPaths) {
      const fullPath = path.join(process.cwd(), searchPath);
      if (fs.existsSync(fullPath)) {
        const htmlFiles = await this.findFiles(fullPath, /\.html?$/);
        files.push(...htmlFiles);
      }
    }

    return files;
  }

  getSearchPaths(config) {
    if (config.framework === 'nextjs') {
      return ['pages', 'app', 'public'];
    } else {
      return ['src', 'public'];
    }
  }

  async findFiles(dir, pattern) {
    const files = [];
    
    if (!fs.existsSync(dir)) {
      return files;
    }

    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        const subFiles = await this.findFiles(fullPath, pattern);
        files.push(...subFiles);
      } else if (pattern.test(entry.name)) {
        files.push(fullPath);
      }
    }

    return files;
  }

  extractTitleFromPath(filePath) {
    const fileName = path.basename(filePath, path.extname(filePath));
    return fileName.charAt(0).toUpperCase() + fileName.slice(1);
  }

  generateDescription(filePath) {
    // 간단한 설명 생성 (실제로는 AI를 활용하여 생성)
    const title = this.extractTitleFromPath(filePath);
    return `${title}에 대한 정보를 제공합니다.`;
  }

  generateStructuredData(filePath) {
    const title = this.extractTitleFromPath(filePath);
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description: this.generateDescription(filePath)
    };
  }

  async preBuild() {
    console.log(chalk.blue('🔧 빌드 전 최적화 적용 중...'));
    await this.apply({ stage: 'pre-build' });
  }

  async postBuild() {
    console.log(chalk.blue('🔧 빌드 후 최적화 적용 중...'));
    await this.apply({ stage: 'post-build' });
  }

  async status() {
    try {
      const config = await this.loadConfig();
      
      console.log(chalk.bold.cyan('\n📊 자동 반영 시스템 상태:\n'));
      console.log(chalk.blue(`활성화: ${config.enabled ? chalk.green('✅') : chalk.red('❌')}`));
      console.log(chalk.blue(`프레임워크: ${config.framework || '미설정'}`));
      console.log(chalk.blue(`\n최적화 항목:`));
      console.log(chalk.blue(`  SEO: ${config.optimization.seo ? '✅' : '❌'}`));
      console.log(chalk.blue(`  AI SEO: ${config.optimization.aiSeo ? '✅' : '❌'}`));
      console.log(chalk.blue(`  GEO: ${config.optimization.geo ? '✅' : '❌'}`));
      console.log(chalk.blue(`  AIO: ${config.optimization.aio ? '✅' : '❌'}`));
      console.log();
      
      return config;
    } catch (error) {
      console.error(chalk.red(`❌ 상태 확인 실패: ${error.message}`));
      throw error;
    }
  }
}

export default new AutoInjector();

