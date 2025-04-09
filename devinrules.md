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

# 製品概要

このリポジトリはモノレポです。

# 機能

## ログイン

メールアドレスとパスワードでログインする。

# Memory

以下のファイルを読んで機能やページに関する相談に応答しなさい。必要に応じてファイルを書き換え記録をしなさい。
これ以外のファイルは作成しないでください。

- `.ai/10.product.md`: 製品の概要
- `.ai/11.directories.md`: ディレクトリ
- `.ai/12.libraries.md`: ライブラリ
- `.ai/13.commands.md`: 使用可能なコマンド
- `.ai/14.methods.md`: 開発のパターン
- `.ai/15.tips.md`: トラブルシューティングや既知のバグ

また、これらを更新した場合は以下のコマンドを実行しなさい。

```
bun run init
```

## 更新頻度

AIエージェントは以下のタイミングで`.ai`ディレクトリのファイルを更新してください：

- 新しい機能が追加された時
- バグが発見または修正された時
- トラブルシューティングの新しい情報が得られた時
- プロジェクトの構造や設計に変更があった時
- 少なくとも週に1回は`.ai/15.tips.md`を確認し、必要に応じて更新する

## `.ai/rules/*`

以下のディレクトリのファイルを読み書きする場合は、ディレクトリ「.ai/rules」の仕様書も読み書きして更新してください。

- app/interface/routes/*/tsx

例えば、このファイルを修正した場合は

```
app/interface/routes/$project.logs.tsx
```

このファイルを読み書きします。また、ファイルが存在しない場合は作成します。

```
.ai/rules/app.interface.routes.$project.logs.mdc
```

※ ディレクトリのスラッシュは全てドットで繋ぎます。

### app/interface/routes/*/tsx

技術などではなくUX/UIの観点でこのページに関する仕様のみをまとめなさい。また、このページに限らない仕様は除外します。

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

# Tips

トラブルシューティングや既知のバグなどの情報をここに記録します。開発者が遭遇した問題や解決策、回避策などを共有するためのドキュメントです。

## トラブルシューティング

- 問題が発生した場合は、まずログを確認してください
- 環境変数が正しく設定されているか確認してください
- 依存関係が最新かどうか確認してください

## 既知のバグ

現時点では既知のバグはありません。

## パフォーマンスの最適化

- 大量のデータを扱う場合は、ページネーションを使用してください
- 不要なAPIリクエストを減らすためにキャッシュを活用してください

## 知見その1
