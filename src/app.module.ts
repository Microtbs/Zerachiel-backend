import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './configs/ormconfig';

import { MunicipalityContactsModule } from './modules/municipality_contacts/municipality_contacts.module';
import { DeceasedModule } from './modules/deceased/deceased.module';
import { GravesModule } from './modules/graves/graves.module';
import { DigitalFlowersModule } from './modules/digital_flowers/digital_flowers.module';
import { MunicipalitiesModule } from './modules/municipalities/municipalities.module';
import { RequestOfficesModule } from './modules/request_offices/request_offices.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessagesModule } from './modules/messages/messages.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { RolesModule } from './modules/roles/roles.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), // Carica il file .env (se non esiste, non darà errore)
    TypeOrmModule.forRootAsync({
      // Configura TypeORM in modo asincrono
      useFactory: () => ormConfig, // Usa la configurazione definita in ormconfig.ts
    }),
    // Importa qui i tuoi Moduli
    AccountsModule,
    GravesModule,
    MunicipalityContactsModule,
    DeceasedModule,
    MunicipalitiesModule,
    DigitalFlowersModule,
    RequestOfficesModule,
    AuthModule,
    MessagesModule,
    RolesModule,
    MailModule,
  ],
})
export class AppModule {}
