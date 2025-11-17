import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  transporter: any;
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendVerificationEmail(email: string, token: number) {
    const appUrl = this.configService.get('APP_URL');
    //const appUrl = 'https://zerachiel-frontend.vercel.app/login';
    await this.mailerService.sendMail({
      to: email,
      subject: 'Conferma la tua registrazione',
      html: `
      <img src="https://i.imgur.com/ysCR4Rg.png" width="70"/>
        <h2>Benvenuto!</h2>
        <p>Per confermare la tua registrazione inserisci questo codice nel form di registrazione: ${token} oppure clicca questo <a href="${appUrl}/auth/verify?token=${token}">Link</a></p>
      `,
    });
  }

  async sendRecoverEmail(email: string, token: number) {
    const appUrl = this.configService.get('APP_URL');
    await this.mailerService.sendMail({
      to: email,
      subject: 'Recupera la tua password',
      html: `
      <img src="https://i.imgur.com/ysCR4Rg.png" width="70"/>
        <h2>Recupera la tua password</h2>
        <p>Per recuperare la tua password inserisci questo codice nel form di recupero: ${token}</p>
      `,
    });
  }
}
