# ユーザー設定

ユーザーの個人設定を管理するためのエンティティです。ユーザーごとのカスタマイズ可能な設定を保存します。

## 属性

### id
設定を一意に識別するID。UUIDフォーマット。

### userId
設定が属するユーザーのID。UserEntityへの参照。

### key
設定の識別子。設定の種類を表す文字列。

### value
設定の値。JSON文字列として保存され、様々な型のデータを格納できる。

### createdAt
設定が作成された日時。

### updatedAt
設定が最後に更新された日時。

## ビジネスルール

- 同一ユーザーの同一keyの設定は一つのみ存在可能（userIdとkeyの組み合わせは一意）
- keyは予め定義された値のみ使用可能
- valueは設定の種類に応じた適切な形式であること
- 設定の更新時には更新日時も更新される

## 主要な設定キー

- `theme`: ユーザーインターフェースのテーマ設定（例: "light", "dark"）
- `language`: 言語設定（例: "ja", "en"）
- `timezone`: タイムゾーン設定（例: "Asia/Tokyo"）

## 使用例

ユーザーの表示言語設定を取得する：

```typescript
const languageSetting = await userSettingRepository.findByUserIdAndKey(userId, "language");
const language = languageSetting ? languageSetting.value : "ja"; // デフォルト値
```

ユーザーの言語設定を更新する：

```typescript
const languageSetting = new UserSettingEntity({
  id: existingSettingId || crypto.randomUUID(),
  userId: userId,
  key: "language",
  value: "en",
  createdAt: existingSetting ? existingSetting.createdAt : new Date(),
  updatedAt: new Date()
});
await userSettingRepository.write(languageSetting);
```
