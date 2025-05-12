# プロジェクト設定

プロジェクトの設定を管理するためのエンティティです。プロジェクトごとのカスタマイズ可能な設定を保存します。

## 属性

### id
設定を一意に識別するID。UUIDフォーマット。

### projectId
設定が属するプロジェクトのID。ProjectEntityへの参照。

### key
設定の識別子。設定の種類を表す文字列。

### value
設定の値。JSON文字列として保存され、様々な型のデータを格納できる。

### createdAt
設定が作成された日時。

### updatedAt
設定が最後に更新された日時。

## ビジネスルール

- 同一プロジェクトの同一keyの設定は一つのみ存在可能（projectIdとkeyの組み合わせは一意）
- keyは予め定義された値のみ使用可能
- valueは設定の種類に応じた適切な形式であること
- 設定の更新時には更新日時も更新される
- プロジェクト設定の変更はプロジェクト管理者以上の権限を持つメンバーのみ可能

## 主要な設定キー

- `visibility`: プロジェクトの可視性設定（例: "public", "private", "team"）
- `default_role`: 新規メンバーのデフォルトロール（例: "MEMBER"）
- `custom_fields`: プロジェクト固有のカスタムフィールド定義

## 使用例

プロジェクトの可視性設定を取得する：

```typescript
const visibilitySetting = await projectSettingRepository.findByProjectIdAndKey(projectId, "visibility");
const visibility = visibilitySetting ? visibilitySetting.value : "private"; // デフォルト値
```

プロジェクトのデフォルトロールを更新する：

```typescript
const roleSetting = new ProjectSettingEntity({
  id: existingSettingId || crypto.randomUUID(),
  projectId: projectId,
  key: "default_role",
  value: "MEMBER",
  createdAt: existingSetting ? existingSetting.createdAt : new Date(),
  updatedAt: new Date()
});
await projectSettingRepository.write(roleSetting);
```
