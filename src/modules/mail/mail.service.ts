import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly fromAddress: string;

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    this.fromAddress =
      this.configService.get<string>('MAIL_FROM') ??
      `no-reply@${this.configService.get<string>('APP_HOST') ?? 'example.com'}`;
  }

  async sendVerificationEmail(email: string, token: number): Promise<void> {
    const appUrl = this.configService.get<string>('APP_URL') ?? '';
    const verifyUrl = `${appUrl.replace(/\/$/, '')}/auth/verify?token=${encodeURIComponent(
      token,
    )}`;

    try {
      await this.mailerService.sendMail({
        to: email,
        from: this.fromAddress,
        subject: 'Conferma la tua registrazione',
        template: 'ver',
        context: {
          token,
          verifyUrl,
        },
      });
    } catch (err) {
      console.error(
        `Errore inviando mail di verifica a ${email}`,
        (err as Error).stack,
      );
      throw err;
    }
  }

  async sendRecoverEmail(email: string, token: number): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: this.fromAddress,
        subject: 'Recupera la tua password',
        template: 'recover',
        context: {
          token,
        },
      });
    } catch (err) {
      console.error(
        `Errore inviando mail di recover a ${email}`,
        (err as Error).stack,
      );
      throw err;
    }
  }
}
