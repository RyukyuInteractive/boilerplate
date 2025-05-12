---
applyTo: "**/api/interface/mutation-fields/*.ts"
---

# api/interface/mutation-fields/*.ts

データの書き込みを定義する。

- argsのinputにはidは含めない
- ドメイン層を経由する
- アプリケーション層のクラスを使用する
- 実行に失敗した場合はGraphQLをthrow
- 最後にPrismaでデータを取得してNodeと一致する型の値を取得して変えす

```ts
export const updateUser: MutationFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: PothosUserNode,
    description: "ユーザーを更新する",
    args: {
      id: t.arg.id({ required: true }),
      input: t.arg({ type: PothosUpdateUserInput, required: true }),
    },
    async resolve(_, args, c): Promise<PrismaUser> {
      const service = new UpdateUser(c)

      const result = await service.run({
        id; args.id,
        email: args.input.email,
        password: args.input.password,
      })

      if (result instanceof Error) {
        throw result
      }

      return await c.var.database.prismaUser.findUniqueOrThrow({
        where: { id: result.id },
      })
    },
  })
}
```
