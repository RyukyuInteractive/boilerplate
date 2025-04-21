# ユーザー設定

ユーザー設定はユーザーに関連する構成可能なパラメータを表すエンティティです。ユーザー体験やシステムの動作をカスタマイズするために使用されます。

## 属性

### id

ユーザー設定を一意に識別するIDです。UUID形式の制約があります。

### userId

設定が関連するユーザーの識別子です。有効なユーザーIDである必要があります。

### key

設定項目の名前です。ユーザーIDとの組み合わせで一意である必要があります。

### value

設定項目の値です。JSONとして有効な文字列である必要があります。

### createdAt

設定が作成された日時を表します。

### updatedAt

設定が最後に更新された日時を表します。

## ビジネスルール

- 同一ユーザー内で同一キーの設定が複数存在することはない（userIdとkeyの組み合わせは一意）
- キーは英数字、ハイフン、アンダースコアのみを含む文字列
- 値はJSON形式で保存可能な文字列でなければならない

## 設定例

- notification_method: 通知の受信方法（"email", "in_app", "both"など）
- language: 表示言語（"ja", "en", "fr"など）
- theme: テーマ設定（"light", "dark", "system"など）
- timezone: タイムゾーン（"Asia/Tokyo", "America/New_York"など）
- display_name_format: 表示名の形式（"full", "first_only", "last_first"など）
- email_digest: メールダイジェストの頻度（"daily", "weekly", "never"など）
