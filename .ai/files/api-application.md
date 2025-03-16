## api/application/**/*.ts

- idはcrypto.randomUUID()
- 例外はErrorをreturn
- try-catchする
- HTTPExceptionを返却する
- ユーザフレンドリーなエラーメッセージ

### create-*.ts

データを追加する。

```tsx
type Props = {
  name: string
}

/**
 * 組織を作成する
 */
export class CreateOrganization {
  constructor(
    readonly c: Context,
    readonly deps = {
      repository: new OrganizationRepository(c),
    },
  ) {}

  async run(props: Props) {
    try {
      const organizationId = crypto.randomUUID()

      const organization = new OrganizationEntity({
        id: organizationId,
        name: props.name,
      })

      await this.deps.repository.write(organization)

      return organization
    } catch (error) {
      if (error instanceof Error) {
        return new HTTPException(500, error)
      }
      return new HTTPException(500, { message: "組織の作成に失敗しました。" })
    }
  }
}
```

### update-*.ts

データを更新する。

- ドメインモデルのメソッドを用いて更新する

```tsx
type Props = {
  id: string
  name: string
}

/**
 * 組織を作成する
 */
export class UpdateOrganization {
  constructor(
    readonly c: Context,
    readonly deps = {
      repository: new OrganizationRepository(c),
    },
  ) {}

  async run(props: Props) {
    try {
      const organization = await this.deps.repository.read(props.id)

      const draft = organization.updateName({
        name: props.name,
      })

      await this.deps.repository.write(draft)

      return organization
    } catch (error) {
      if (error instanceof Error) {
        return new HTTPException(500, error)
      }
      return new HTTPException(500, { message: "組織の作成に失敗しました。" })
    }
  }
}
```
