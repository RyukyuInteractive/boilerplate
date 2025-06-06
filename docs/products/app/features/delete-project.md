# プロジェクト削除機能

## 概要

プロジェクト削除機能は、不要になったプロジェクトを安全に削除するための機能です。プロジェクトオーナーのみが実行でき、データは論理削除されます。

## 機能要件

### プロジェクト削除

プロジェクトを安全に削除するための機能を提供します。

1. プロジェクト削除の確認プロセス
2. 論理削除の実行（deletedAtフィールドの更新）
3. 削除後のリダイレクト
4. 削除完了の通知表示

## 技術要件

1. GraphQL APIを通じたプロジェクト削除処理
2. 論理削除の実装（deletedAtフィールドの使用）
3. 権限チェックの適切な実装
4. 削除後の状態更新と画面遷移

## ビジネスルール

1. プロジェクトの削除はオーナー(OWNER)のみ可能
2. プロジェクト削除時は論理削除を行い、データは一定期間保持
3. 削除時は更新日時(updatedAt)も自動更新される

## UX要件

1. 重要な操作（削除）の確認ダイアログ
2. 削除操作の影響範囲の明示
3. 削除完了後の適切なフィードバック
4. 誤操作防止のための二段階確認プロセス
