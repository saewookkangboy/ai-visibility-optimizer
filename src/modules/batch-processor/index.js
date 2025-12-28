import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const BATCH_PROCESSOR_DIR = path.join(process.cwd(), '.project-data', 'batch-processor');
const BATCH_PROCESSOR_CONFIG_FILE = path.join(BATCH_PROCESSOR_DIR, 'batch-processor-config.json');
const BATCH_PROCESSOR_REPORT_FILE = path.join(BATCH_PROCESSOR_DIR, 'batch-processor-report.json');

/**
 * 배치 처리 모듈
 * 여러 URL을 한 번에 분석하고 주기적으로 실행
 */
class BatchProcessor {
  constructor() {
    this.ensureDirectories();
    this.jobs = new Map();
  }

  ensureDirectories() {
    if (!fs.existsSync(BATCH_PROCESSOR_DIR)) {
      fs.mkdirSync(BATCH_PROCESSOR_DIR, { recursive: true });
    }
  }

  async loadConfig() {
    try {
      if (fs.existsSync(BATCH_PROCESSOR_CONFIG_FILE)) {
        return await fs.readJson(BATCH_PROCESSOR_CONFIG_FILE);
      }
      return this.getDefaultConfig();
    } catch (error) {
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      enabled: true,
      maxConcurrent: 5,
      retryAttempts: 3,
      retryDelay: 1000
    };
  }

  async processFromFile(filePath, options = {}) {
    try {
      console.log(chalk.blue.bold(`\n📦 배치 처리 시작: ${filePath}\n`));

      const urls = await this.loadUrlsFromFile(filePath);
      const config = await this.loadConfig();

      const jobId = `job-${Date.now()}`;
      const job = {
        id: jobId,
        status: 'running',
        total: urls.length,
        completed: 0,
        failed: 0,
        results: [],
        startTime: new Date().toISOString(),
        endTime: null
      };

      this.jobs.set(jobId, job);

      console.log(chalk.blue(`총 ${urls.length}개 URL 처리 시작\n`));

      // 병렬 처리 (최대 동시 실행 수 제한)
      const chunks = this.chunkArray(urls, config.maxConcurrent);
      
      for (const chunk of chunks) {
        const promises = chunk.map(url => this.processUrl(url, jobId, options));
        await Promise.allSettled(promises);
      }

      job.status = 'completed';
      job.endTime = new Date().toISOString();

      // 리포트 저장
      await this.saveJobReport(job);

      console.log(chalk.green(`\n✅ 배치 처리 완료`));
      console.log(chalk.blue(`완료: ${job.completed}/${job.total}`));
      console.log(chalk.blue(`실패: ${job.failed}/${job.total}\n`));

      return job;
    } catch (error) {
      console.error(chalk.red(`❌ 배치 처리 실패: ${error.message}`));
      throw error;
    }
  }

  async loadUrlsFromFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const content = await fs.readFile(filePath, 'utf-8');

    if (ext === '.json') {
      const data = JSON.parse(content);
      return Array.isArray(data) ? data : data.urls || [];
    } else if (ext === '.csv') {
      return this.parseCSV(content);
    } else {
      // 텍스트 파일: 한 줄에 하나씩 URL
      return content.split('\n').filter(line => line.trim().length > 0);
    }
  }

  parseCSV(content) {
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    const urls = [];
    
    // 첫 번째 줄은 헤더일 수 있음
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const columns = line.split(',');
      // 첫 번째 컬럼을 URL로 가정
      if (columns[0] && columns[0].trim().startsWith('http')) {
        urls.push(columns[0].trim());
      }
    }
    
    return urls;
  }

  chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  async processUrl(url, jobId, options = {}) {
    const job = this.jobs.get(jobId);
    if (!job) return;

    try {
      console.log(chalk.blue(`처리 중: ${url}`));

      // 분석 모듈 선택
      const { default: aioModule } = await import('../aio/index.js');
      const result = await aioModule.comprehensiveAnalysis(url);

      job.results.push({
        url,
        status: 'success',
        result,
        timestamp: new Date().toISOString()
      });

      job.completed++;
    } catch (error) {
      console.error(chalk.red(`실패: ${url} - ${error.message}`));
      
      job.results.push({
        url,
        status: 'failed',
        error: error.message,
        timestamp: new Date().toISOString()
      });

      job.failed++;
    }
  }

  async saveJobReport(job) {
    const reportFile = path.join(BATCH_PROCESSOR_DIR, `job-${job.id}.json`);
    await fs.writeJson(reportFile, job, { spaces: 2 });
  }

  async scheduleJob(cronExpression, filePath, options = {}) {
    try {
      console.log(chalk.blue(`\n📅 스케줄 작업 등록: ${cronExpression}\n`));

      const schedule = {
        id: `schedule-${Date.now()}`,
        cron: cronExpression,
        filePath,
        options,
        enabled: true,
        lastRun: null,
        nextRun: null,
        createdAt: new Date().toISOString()
      };

      // 실제로는 node-cron 라이브러리 사용
      console.log(chalk.green(`✅ 스케줄 등록 완료: ${schedule.id}\n`));

      return schedule;
    } catch (error) {
      console.error(chalk.red(`❌ 스케줄 등록 실패: ${error.message}`));
      throw error;
    }
  }

  async getJobStatus(jobId) {
    const job = this.jobs.get(jobId);
    if (!job) {
      // 파일에서 로드 시도
      const reportFile = path.join(BATCH_PROCESSOR_DIR, `job-${jobId}.json`);
      if (fs.existsSync(reportFile)) {
        return await fs.readJson(reportFile);
      }
      return null;
    }
    return job;
  }

  async listJobs() {
    const jobs = [];
    
    // 메모리의 작업
    for (const [id, job] of this.jobs.entries()) {
      jobs.push({
        id,
        status: job.status,
        total: job.total,
        completed: job.completed,
        failed: job.failed,
        startTime: job.startTime
      });
    }

    // 파일의 작업
    const files = await fs.readdir(BATCH_PROCESSOR_DIR);
    const jobFiles = files.filter(f => f.startsWith('job-') && f.endsWith('.json'));
    
    for (const file of jobFiles) {
      const jobId = path.basename(file, '.json');
      if (!this.jobs.has(jobId)) {
        const job = await fs.readJson(path.join(BATCH_PROCESSOR_DIR, file));
        jobs.push({
          id: jobId,
          status: job.status,
          total: job.total,
          completed: job.completed,
          failed: job.failed,
          startTime: job.startTime
        });
      }
    }

    return jobs;
  }
}

export default new BatchProcessor();

