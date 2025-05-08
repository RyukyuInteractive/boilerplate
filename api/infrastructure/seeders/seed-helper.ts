import { $ } from 'bun';
import { resolve } from 'node:path';
import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from '@prisma/adapter-libsql';

/**
 * SQLiteファイルのパスを取得する
 * 
 * @returns Promise<string> SQLiteファイルのURL
 * @throws Error SQLiteファイルが見つからない場合
 */
async function getLocalD1DatabasePath() {
  // SQLiteファイルのパスを検索
  const sqlitePath = await $`find .wrangler/state/v3/d1/miniflare-D1DatabaseObject -type f -name '*.sqlite' -print -quit`.text();
  
  const trimmedPath = sqlitePath.trim();

  if (!trimmedPath) {
    throw new Error('SQLiteファイルが見つかりませんでした');
  }

  return `file://${resolve(trimmedPath)}`;
}

/**
 * SQLiteデータベースに接続するPrismaClientを作成する
 * 
 * @returns Promise<PrismaClient> PrismaClientインスタンス
 */
export async function createPrismaClient(): Promise<PrismaClient> {
    const url = process.env.DATABASE_URL ?? await getLocalD1DatabasePath();
    
    // PrismaLibSQLアダプタとPrismaClientを初期化
    const adapter = new PrismaLibSQL({ url });
    const prisma = new PrismaClient({ adapter });
    
    return prisma;
}