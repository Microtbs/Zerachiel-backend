// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './configs/ormconfig';
import { UsersModule } from './modules/users/users.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), // Carica il file .env (se non esiste, non darà errore)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
      }),
    }),
    /*TypeOrmModule.forRootAsync({ // Configura TypeORM in modo asincrono
      useFactory: () => ormConfig, // Usa la configurazione definita in ormconfig.ts
    }),
    */
    UsersModule,
  ],
})
export class AppModule { }