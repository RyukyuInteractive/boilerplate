# プロジェクト

システム内の協働作業の基本単位を表現します。プロジェクト情報、設定、メンバーシップを管理します。

## 属性

### id
プロジェクトを一意に識別するID。UUIDフォーマット。

### login
プロジェクトのログイン名。一意の文字列。

### name
プロジェクトの表示名。NameValue値オブジェクトで表現。

### createdAt
プロジェクトの作成日時。

### updatedAt
プロジェクト情報の最終更新日時。

### deletedAt
プロジェクト削除日時。null値の場合、プロジェクトはアクティブ。

## ビジネスルール

- プロジェクトのログイン名は一意でなければならない
- プロジェクト名は128文字以内でなければならない
- プロジェクト情報の更新時には更新日時も更新される
- 削除されたプロジェクトは論理削除として扱われ、データベースからは物理的に削除しない
- プロジェクトは少なくとも1人のオーナーを持つ必要がある