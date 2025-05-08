import { hashSync } from "bcrypt-ts"
import { createPrismaClient } from './seed-helper';
import { UserEntity } from '~/domain/entities/user.entity'
import { NameValue } from '~/domain/values/name.value'
import { randomUUID } from 'crypto';

// シードするユーザーデータ
const users = [
  {
    email: 'admin@example.com',
    name: '管理者',
    password: 'password123',
  },
  {
    email: 'user1@example.com',
    name: 'テストユーザー1',
    password: 'password123',
  },
  {
    email: 'user2@example.com',
    name: 'テストユーザー2',
    password: 'password123',
  },
];

/**
 * ユーザーシードを実行する
 */
export async function seedUsers(): Promise<void> {
  
  const prisma = await createPrismaClient();

  for (const user of users) {
    
    const entity = new UserEntity({
      id: randomUUID(),
      login: randomUUID(),
      email: user.email,
      hashedPassword: hashSync(user.password),
      name: new NameValue(user.name),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    }) 

    // ユーザーを作成
    await prisma.prismaUser.upsert({
      where: { email: entity.email },
      update: {},
      create: {
        id: entity.id,
        login: entity.login,
        email: entity.email,
        name: entity.name.value,
        hashedPassword: entity.hashedPassword,
        updatedAt: entity.updatedAt,
        createdAt: entity.createdAt,
        deletedAt: entity.deletedAt,
      },
    });
  }
    
  await prisma.$disconnect();
}