import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

/**
 * Configurazione condivisa di TypeORM usata sia dal runtime Nest che dai CLI scripts.
 * Utilizza la DATABASE_URL (compatibile con Vercel) e carica tutte le entità/migrazioni sotto src/.
 */
export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  synchronize: false,
  logging: false,
};

const dataSource = new DataSource(ormConfig);

export default dataSource;
