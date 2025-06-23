// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './configs/ormconfig';

import { UsersModule } from './modules/users/users.module';
import { MunicipalityContactsModule } from './modules/municipality_contacts/municipality_contacts.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), // Carica il file .env (se non esiste, non darà errore)
    TypeOrmModule.forRootAsync({ // Configura TypeORM in modo asincrono
      useFactory: () => ormConfig, // Usa la configurazione definita in ormconfig.ts
    }),
    // Importa qui i tuoi Moduli
    UsersModule,
    MunicipalityContactsModule
  ],
})
export class AppModule { }