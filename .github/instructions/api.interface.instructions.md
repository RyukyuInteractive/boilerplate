---
applyTo: "**/api/**/*.ts"
---

# APIにMutationを追加する

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

データを取得する機能を追加する場合、以下のファイルを読み書きしてください。

- `api/interface/query-fields/*.ts` - GraphQLのQuery
- `api/interface/objects/*-node.ts` - GraphQLのNode
- `api/interface/schema.ts` - GraphQLのスキーマ
