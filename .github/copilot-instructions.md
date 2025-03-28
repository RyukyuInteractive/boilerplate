# 応答

- chain of draft - 問題解決に必要な最低限の短いメモを応答しなさい

## マークダウン

- アスタリスクを使用しない
- 見出しに数字を使用しない
- 見出しの前後には空行をいれる

## ファイル

- 小文字でハイフンで繋ぐ
- 1つのファイルに関数またはクラスまたは型を1つのみ定義する
- 1つのファイルで複数のexportを使用しない

# 概要

このリポジトリはモノレポです。

# 機能

## ログイン

メールアドレスとパスワードでログインする。

# Core Workflows

顧客の発言が「製品の仕様に関する質問」や「製品の全体に関わる開発の依頼」である場合は、以下の流れに従います。

顧客の要望をヒアリングし、相談に応じて、必要に応じて開発を行います。この開発を進める場合は必要かどうか顧客に確認しなさい。

## 1. 要望のヒアリング

- 顧客の最初の要望を丁寧に聞き、理解します
- 曖昧な点や不明確な点があれば、具体的な質問をします

## 2. 要望の整理と確認

- 顧客の要望を整理し、以下の点を明確にします
  - 追加したい機能やページの概要
  - 期待する動作や挙動
  - 優先度や期限
- 整理した内容を顧客に確認し、合意を得ます

## 3. 技術的な検討

- 既存の機能やページ構成を踏まえ、実装方法を検討します
- 以下の点を考慮します
  - 既存のAPIとの連携方法
  - 新規APIの必要性
  - 既存のページ構成との整合性
  - コンポーネントの再利用性

## 4. 実装計画の提案

- 検討結果をもとに、実装計画を提案します
- 以下の内容を含めます
  - 追加するAPIの仕様（必要な場合）
  - 追加するページの構成とUI
  - 既存コードへの変更点
  - 想定される課題や懸念点

## 5. 合意形成と実装

- 提案した実装計画について顧客の同意を得ます
- 合意が得られたら、実装を進めます
  - APIの追加（必要な場合）
  - ページの追加
  - コンポーネントの実装
  - テストの提案

# Memory

以下のファイルを読んで機能やページに関する相談に応答しなさい。必要に応じてファイルを書き換え記録をしなさい。

- `.ai/features.csv`: 機能の一覧
- `.ai/pages.csv`: ページに関する更新
- `.ai/words.csv`: 製品における用語集

情報の不足や間違いがあるなど必要に応じて以下のファイルも書き換えなさい。

- `.ai/10.overview.md`: 製品の概要
- `.ai/11.directories.md`: ディレクトリ
- `.ai/12.libraries.md`: ライブラリ
- `.ai/13.commands.md`: 使用可能なコマンド
- `.ai/14.methods.md`: 開発のパターン

また、これらを更新した場合は以下のコマンドを実行しなさい。

```
bun run build
```

## `.ai/pages.csv`

以下の形式のCSVであること。

```
path,name,description,deprecated_reason
パス,名前,簡単な説明,廃止の場合は理由（or 空文字）
```

ページを追加した場合は「app/interface/routes」に空のページを追加してください。

```tsx
export const Route = createFileRoute("")({
  component: RouteComponent,
})

function RouteComponent() {
}
```

## `.ai/features.csv`

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

ただし「$」は全てのページを意味しており[pages.csv]には存在しない。

## `.ai/words.csv`

固有名詞など製品の独自の単語である場合のみ追加してください。以下の形式のCSVであること。

```
name,description
名前,説明
```

# 開発ルール

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

# テスト

- 副作用のあるファイルではテストは作成しない
- `bun:test`の`test`と`expect`のみを使用する
- testのタイトルは日本語を使用する
- ファイル名は「.test」

以下のディレクトリではテストを作成する

- `**/domain/*.entity.ts`
- `**/domain/*.value.ts`
- `**/lib/*.ts`

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
- `hono` - Hono

# コマンド

- `bun test` - テストを実行する
- `bun run format` - コードを整形する
- `bun run build` - 仕様書を更新する

# 実装のパターン

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

# コミットメッセージ

以下の形式で書いてください。

```
update: 日本語
```

その他に以下も選択できます。

- update
- fix
- refactor

# プルリクエスト

# レビュー

# テスト

- 副作用のあるファイルではテストは作成しない
- `bun:test`の`test`と`expect`のみを使用する
- testのタイトルは日本語を使用する
- ファイル名は「.test」

以下のディレクトリではテストを作成する

- `**/domain/*.entity.ts`
- `**/domain/*.value.ts`
- `**/lib/*.ts`

# ファイル読み込み

コードを生成する場合は以下のルールに従います。
対象が、以下のうちの「description」または「globs」のどちらかに一致する場合はそのファイルの指示を読んで従います。

- `.ai/rules/prisma.schema.mdc`
  - description: Prismaのスキーマを生成する
  - globs: ``

- `.ai/rules/api.infrastructure.repositories.$.repository.mdc`
  - description: 
  - globs: `api/infrastructure/repositories/*.repository.ts`

- `.ai/rules/api.interface.$-input.mdc`
  - description: 
  - globs: `api/interface/inputs/*-input.ts`

- `.ai/rules/api.domain.values.$.value.mdc`
  - description: 
  - globs: `api/domain/values/*.value.ts`

- `.ai/rules/api.interface.objects.$-node.mdc`
  - description: 
  - globs: `api/interface/objects/*-node.ts`

- `.ai/rules/api.domain.entities.$.entity.mdc`
  - description: 
  - globs: `api/domain/entities/*.entity.ts`

- `.ai/rules/api.interface.query-fields.$.mdc`
  - description: 
  - globs: `api/interface/query-fields/*.ts`

- `.ai/rules/app.interface.routes.$project.index.mdc`
  - description: 
  - globs: `app/interface/routes/$project.index.tsx`

- `.ai/rules/api.interface.mutation-fields.$.mdc`
  - description: 
  - globs: `api/interface/mutation-fields/*.ts`

- `.ai/rules/api.application.$.$.mdc`
  - description: 
  - globs: `api/application/**/*.ts`
