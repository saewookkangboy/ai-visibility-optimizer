import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const PERFORMANCE_BENCHMARK_DIR = path.join(process.cwd(), '.project-data', 'performance-benchmark');
const PERFORMANCE_BENCHMARK_CONFIG_FILE = path.join(PERFORMANCE_BENCHMARK_DIR, 'performance-benchmark-config.json');
const PERFORMANCE_BENCHMARK_REPORT_FILE = path.join(PERFORMANCE_BENCHMARK_DIR, 'performance-benchmark-report.json');

/**
 * 성능 벤치마킹 모듈
 * 성능 기준선 설정 및 추적
 */
class PerformanceBenchmark {
  constructor() {
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(PERFORMANCE_BENCHMARK_DIR)) {
      fs.mkdirSync(PERFORMANCE_BENCHMARK_DIR, { recursive: true });
    }
  }

  async loadConfig() {
    try {
      if (fs.existsSync(PERFORMANCE_BENCHMARK_CONFIG_FILE)) {
        return await fs.readJson(PERFORMANCE_BENCHMARK_CONFIG_FILE);
      }
      return this.getDefaultConfig();
    } catch (error) {
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      enabled: true,
      baseline: {
        lcp: 2.5, // Largest Contentful Paint (초)
        fid: 100, // First Input Delay (밀리초)
        cls: 0.1, // Cumulative Layout Shift
        fcp: 1.8, // First Contentful Paint (초)
        ttfb: 0.6 // Time to First Byte (초)
      },
      tracking: {
        frequency: 'daily',
        compareWithCompetitors: false
      }
    };
  }

  async analyze(urlOrPath) {
    try {
      console.log(chalk.blue.bold(`\n⚡ 성능 벤치마킹 분석 시작: ${urlOrPath}\n`));

      const config = await this.loadConfig();
      const analysis = {
        url: urlOrPath,
        timestamp: new Date().toISOString(),
        metrics: {},
        baseline: config.baseline,
        comparison: {},
        trends: [],
        issues: [],
        recommendations: [],
        score: 0
      };

      // 성능 메트릭 측정 (시뮬레이션)
      analysis.metrics = await this.measurePerformance(urlOrPath);

      // 기준선과 비교
      analysis.comparison = this.compareWithBaseline(analysis.metrics, config.baseline);

      // 트렌드 분석
      analysis.trends = await this.analyzeTrends(urlOrPath);

      // 이슈 및 권장사항 생성
      analysis.issues = this.identifyIssues(analysis.comparison);
      analysis.recommendations = this.generateRecommendations(analysis.issues);

      // 점수 계산
      analysis.score = this.calculateScore(analysis);

      // 리포트 저장
      await fs.writeJson(PERFORMANCE_BENCHMARK_REPORT_FILE, analysis, { spaces: 2 });

      // 결과 출력
      this.printAnalysis(analysis);

      return analysis;
    } catch (error) {
      console.error(chalk.red(`❌ 성능 벤치마킹 실패: ${error.message}`));
      throw error;
    }
  }

  async measurePerformance(urlOrPath) {
    // 시뮬레이션: 실제로는 Lighthouse API 또는 PageSpeed Insights 사용
    return {
      lcp: 2.1,
      fid: 80,
      cls: 0.08,
      fcp: 1.5,
      ttfb: 0.5
    };
  }

  compareWithBaseline(metrics, baseline) {
    const comparison = {};

    Object.keys(baseline).forEach(key => {
      const metric = metrics[key];
      const baselineValue = baseline[key];
      
      comparison[key] = {
        current: metric,
        baseline: baselineValue,
        difference: metric - baselineValue,
        percentage: ((metric - baselineValue) / baselineValue) * 100,
        status: metric <= baselineValue ? 'good' : 'needs-improvement'
      };
    });

    return comparison;
  }

  async analyzeTrends(urlOrPath) {
    // 시뮬레이션: 실제로는 이전 측정값과 비교
    return [
      {
        metric: 'lcp',
        trend: 'improving',
        change: -0.2
      }
    ];
  }

  identifyIssues(comparison) {
    const issues = [];

    Object.entries(comparison).forEach(([key, data]) => {
      if (data.status === 'needs-improvement') {
        issues.push({
          metric: key,
          current: data.current,
          baseline: data.baseline,
          message: `${key.toUpperCase()}가 기준선보다 ${data.percentage.toFixed(1)}% 느립니다`,
          severity: data.percentage > 20 ? 'high' : 'medium'
        });
      }
    });

    return issues;
  }

  generateRecommendations(issues) {
    const recommendations = [];

    issues.forEach(issue => {
      const recommendation = {
        metric: issue.metric,
        message: `${issue.metric.toUpperCase()} 개선 필요`,
        action: this.getRecommendationAction(issue.metric)
      };
      recommendations.push(recommendation);
    });

    return recommendations;
  }

  getRecommendationAction(metric) {
    const actions = {
      lcp: '이미지 최적화, 서버 응답 시간 개선',
      fid: 'JavaScript 최적화, 코드 분할',
      cls: '이미지 크기 지정, 동적 콘텐츠 최소화',
      fcp: '리소스 우선순위 설정, 렌더링 차단 제거',
      ttfb: '서버 성능 개선, CDN 사용'
    };

    return actions[metric] || '성능 최적화';
  }

  calculateScore(analysis) {
    let score = 100;

    analysis.issues.forEach(issue => {
      if (issue.severity === 'high') {
        score -= 15;
      } else {
        score -= 10;
      }
    });

    return Math.max(0, Math.min(100, score));
  }

  printAnalysis(analysis) {
    console.log(chalk.bold.cyan('⚡ 성능 벤치마킹 분석 결과:\n'));
    console.log(chalk.blue(`점수: ${chalk.bold(analysis.score)}/100\n`));

    console.log(chalk.bold('성능 메트릭:\n'));
    Object.entries(analysis.comparison).forEach(([key, data]) => {
      const color = data.status === 'good' ? chalk.green : chalk.red;
      const icon = data.status === 'good' ? '✅' : '❌';
      console.log(`${icon} ${key.toUpperCase()}: ${data.current} (기준선: ${data.baseline})`);
    });

    if (analysis.issues.length > 0) {
      console.log(chalk.yellow(`\n⚠️  발견된 문제 (${analysis.issues.length}개):\n`));
      analysis.issues.forEach(issue => {
        const icon = issue.severity === 'high' ? '🔴' : '🟡';
        console.log(`${icon} ${issue.message}`);
      });
    }

    if (analysis.recommendations.length > 0) {
      console.log(chalk.yellow(`\n💡 권장사항 (${analysis.recommendations.length}개):\n`));
      analysis.recommendations.forEach(rec => {
        console.log(`  • ${rec.message}`);
        console.log(chalk.gray(`    → ${rec.action}`));
      });
    }

    console.log(chalk.blue(`\n📄 상세 리포트: ${PERFORMANCE_BENCHMARK_REPORT_FILE}\n`));
  }

  async setBaseline(urlOrPath) {
    try {
      console.log(chalk.blue(`\n📊 성능 기준선 설정 중: ${urlOrPath}\n`));

      const metrics = await this.measurePerformance(urlOrPath);
      const config = await this.loadConfig();
      
      config.baseline = metrics;

      await fs.writeJson(PERFORMANCE_BENCHMARK_CONFIG_FILE, config, { spaces: 2 });

      console.log(chalk.green('✅ 성능 기준선 설정 완료\n'));
      console.log(chalk.blue('기준선 메트릭:\n'));
      Object.entries(metrics).forEach(([key, value]) => {
        console.log(`  ${key.toUpperCase()}: ${value}`);
      });
      console.log();

      return metrics;
    } catch (error) {
      console.error(chalk.red(`❌ 기준선 설정 실패: ${error.message}`));
      throw error;
    }
  }
}

export default new PerformanceBenchmark();

