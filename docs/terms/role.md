# ロール

## 定義

システム内でのユーザーの役割や権限を定義するもの。特にプロジェクト内でのメンバーの権限レベルを表します。

## 例

- プロジェクトオーナーは、プロジェクトの作成者であり、すべての管理権限を持っています。
- プロジェクト管理者は、メンバーの追加や削除、プロジェクト設定の変更などができます。
- 一般メンバーは、プロジェクト内のコンテンツを作成・編集できますが、管理機能は使用できません。
- 閲覧者は、プロジェクト内の情報を閲覧するだけで、変更はできません。

## 補足説明

システム内で定義されているロールは以下の通りです：

- OWNER（オーナー）
  - プロジェクトの全ての操作が可能
  - プロジェクトの削除権限を持つ
  - メンバーの追加・削除・ロール変更が可能
  - プロジェクト設定の変更が可能

- ADMIN（管理者）
  - プロジェクトの管理操作が可能
  - メンバーの追加・削除が可能
  - プロジェクト設定の変更が可能
  - プロジェクトの削除はできない

- MEMBER（メンバー）
  - プロジェクト内のコンテンツ作成・編集が可能
  - 自分が作成したコンテンツの管理が可能
  - プロジェクト設定の閲覧は可能だが変更はできない
  - メンバー管理はできない

- VIEWER（閲覧者）
  - プロジェクト内の情報を閲覧のみ可能
  - コンテンツの作成・編集はできない
  - プロジェクト設定の閲覧のみ可能

ロールは階層構造になっており、上位のロールは下位のロールの全ての権限を持ちます。
