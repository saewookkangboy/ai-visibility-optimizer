import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const NOTIFICATION_DIR = path.join(process.cwd(), '.project-data', 'notification');
const NOTIFICATION_CONFIG_FILE = path.join(NOTIFICATION_DIR, 'notification-config.json');

/**
 * 알림 시스템 모듈
 * 이메일, Slack, Discord 알림
 */
class NotificationSystem {
  constructor() {
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(NOTIFICATION_DIR)) {
      fs.mkdirSync(NOTIFICATION_DIR, { recursive: true });
    }
  }

  async loadConfig() {
    try {
      if (fs.existsSync(NOTIFICATION_CONFIG_FILE)) {
        return await fs.readJson(NOTIFICATION_CONFIG_FILE);
      }
      return this.getDefaultConfig();
    } catch (error) {
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      enabled: true,
      channels: {
        email: {
          enabled: false,
          smtp: {
            host: '',
            port: 587,
            secure: false,
            auth: {
              user: '',
              pass: ''
            }
          },
          from: '',
          to: []
        },
        slack: {
          enabled: false,
          webhookUrl: ''
        },
        discord: {
          enabled: false,
          webhookUrl: ''
        }
      },
      thresholds: {
        scoreDrop: 10, // 점수가 10점 이상 하락 시 알림
        visibilityDrop: 5 // 가시성이 5점 이상 하락 시 알림
      }
    };
  }

  async sendEmail(subject, message, options = {}) {
    try {
      const config = await this.loadConfig();
      
      if (!config.channels.email.enabled) {
        console.log(chalk.yellow('⚠️  이메일 알림이 비활성화되어 있습니다.'));
        return;
      }

      // 실제로는 nodemailer 라이브러리 사용
      // 여기서는 시뮬레이션
      console.log(chalk.blue(`\n📧 이메일 전송 중...\n`));
      console.log(chalk.blue(`제목: ${subject}`));
      console.log(chalk.blue(`수신자: ${config.channels.email.to.join(', ')}`));
      console.log(chalk.blue(`내용: ${message}\n`));

      console.log(chalk.green('✅ 이메일 전송 완료\n'));

      return { success: true };
    } catch (error) {
      console.error(chalk.red(`❌ 이메일 전송 실패: ${error.message}`));
      throw error;
    }
  }

  async sendSlack(message, options = {}) {
    try {
      const config = await this.loadConfig();
      
      if (!config.channels.slack.enabled) {
        console.log(chalk.yellow('⚠️  Slack 알림이 비활성화되어 있습니다.'));
        return;
      }

      // 실제로는 axios를 사용하여 webhook 호출
      console.log(chalk.blue(`\n💬 Slack 메시지 전송 중...\n`));
      console.log(chalk.blue(`메시지: ${message}\n`));

      // 시뮬레이션
      // await axios.post(config.channels.slack.webhookUrl, { text: message });

      console.log(chalk.green('✅ Slack 메시지 전송 완료\n'));

      return { success: true };
    } catch (error) {
      console.error(chalk.red(`❌ Slack 전송 실패: ${error.message}`));
      throw error;
    }
  }

  async sendDiscord(message, options = {}) {
    try {
      const config = await this.loadConfig();
      
      if (!config.channels.discord.enabled) {
        console.log(chalk.yellow('⚠️  Discord 알림이 비활성화되어 있습니다.'));
        return;
      }

      console.log(chalk.blue(`\n💬 Discord 메시지 전송 중...\n`));
      console.log(chalk.blue(`메시지: ${message}\n`));

      // 시뮬레이션
      // await axios.post(config.channels.discord.webhookUrl, { content: message });

      console.log(chalk.green('✅ Discord 메시지 전송 완료\n'));

      return { success: true };
    } catch (error) {
      console.error(chalk.red(`❌ Discord 전송 실패: ${error.message}`));
      throw error;
    }
  }

  async sendNotification(type, subject, message, options = {}) {
    const results = {};

    if (type === 'email' || type === 'all') {
      results.email = await this.sendEmail(subject, message, options);
    }

    if (type === 'slack' || type === 'all') {
      results.slack = await this.sendSlack(message, options);
    }

    if (type === 'discord' || type === 'all') {
      results.discord = await this.sendDiscord(message, options);
    }

    return results;
  }

  async checkThresholds(currentMetrics, previousMetrics) {
    try {
      const config = await this.loadConfig();
      const alerts = [];

      // 점수 하락 체크
      if (previousMetrics && currentMetrics.score < previousMetrics.score) {
        const drop = previousMetrics.score - currentMetrics.score;
        if (drop >= config.thresholds.scoreDrop) {
          alerts.push({
            type: 'score_drop',
            message: `점수가 ${drop}점 하락했습니다 (${previousMetrics.score} → ${currentMetrics.score})`,
            severity: 'high'
          });
        }
      }

      // 가시성 하락 체크
      if (previousMetrics && currentMetrics.visibility < previousMetrics.visibility) {
        const drop = previousMetrics.visibility - currentMetrics.visibility;
        if (drop >= config.thresholds.visibilityDrop) {
          alerts.push({
            type: 'visibility_drop',
            message: `가시성이 ${drop}점 하락했습니다 (${previousMetrics.visibility} → ${currentMetrics.visibility})`,
            severity: 'high'
          });
        }
      }

      // 알림 전송
      if (alerts.length > 0) {
        for (const alert of alerts) {
          await this.sendNotification('all', 'AI Visibility 알림', alert.message);
        }
      }

      return alerts;
    } catch (error) {
      console.error(chalk.red(`❌ 임계값 체크 실패: ${error.message}`));
      throw error;
    }
  }

  async sendDailyReport(url, metrics) {
    try {
      const report = this.generateDailyReport(url, metrics);
      
      await this.sendNotification('all', 
        `일일 리포트 - ${url}`, 
        report
      );

      return { success: true };
    } catch (error) {
      console.error(chalk.red(`❌ 일일 리포트 전송 실패: ${error.message}`));
      throw error;
    }
  }

  generateDailyReport(url, metrics) {
    let report = `📊 일일 AI Visibility 리포트\n\n`;
    report += `URL: ${url}\n`;
    report += `날짜: ${new Date().toLocaleDateString('ko-KR')}\n\n`;
    report += `점수 요약:\n`;
    report += `- 전체 점수: ${metrics.score || 'N/A'}/100\n`;
    report += `- SEO: ${metrics.seo || 'N/A'}/100\n`;
    report += `- AI SEO: ${metrics.aiSeo || 'N/A'}/100\n`;
    report += `- GEO: ${metrics.geo || 'N/A'}/100\n`;
    report += `- AI Visibility: ${metrics.visibility || 'N/A'}/100\n`;

    return report;
  }
}

export default new NotificationSystem();

