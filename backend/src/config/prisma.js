import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import pg from 'pg';

// Instancia única (Singleton) para evitar múltiples conexiones
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL must be set to initialize Prisma');
}

const databaseUrl = new URL(connectionString);

if (!['postgres:', 'postgresql:'].includes(databaseUrl.protocol)) {
  throw new Error('DATABASE_URL must use the postgres or postgresql protocol');
}

const caCertificate = readFileSync(
  fileURLToPath(new URL('../../supabase-ca.crt', import.meta.url)),
  'utf8',
);
const pool = new pg.Pool({
  host: databaseUrl.hostname,
  port: databaseUrl.port ? Number(databaseUrl.port) : 5432,
  user: decodeURIComponent(databaseUrl.username),
  password: decodeURIComponent(databaseUrl.password),
  database: decodeURIComponent(databaseUrl.pathname.slice(1)),
  ssl: {
    ca: caCertificate,
    rejectUnauthorized: true,
  },
  connectionTimeoutMillis: 30_000,
});
const adapter = new PrismaPg(pool, { disposeExternalPool: true });

export const prisma = new PrismaClient({ adapter });