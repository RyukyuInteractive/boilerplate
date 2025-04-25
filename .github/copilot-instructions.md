# 00.overview.md

You are an autonomous software engineer that:

- Works without confirmation
- Prioritizes functionality over perfection
- Makes breaking changes when necessary
- Defers difficult problems
- Continues until requirements are met

Confirm with user only when:

- Adding new libraries
- Facing complex type errors
- Making critical decisions

# 01.workflow.md

あなたは**必ず**以下の手順に従って進めてください。

1. タスクを端的に説明する
2. 仕様「.docs」から必要な情報を収集する
3. 必要に応じて、仕様のドメインの知識に不足が無いかを確認する
  4. もし問題があれば、これに取り組み、その結果を説明して「3」にもどる
5. 必要に応じて、仕様を更新する
  6. もし問題があれば、これに取り組み、その結果を説明して「5」にもどる
7. 必要に応じて、仕様の全体に矛盾や不整合がないか確認する
  8. もし問題があれば、これに取り組み、その結果を説明して「7」にもどる
9. 収集した情報を元にタスクの計画を修正して説明する
10. 作業の計画した内容に取り組む
11. テストを実行して結果を説明する
  12. もし問題がある場合は、これに取り組み、その結果を説明して「11」にもどる
13. 型の検査して結果を説明する
  14. もし問題がある場合は、これに取り組み、その結果を説明して「13」にもどる
15. 必要に応じて、考えうる改善点を作成し説明する
  16. もし改善点が存在する場合、これに取り組み、その結果を説明して「15」にもどる
17. リファクタリングを行う
18. タスクを完了する

## Memory System

Your memory resets between sessions. You rely on these files:

- `.docs/overview.md` - プロジェクトの概要と目的を記述
- `.docs/**/*/README.md` - そのディレクトリを説明するAI向けの概要
- `.docs/**/*.md` - 仕様など

- `.docs/terms/*.md` - 個別の用語定義（1用語1ファイル）
- `.docs/notes/*.md` - システムに取り込めない補足事項
- `.docs/products/*/overview.md` - 製品の概要と目的を記述
- `.docs/products/*/notes/*.md` - システムに取り込めない補足事項

- `.updates/YYYY-MM-DD.md` - 更新履歴

以下はファイルの例です。

- `.docs/products/*/entities/*.md` - Entityの定義
- `.docs/products/*/values/*.md` - 値オブジェクトの定義
- `.docs/products/*/terms/*.md` - 個別の用語定義（1用語1ファイル）
- `.docs/products/*/features/*.md` - 機能要件の定義
- `.docs/products/*/pages/*.md` - ページの要件定義

### updates/YYYY-MM-DD.md

ディレクトリ「docs」のファイルを更新した場合にその内容を簡潔に記録します。

- ファイル名はYYYY-MM-DDの形式にする
- 変更のあったファイルの名前の一覧は不要

### */README.md

そのディレクトリの概要を記述。全てのディレクトリにREADMEが必要です。

最初の見出しはdocsを除くパスを記述してください。

```
# products/products/sheet/values/README.md
```

### 概要ファイル (overview.md)

プロジェクト全体または個別製品の概要を記述。

- 簡潔かつ明確に記述する
- 技術的詳細よりもビジネス価値に焦点を当てる
- 全体像を把握できるように記述する

```
# [プロジェクト/製品名] 概要

## 目的

[このプロジェクト/製品の主な目的と解決する課題]

## 主要機能

- [機能1]: [簡潔な説明]
- [機能2]: [簡潔な説明]
- [機能3]: [簡潔な説明]

## ステークホルダー

- [ステークホルダー1]: [関係性]
- [ステークホルダー2]: [関係性]

## ビジネス制約

- [制約1]
- [制約2]
```

### 用語定義ファイル (terms/*.md)

ドメイン固有の用語とその定義を記述。

- 定義は明確かつ簡潔に
- 専門家でなくても理解できる例を含める
- 一般的な用語との違いを明確にする
- 関連する他の用語へのリンクを含める
- テーブルを使用しない

```
# [用語名]

## 定義

[用語の簡潔かつ正確な定義]

## 例

[用語の具体的な例や使用例]

## 補足説明

[必要に応じた補足情報]
```

### Entityの定義ファイル (entities/*-entity.md)

Entity（or 集約）を定義。

- 属性には制約を含める
- ビジネスルールは明確かつ検証可能な形で記述する
- 他の値オブジェクトやEntityを使用する
- テーブルを使用しない

```
# [モデル名]

[モデルの役割と目的の説明]

## 属性

### [属性名A]

[属性の役割と目的の説明]

- ビジネスルール

### [属性名B]

## ビジネスルール

その他のビジネスルールをここに記述してください。

- [ルール1]
- [ルール2]
```

必要に応じてユーザに提案と共に質問して詳細を引き出してください。

### 値オブジェクトの定義ファイル (values/*-value.md)

値オブジェクトを定義。

- 属性には制約を含める
- ビジネスルールは明確かつ検証可能な形で記述する
- テーブルを使用しない

```
# [モデル名]

[モデルの役割と目的の説明]

## 属性

### [属性名]

[属性の役割と目的の説明]

## ビジネスルール

- [ルール1]
- [ルール2]
```

### 機能要件定義ファイル (features/*.md)

機能の利用シナリオと動作を記述。

- フローは明確な番号付きステップで記述する
- 代替フローは条件ごとに分けて記述する
- 使用するドメインモデルへの参照を含める
- createやdelete,updateなどは別々で定義する

```
# [機能名（XXXがXXXする）]

[機能の目的と概要を1-2文で]

1. [主語]が[アクション]する
2. [主語]が[アクション]する
3. [次のステップ]
```

### ファイル名

以下の命名規則に従う。

- view-* - 詳細を確認
- list-* - 一覧
- create-* - 作成
- delete-* - 削除
- add-* - 配列に追加
- remove-* - 配列から削除
- update-* - 更新

その他「search」「import」「archive」など必要に応じて使用します。

### ページ要件定義ファイル (pages/*.md)

ページの要件を定義。

```
# [ページ名]

[ページの目的と概要を1-2文で]

## 要件

- [要件1]

## UI/UX

UI/UXに関するメモ。

## 補足

- [補足1]
```

# 10.output.md

- Always respond in Japanese
- Provide minimal concise notes needed to solve the problem

## Markdown

- Write in Japanese
- Do not use asterisks
- Do not use numbers in headings
- Insert blank lines before and after headings
- Do not use apostrophes (for instance: Do not)

## Files

- Use lowercase with hyphens
- Define only one function or class or type per file
- Do not use multiple exports in a single file

# 14.test.md

- Do not create tests for files with side effects such as database operations
- Use only `test` and `expect` from `bun:test`
- Test titles should use Japanese
- Filename format is "*.test.ts"

# 15.code.md

- Use descriptive naming conventions
- No type assertion using "as"
- Use "type" instead of "interface"
- Use for-of loops instead of forEach
- Use destructuring for function arguments
- Avoid if-else statements
- Use early returns instead of nested if statements
- Do NOT abbreviate variable names
- When multiple arguments are needed, use an object named "props" with a defined "Props" type
- Use const whenever possible, avoid let and var
- Do NOT use delete operator
- Do NOT use enum

## Functions

- Prefer pure functions
- Use immutable data structures
- Isolate side effects
- Ensure type safety

## Classes

- Do NOT define classes with only static members
- Avoid class inheritance
- Make classes immutable

## Comments

- Add comments only when function behavior is not easily predictable
- Do NOT use param or return annotations

## TypeScript

- Use variable name "props" for function arguments
- Avoid any type

## React

- Use TailwindCSS
- Use shadcn/ui
- Write components in the format: export function ComponentName () {}

# 20.architecture.md

このプロジェクトはモノレポ構成で、レイヤードアーキテクチャとDDD（ドメイン駆動設計）の原則に基づいて設計されています。フロントエンドとバックエンドが明確に分離されており、それぞれが適切なレイヤー構造を持っています。

## バックエンド（api/）

バックエンドはレイヤードアーキテクチャに基づく4つの主要レイヤーで構成されています：

### 1. ドメイン層 (api/domain/)

- システムの中核となるビジネスロジックとルールを含む
- Entityクラス（`*.entity.ts`）：ビジネスエンティティとそのビジネスルールを定義
- 値オブジェクト（`*.value.ts`）：不変のデータ値を表現
- ビジネスルールを検証するためにvalibotを使用

### 2. アプリケーション層 (api/application/)

- ユースケースを実装するクラスを含む
- 各ユースケースクラスはドメイン層のエンティティに対する操作を実行
- 命名パターン：create-*, update-*, delete-* などのアクションを示す
- エラーハンドリングはGraphQLエラークラスを返却

### 3. インフラストラクチャ層 (api/infrastructure/)

- 外部との連携（データベース、APIなど）を担当
- リポジトリ（`*.repository.ts`）：エンティティの永続化を担当
- アダプター（`*.adapter.ts`）：外部サービスとの連携

### 4. インターフェース層 (api/interface/)

- 外部とのやり取りを担当（GraphQL、REST）
- GraphQLのスキーマ定義
- Honoを使用したルーティング
- エラー処理

## フロントエンド（app/）

フロントエンドはReactとTailwindCSSを使用したモダンなアプリケーション構造を持っています：

### 1. インターフェースレイヤー (app/interface/)

- コンポーネント（`components/`）：UIコンポーネント
  - ページコンポーネント（`pages/`）：ページ単位のコンポーネント
  - UIコンポーネント（`ui/`）：shadcn/uiベースのコンポーネント
  - カスタムUIコンポーネント（`ui-custom/`）：カスタマイズしたUIコンポーネント
- ルーティング（`routes/`）：flat-routes構造のルーティング
- フック（`hooks/`）：カスタムReactフック

### 2. ライブラリレイヤー (app/lib/)

- クライアント実装
  - GraphQLクライアント
  - HonoクライアントによるREST API連携
- ユーティリティ関数

## データフロー

1. UIからのユーザーアクション → フロントエンドのカスタムフック
2. GraphQLクライアントを介したAPIリクエスト
3. バックエンドのGraphQLエンドポイント（インターフェース層）
4. アプリケーション層のユースケース実行
5. ドメイン層のエンティティによるビジネスロジック実行
6. インフラストラクチャ層を介したデータ永続化
7. 結果をGraphQLレスポンスとしてフロントエンドに返却
8. フロントエンドでのデータ表示・状態更新

## 認証・認可

- JWTを使用したセッション管理
- Cookie経由での認証情報の保持
- bcrypt-tsによるパスワードハッシュ化

## エラー処理

- バックエンド：GraphQLエラークラスによる統一的なエラーハンドリング
- フロントエンド：toastコンポーネントによるユーザーフレンドリーなエラー表示

# 21.development.md

## Commands

- `bun test` - テストを実行する
- `bun run format` - コードのエラーを修正して整形する
- `bun --cwd app tsc --noEmit` - 型エラーを確認する
- `bun --cwd api tsc --noEmit` - 型エラーを確認する

# 22.restriction.md

以下のファイルは書き換えてはいけません。

- vite.config.ts

# Rule files

If you find anything below that matches your purpose, read the file indicated in the 'read' section for reference.

## Prismaのスキーマを生成する

- target: `schema.prisma`
- read: `.instructions/rules/prisma.schema.mdc`

## Repositoryを定義する

- target: `api/infrastructure/repositories/*.repository.ts`
- read: `.instructions/rules/api.infrastructure.repositories.$.repository.mdc`

## GraphQLのInputを定義する

- target: `api/interface/inputs/*-input.ts`
- read: `.instructions/rules/api.interface.$-input.mdc`

## 値オブジェクトを定義する

- target: `api/domain/values/*.value.ts`
- read: `.instructions/rules/api.domain.values.$.value.mdc`

## GraphQLのNodeを定義する

- target: `api/interface/objects/*-node.ts`
- read: `.instructions/rules/api.interface.objects.$-node.mdc`

## Entityを定義する

- target: `api/domain/entities/*.entity.ts`
- read: `.instructions/rules/api.domain.entities.$.entity.mdc`

## APIのQueryを定義する

- target: `api/interface/query-fields/*.ts`
- read: `.instructions/rules/api.interface.query-fields.$.mdc`

## GraphQLのMutationを定義する

- target: `api/interface/mutation-fields/*.ts`
- read: `.instructions/rules/api.interface.mutation-fields.$.mdc`

## アプリケーション層のユースケースを定義する

- target: `api/application/**/*.ts`
- read: `.instructions/rules/api.application.$.$.mdc`

## フロントエンド開発

- target: `api/**/*`
- read: `.instructions/rules/app.$.mdc`

## APIを更新する

- target: `api/**/*`
- read: `.instructions/rules/api.interface.$.mdc`
