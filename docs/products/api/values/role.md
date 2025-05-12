# ロール

プロジェクト内でのユーザーの役割と権限を表現するための値オブジェクトです。

## 定義

プロジェクトメンバーの権限レベルを表す文字列値を格納する不変オブジェクトです。

## 属性

### value
ロールを表す文字列値。以下の値のいずれかを取ります：
- `OWNER`: プロジェクトの全権限を持つオーナー
- `ADMIN`: 管理権限を持つ管理者
- `MEMBER`: 基本的な操作権限を持つメンバー
- `VIEWER`: 閲覧のみ可能な閲覧者

## ビジネスルール

- 値は定義された4つのロールのいずれかでなければならない
- 各ロールは階層構造を持ち、上位ロールは下位ロールの全ての権限を含む
- ロールの変更は同等以上の権限を持つメンバーによってのみ可能

## 権限マトリックス

各ロールが持つ権限は以下の通りです：

| 操作 | VIEWER | MEMBER | ADMIN | OWNER |
|------|--------|--------|-------|-------|
| プロジェクト閲覧 | ✓ | ✓ | ✓ | ✓ |
| プロジェクト編集 | - | - | ✓ | ✓ |
| プロジェクト削除 | - | - | - | ✓ |
| メンバー閲覧 | ✓ | ✓ | ✓ | ✓ |
| メンバー追加 | - | - | ✓ | ✓ |
| メンバー削除 | - | - | ✓ | ✓ |
| メンバーロール変更 | - | - | ✓* | ✓ |
| 設定変更 | - | - | ✓ | ✓ |

*ADMIN はOWNERのロール変更はできません

## 使用例

プロジェクトメンバーのロールを確認する：

```typescript
const projectMember = await projectMemberRepository.findByProjectIdAndUserId(projectId, userId);
if (projectMember && projectMember.role === "ADMIN") {
  // 管理者権限を持つ処理
}
```

ユーザーが特定の操作を実行できるか確認する：

```typescript
function canEditProject(role: string): boolean {
  return ["ADMIN", "OWNER"].includes(role);
}
```
