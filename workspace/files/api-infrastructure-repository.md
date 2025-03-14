## infrastructure/repositories/*.repository.ts

- write
  - Entityを受け取りデータベースに書き込む
  - return null
- read
  - データベースを読み取りEntityに詰め替えて返す

```tsx
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
      },
      update: {
        login: entity.login,
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
    })
  }
}
```
