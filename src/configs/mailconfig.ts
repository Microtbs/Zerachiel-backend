import { ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';

export class MailConfig {
  static createMailerOptions(config: ConfigService): MailerOptions {
    return {
      transport: {
        host: config.get<string>('MAIL_HOST'),
        port: Number(config.get<string>('MAIL_PORT')),
        secure: config.get<string>('MAIL_SECURE') === 'true',
        auth: {
          user: config.get<string>('MAIL_USER'),
          pass: config.get<string>('MAIL_PASS'),
        },
      },
      defaults: {
        from: config.get<string>('MAIL_FROM'),
      },
    };
  }
}
