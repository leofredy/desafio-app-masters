import { DataSource } from 'typeorm';
import 'dotenv/config';

/**
 * Realizei a importação sincrona
 * para evitar erro na execução do testes automatizado no JEST :(
 */
import EntityGiver from './entity/GiverSchema.js';
import EntityDevice from './entity/DeviceSchema.js';
import EntityDonation from './entity/DonationSchema.js';
import MigrationGiver from './migrations/1659572082009-giver.js';
import MigrationDonation from './migrations/1659580164144-donation.js';
import MigrationDevice from './migrations/1659663282049-device.js';

export default new DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [EntityGiver, EntityDevice, EntityDonation],
  migrations: [MigrationDevice, MigrationDonation, MigrationGiver],
});
