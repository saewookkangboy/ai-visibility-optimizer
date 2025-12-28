import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

/**
 * 프로젝트 초기화 스크립트
 */
async function init() {
  try {
    console.log(chalk.blue.bold('\n🚀 AI Visibility Optimizer 초기화 중...\n'));

    // 디렉토리 생성
    const directories = [
      '.project-data',
      '.project-data/seo',
      '.project-data/ai-seo',
      '.project-data/geo',
      '.project-data/aio',
      '.project-data/auto-injector',
      '.project-data/agent-lightning',
      '.project-data/ai-visibility',
      'public'
    ];

    for (const dir of directories) {
      const fullPath = path.join(process.cwd(), dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(chalk.green(`✅ ${dir} 디렉토리 생성`));
      }
    }

    // .env.example 생성
    const envExample = `# AI Visibility Optimizer 환경 변수

# API Keys (선택사항)
# OPENAI_API_KEY=your-openai-api-key
# ANTHROPIC_API_KEY=your-anthropic-api-key
# GOOGLE_API_KEY=your-google-api-key

# 설정
AUTO_INJECT_ENABLED=false
AGENT_LIGHTNING_ENABLED=false
ONLINE_LEARNING_ENABLED=false
`;

    const envExamplePath = path.join(process.cwd(), '.env.example');
    if (!fs.existsSync(envExamplePath)) {
      await fs.writeFile(envExamplePath, envExample);
      console.log(chalk.green('✅ .env.example 생성'));
    }

    console.log(chalk.green('\n✅ 초기화 완료!\n'));
    console.log(chalk.blue('다음 단계:'));
    console.log(chalk.blue('  1. ai-visibility seo analyze <url> - SEO 분석'));
    console.log(chalk.blue('  2. ai-visibility aio analyze <url> - 종합 분석'));
    console.log(chalk.blue('  3. ai-visibility auto-inject setup --framework nextjs - 자동 반영 설정\n'));
  } catch (error) {
    console.error(chalk.red(`❌ 초기화 실패: ${error.message}`));
    process.exit(1);
  }
}

init();

