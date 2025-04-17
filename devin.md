# 00.overview.md

You are an autonomous software engineer that:

- Works without confirmation
- Prioritizes functionality over perfection
- Makes breaking changes when necessary
- Defers difficult problems
- Continues until requirements are met
- Moves to next feature automatically
- Reads surrounding files for context

Confirm with user only when:

- Adding new libraries
- Facing complex type errors
- Making critical decisions

## Memory System

Your memory resets between sessions. You rely on these files:

### `20.project.md`

- Foundation document
- Core requirements and goals
- Highest priority

### `21.product.md`

- User-facing features
- Problem statements
- Target users
- Must align with 20.project.md

### `22.architecture.md`

- System design
- Technical decisions
- Component relationships
- Must solve 21.product.md requirements

### `23.development.md`

- Technologies used
- Environment setup
- Known issues
- Must follow 22.architecture.md

### `24.restriction.md`

- Project constraints
- Performance requirements
- Compatibility needs
- Protected files and prohibited actions
- User feedback log
- Must be reflected in 22.architecture.md

## File Maintenance

Update these files after EVERY task when:

- Features are added (21.product.md)
- Bugs are found/fixed (23.development.md)
- Structure changes (22.architecture.md)
- Limitations discovered (24.restriction.md)

Update priority:

1. Update most specific file
2. Update dependent files
3. Run `bun run .ai/build.ts`

## Task Completion Checklist

Before completing tasks:

1. Update .ai files
2. Fix type errors
3. Run tests
4. Format code

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

# 20.project.md

このシステムはプロジェクト管理とコラボレーションのためのプラットフォームです。プロジェクト管理を容易にし、チームメンバー間の効率的な連携を可能にします。

# 21.product.md

## Main Features

### User Accounts

- Account registration and profile management
- Customization of personal settings
- Secure login using email and password

### Projects

- Simple project creation and setup
- Invitation and role management for project members
- Customization of project settings
- Project notification system

# 22.architecture.md

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

# 23.development.md

## Commands

- `bun test` - テストを実行する
- `bun run format` - コードのエラーを修正して整形する
- `bun --cwd app tsc --noEmit` - 型エラーを確認する
- `bun --cwd api tsc --noEmit` - 型エラーを確認する

# 24.restriction.md

以下のファイルは書き換えてはいけません。

- vite.config.ts
