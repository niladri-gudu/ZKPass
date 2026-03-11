import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient as GeneratedClient } from './generated/prisma/client.js';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new GeneratedClient({ adapter });

export { GeneratedClient as PrismaClient };
export * from './generated/prisma/client.js';