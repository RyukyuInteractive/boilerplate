# ホームページ

## 概要

ホームページは、ログイン後のユーザーのメインダッシュボードとなるページです。ユーザーのプロジェクト一覧、最近のアクティビティ、通知などの概要情報を表示し、システム内の主要な機能へのアクセスを提供します。

## ページ構成

### 主要要素

1. ヘッダー
   - サービスロゴ
   - グローバルナビゲーション
   - ユーザーアカウントドロップダウン
   - 通知ベルアイコン
   - ダークモード切替ボタン

2. サイドナビゲーション
   - マイプロジェクト
   - マイプロフィール
   - アカウント設定
   - その他のメニュー項目

3. ダッシュボードエリア
   - ウェルカムメッセージ
   - 最近のプロジェクト一覧（カード表示）
   - 新規プロジェクト作成ボタン
   - 最近のアクティビティフィード

4. 通知エリア
   - 未読通知の概要表示
   - 通知設定へのリンク

5. フッター
   - 著作権表示
   - ヘルプリンク
   - 利用規約・プライバシーポリシーリンク

### 状態

1. 初期ロード状態
   - スケルトンローディング表示

2. データ表示状態
   - 全データのロード完了時

3. エラー状態
   - データロード失敗時のエラー表示

4. 空状態
   - プロジェクトがない場合の案内表示
   - アクティビティがない場合のメッセージ

## インタラクション

1. プロジェクト関連
   - プロジェクトカードのホバーエフェクト
   - プロジェクト詳細へのクリック遷移
   - プロジェクト作成モーダルの起動

2. ナビゲーション操作
   - メニュー項目のハイライト
   - 選択中ページの視覚的表示
   - モバイルメニューの開閉

3. 通知操作
   - 通知パネルの開閉
   - 通知の既読化
   - 通知からの関連ページへの遷移

## レスポンシブ対応

1. デスクトップ表示
   - サイドナビゲーションの固定表示
   - マルチカラムダッシュボードレイアウト
   - 広い画面を活用した情報表示

2. タブレット表示
   - コンパクト化されたサイドナビゲーション
   - 2カラムダッシュボードレイアウト

3. モバイル表示
   - ハンバーガーメニューによるナビゲーション
   - シングルカラムレイアウト
   - タップに最適化されたカード設計

## パーソナライズ

1. ユーザー名表示によるパーソナライズ
2. ユーザーの利用状況に基づくコンテンツ優先表示
3. ユーザー設定に基づくテーマカスタマイズ
4. 最近アクセスしたプロジェクトのハイライト

## アクセシビリティ

1. キーボードナビゲーション対応
2. スクリーンリーダー対応
3. 十分なコントラスト比の確保
4. フォーカス状態の明確な視覚表示
5. 適切なARIAラベリング

## パフォーマンス最適化

1. プロジェクトリストの遅延ローディング
2. 画像の最適化とプリロード
3. 重要コンテンツの優先表示
4. データキャッシュによる高速表示
