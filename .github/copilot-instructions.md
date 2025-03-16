# 応答

- chain of draft - 問題解決に必要な最低限の短いメモを応答しなさい

## 相談と記録

以下のファイルを読んで機能やページに関する相談に応答しなさい。必要に応じてファイルを書き換え記録をしなさい。

- `workspace/sheets/features.csv`: 機能の一覧
- `workspace/sheets/pages.csv`: ページに関する更新
- `workspace/sheets/words.csv`: 製品における用語集

必要に応じて以下のファイルも書き換えなさい。

- `workspace/output.md`: 応答のルール
- `workspace/development.md`: 開発規約
- `workspace/code.md`: コード規約
- `workspace/overview.md`: 製品の概要
- `workspace/features.md`: コアな機能に関する仕様
- `workspace/directories.md`: ディレクトリの説明
- `workspace/libraries.md`: 重要なライブラリの一覧

また、これらを更新した場合は以下のコマンドを実行しなさい。

```
bun run --cwd workspace build
```

### `workspace/sheets/pages.csv`

以下の形式のCSVであること。

```
path,name,description,deprecated_reason
パス,名前,簡単な説明,廃止の場合は理由（or 空文字）
```

### `workspace/sheets/features.csv`

以下の形式のCSVであること。

```
path,priority,name,description,deprecated_reason
パス,重要度,名前,簡単な説明,廃止の場合は理由（or 空文字）
```

値は以下のルールに従うこと。

- パス: pages.csvに存在するパスのみを使用する
- priority: 数字で重要度を表現する
  - 0: コアの機能
  - 1: 必要なサブ機能
  - 2: 補助的な機能

### `workspace/sheets/words.csv`

以下の形式のCSVであること。

```
name,description
名前,説明
```

## 条件分岐: 製品の機能の開発の場合

顧客の発言が「製品の仕様に関する質問」や「製品の全体に関わる開発の依頼」である場合は、以下の流れに従います。

顧客の要望をヒアリングし、相談に応じて、必要に応じて開発を行います。この開発を進める場合は必要かどうか顧客に確認しなさい。

### 1. 要望のヒアリング

- 顧客の最初の要望を丁寧に聞き、理解します
- 曖昧な点や不明確な点があれば、具体的な質問をします

### 2. 要望の整理と確認

- 顧客の要望を整理し、以下の点を明確にします
  - 追加したい機能やページの概要
  - 期待する動作や挙動
  - 優先度や期限
- 整理した内容を顧客に確認し、合意を得ます

### 3. 技術的な検討

- 既存の機能やページ構成を踏まえ、実装方法を検討します
- 以下の点を考慮します
  - 既存のAPIとの連携方法
  - 新規APIの必要性
  - 既存のページ構成との整合性
  - コンポーネントの再利用性

### 4. 実装計画の提案

- 検討結果をもとに、実装計画を提案します
- 以下の内容を含めます
  - 追加するAPIの仕様（必要な場合）
  - 追加するページの構成とUI
  - 既存コードへの変更点
  - 想定される課題や懸念点

### 5. 合意形成と実装

- 提案した実装計画について顧客の同意を得ます
- 合意が得られたら、実装を進めます
  - APIの追加（必要な場合）
  - ページの追加
  - コンポーネントの実装
  - テストの提案

# 製品概要

このリポジトリはモノレポです。

# ディレクトリ構成

- `schema.prisma` - Prismaのスキーマ
- `api/application/` - アプリケーション層
- `api/application/**/*.ts` - ユースケース
- `api/domain/` - ドメイン層
- `api/domain/entities/*.entity.ts` - Entity
- `api/domain/values/*.value.ts` - 値オブジェクト
- `api/infrastructure/` - インフラ層
- `api/infrastructure/repositories/*.repository.ts` - リポジトリ
- `api/infrastructure/adapters/*.adapter.ts` - 外部APIなど
- `api/interface/` - インターフェース層
- `api/interface/errors/*-error.ts` - GraphQLのErrorクラス
- `api/interface/inputs/*-input.ts` - GraphQLのInputの型
- `api/interface/middlewares/*.ts` - Honoのミドルウェア
- `api/interface/mutation-fields/*.ts` - GraphQLのMutationのフィールド
- `api/interface/routes/*.ts` - Honoのルーティング
- `api/interface/types/*.ts` - APIで使用される型定義
- `api/interface/app.ts` - APIのエントリーポイント
- `api/schema.ts` - GraphQLのスキーマ
- `api/lib/` - 全ての層から参照できるライブラリ
- `api/env.d.ts` - 全体で使用される型
- `app/interface/components/` - Reactのコンポーネント
- `app/interface/components/pages/` - 404などのページ
- `app/interface/components/ui/` - shadcn/uiのコンポーネント
- `app/interface/components/ui-custom/` - shadcn/uiのカスタムしたコンポーネント
- `app/interface/hooks/` - ReactのHooks
- `app/interface/lib/` - 自作のライブラリ
- `app/interface/routes` - ReactRouterのルーティング（flat-routes）
- `app/lib/route-tree.gen.ts` - 全てのページのルーティング情報
- `app/lib/graphql-client.ts` - GraphQLのクライアント
- `app/lib/hono-client.ts` - HonoのAPIクライアント

# ライブラリ

- `@pothos/core` - GraphQLのスキーマを定義する
- `@prisma/client` - データベースのORM

# コマンド

- `bun test` - テストを実行する
- `bun run format` - コードを整形する
- `bun run --cwd workspace update-pages-csv` - ページを追加した場合は実行する
- `bun run --cwd workspace update-instructions-markdown` - ルールを更新する

# モノレポ

## /app - 管理画面（Webサイト）

管理画面です。

APIの開発の場合は以下のルールに従ってください。

- ディレクトリ「app」の配下のみを参照する

## /api - GraphQL API

APIの開発の場合は以下のルールに従ってください。

- ディレクトリ「api」の配下のみを参照する
- Prismaに関しては「schema.prisma」を参照する

# 開発ケース

## APIにMutationを追加する

データを更新する機能を追加する場合、以下のファイルを読み書きしてください。

- `api/interface/mutation-fields/*.ts` - GraphQLのMutation
- `api/interface/inputs/*-input.ts` - GraphQLのMutationのInput
- `api/interface/objects/*-node.ts` - GraphQLのNode
- `api/application/*.ts` - ユースケース
- `api/domain/entities/*.entity.ts` - Entity
- `api/domain/values/*.value.ts` - Value Objects
- `api/infrastructure/repositories/*.repository.ts` - リポジトリ
- `api/infrastructure/adapters/*.adapter.ts` - 外部APIなど
- `api/interface/schema.ts` - GraphQLのスキーマ

## APIにQueryを追加する

データを更新する機能を追加する場合、以下のファイルを読み書きしてください。

- `api/interface/query-fields/*.ts` - GraphQLのQuery
- `api/interface/objects/*-node.ts` - GraphQLのNode
- `api/interface/schema.ts` - GraphQLのスキーマ

## Prismaのスキーマを生成する

スキーマを更新した際は実行しなさい。

```bash
bun run generate
```

マイグレーションを作成する。

```bash
bun run --cwd api create-migration
```

マイグレーションを実行する。

```bash
bun run --cwd api run-migration
```

# サンプルコード

## api/domain/values/*.value.ts

- クラス名はValueで終わる

```ts
import { type InferInput, maxLength, parse, pipe, string } from "valibot"

const vValue = pipe(string(), maxLength(128))

type Value = InferInput<typeof vValue>

export class NameValue {
  constructor(public readonly value: Value) {
    Object.assign(this, parse(vValue, value))
  }
}
```

## api/interface/mutation-fields/*.ts

データの書き込みを定義する。

- argsのinputにはidは含めない
- ドメイン層を経由する
- アプリケーション層のクラスを使用する
- 実行に失敗した場合はGraphQLをthrow
- 最後にNodeと一致する型の値を取得して変えす

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
        throw new InvalidArgumentGraphQLError("ユーザの更新に失敗しました。")
      }

      const user = await c.var.database.prismaUser.findUniqueOrThrow({
        where: { id: result.id },
      })

      return user
    },
  })
}
```

## api/interface/query-fields/*.ts

データの取得を定義する

- ドメイン層を経由しない
- アプリケーション層を経由しない
- Nodeと一致する型の値を取得して返す
- Inputは使用しない

```ts
/**
 * ユーザーを取得する
 */
export const user: QueryFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: PothosUserNode,
    args: {
      id: t.arg({ type: "ID", required: true }),
    },
    async resolve(_, args, c) {
      const user = await c.var.database.prismaUser.findUnique({
        where: { id: args.id },
      })

      if (user === null) {
        throw new NotFoundGraphQLError()
      }

      return user
    },
  })
}
```

## api/interface/inputs/*-input.ts

- Mutationの引数を定義する
- idは含まないようにする

```ts
import { builder } from "~/interface/builder"

export const PothosCreateUserInput = builder.inputType("CreateUserInput", {
  description: undefined,
  fields(t) {
    return {
      email: t.string({ required: true }),
      password: t.string({ required: true }),
    }
  },
})
```

## api/interface/objects/*-node.ts

- 必要なフィールドをobjectFieldで定義する
- createdAtのような日時はIntに変換する

```ts
export const PothosUserNode = builder.objectRef<PrismaUser>("UserNode")

builder.objectType(PothosUserNode, {
  description: undefined,
})

builder.objectField(PothosUserNode, "id", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.id
    },
  })
})
```

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

      const result = await this.deps.repository.write(organization)

      if (result instanceof Error) {
        return new InternalGraphQLError()
      }

      return organization
    } catch (error) {
      return new InternalGraphQLError()
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

      const result = await this.deps.repository.write(draft)

      if (result instanceof Error) {
        return new InternalGraphQLError()
      }
      
      return organization
    } catch (error) {
      return new InternalGraphQLError()
    }
  }
}
```

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

## api/domain/entities/*.entity.ts

- クラス名はEntityで終わる
- valibotを使用する
- イミュータブル
- 必要に応じて値オブジェクトを定義する
- 必要に応じてプロパティに説明を追加する

```ts
import { NameValue } from "~/domain/values/name.value"

const vProps = object({
  id: string(),
  name: instance(NameValue),
})

type Props = InferInput<typeof vProps>

export class UserEntity implements Props {
  readonly id: Props["id"]

  /**
   * 名前
   */
  readonly name: Props["name"]

  constructor(private readonly props: Props) {
    this.id = props.id
    this.name = props.name
  }

  updateName(name: NameValue) {
    return new UserEntity({ ...this.props, name })
  }
}
```

# 開発

## マークダウン

- アスタリスクを使用しない
- 見出しに数字を使用しない
- 見出しの前後には空行をいれる

## ファイル

- 小文字でハイフンで繋ぐ
- 1つのファイルに関数またはクラスまたは型を1つのみ定義する
- 1つのファイルで複数のexportを使用しない

## テスト

- 副作用のあるファイルではテストは作成しない
- `bun:test`の`test`と`expect`のみを使用する
- testのタイトルは日本語を使用する
- ファイル名は「.test」

以下のディレクトリではテストを作成する

- `**/domain/*.entity.ts`
- `**/domain/*.value.ts`
- `**/lib/*.ts`

# コード規約

- 説明的な命名規則の採用
- as型アサーションの使用禁止
- interfaceの代わりにtypeを使用
- for文ではfor-ofを使用してforEachを使用しない
- 関数の引数では分割代入を使用し
- if-elseを使用しない
- if文をネストせずに早期リターン
- 変数名を省略しない
- 引数が複数ある場合は変数名「props」のObjectにして型「Props」を定義
- 可能な限りconstを使用、letやvarを避ける

## 関数

- 純粋関数を優先
- 不変データ構造を使用
- 副作用を分離
- 型安全性を確保

## クラス

- Staticのみのクラスを定義しない
- クラスの継承を使用しない
- イミュータブル

## コメント

- 関数から予測が難しい場合のみコメントを残す
- paramやreturnなどのアノテーションを使用しない

## TypeScript

- 関数の引数では変数propsを使用する
- any型を避ける

## React

- TailwindCSSを使用する
- shadcn/uiを使用する
- コンポーネントは export function ComponentName () {} の形式で記述する
