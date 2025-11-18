import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailConfig } from '../../configs/mailconfig';

/**
 * Modulo dedicato alle notifiche e-mail.
 * Configura dinamicamente il MailerModule e riesporta il MailService.
 */
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        MailConfig.createMailerOptions(config),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
