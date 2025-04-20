# ユーザー設定

ユーザー設定はユーザーに関連する構成可能なパラメータを表すエンティティです。ユーザー体験やシステムの動作をカスタマイズするために使用されます。

## 種類

エンティティ

## 属性

**id**
- 型: string
- 説明: ユーザー設定を一意に識別するID
- 制約: UUID形式

**userId**
- 型: string
- 説明: 設定が関連するユーザーの識別子
- 制約: 有効なユーザーIDである必要がある

**key**
- 型: string
- 説明: 設定項目の名前
- 制約: ユーザーIDとの組み合わせで一意

**value**
- 型: string
- 説明: 設定項目の値
- 制約: JSONとして有効な文字列

**createdAt**
- 型: Date
- 説明: 設定が作成された日時

**updatedAt**
- 型: Date
- 説明: 設定が最後に更新された日時

## ビジネスルール

- 同一ユーザー内で同一キーの設定が複数存在することはない（userIdとkeyの組み合わせは一意）
- キーは英数字、ハイフン、アンダースコアのみを含む文字列
- 値はJSON形式で保存可能な文字列でなければならない

## 操作

- 設定値の更新: 設定値を更新し、更新日時を現在時刻に更新

## 関連

- ユーザー設定は1人のユーザーに所属する（多対1）

## 設定例

- notification_method: 通知の受信方法（"email", "in_app", "both"など）
- language: 表示言語（"ja", "en", "fr"など）
- theme: テーマ設定（"light", "dark", "system"など）
- timezone: タイムゾーン（"Asia/Tokyo", "America/New_York"など）
- display_name_format: 表示名の形式（"full", "first_only", "last_first"など）
- email_digest: メールダイジェストの頻度（"daily", "weekly", "never"など）
