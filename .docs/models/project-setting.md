# プロジェクト設定

プロジェクト設定はプロジェクトに関連する構成可能なパラメータを表すエンティティです。プロジェクトの動作や表示方法をカスタマイズするために使用されます。

## 属性

### id

プロジェクト設定を一意に識別するIDです。UUID形式の制約があります。

### projectId

設定が関連するプロジェクトの識別子です。有効なプロジェクトIDである必要があります。

### key

設定項目の名前です。プロジェクトIDとの組み合わせで一意である必要があります。

### value

設定項目の値です。JSONとして有効な文字列である必要があります。

### createdAt

設定が作成された日時を表します。

### updatedAt

設定が最後に更新された日時を表します。

## ビジネスルール

- 同一プロジェクト内で同一キーの設定が複数存在することはない（projectIdとkeyの組み合わせは一意）
- キーは英数字、ハイフン、アンダースコアのみを含む文字列
- 値はJSON形式で保存可能な文字列でなければならない

## 設定例

- default_view: プロジェクトのデフォルト表示形式（"list", "kanban", "gantt"など）
- privacy_level: プロジェクトの公開レベル（"public", "private", "restricted"など）
- notification_frequency: 通知の頻度（"immediate", "daily", "weekly"など）
- allowed_domains: メンバー招待を許可するドメイン（["example.com", "example.org"]など）
- theme: プロジェクトのテーマ設定（{"primary": "#007bff", "secondary": "#6c757d"}など）
