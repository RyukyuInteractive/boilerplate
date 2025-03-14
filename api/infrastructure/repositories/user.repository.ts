import { UserEntity } from "~/domain/entities/user.entity"
import { NameValue } from "~/domain/values/name.value"
import type { Context } from "~/env"

export class UserRepository {
  constructor(readonly c: Context) {}

  async write(entity: UserEntity) {
    await this.c.var.database.prismaUser.upsert({
      where: { id: entity.id },
      create: {
        id: entity.id,
        login: entity.login,
        email: entity.email,
        name: entity.name.value,
        hashedPassword: entity.hashedPassword,
      },
      update: {
        login: entity.login,
        email: entity.email,
        name: entity.name.value,
        hashedPassword: entity.hashedPassword,
      },
    })

    return null
  }

  async read(id: string): Promise<UserEntity> {
    const user = await this.c.var.database.prismaUser.findUniqueOrThrow({
      where: { id },
    })

    return new UserEntity({
      id: user.id,
      login: user.login,
      email: user.email,
      name: new NameValue(user.name),
      hashedPassword: user.hashedPassword,
      createdAt: user.createdAt ?? new Date(),
      updatedAt: user.updatedAt ?? new Date(),
      deletedAt: user.deletedAt,
    })
  }
}
