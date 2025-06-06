---
applyTo: "**/api/domain/entities/*.entity.ts"
---

# api/domain/entities/*.entity.ts

- クラス名はEntityで終わる
- イミュータブル
- 必要に応じて値オブジェクトを定義する
- 必要に応じてプロパティに説明を追加する
- valibotを使用する
  - nullの場合はnullable関数を使用する

```ts
import { NameValue } from "~/domain/values/name.value"

const vProps = object({
  id: string(),
  name: instance(NameValue),
  description: nullable(string())
  createdAt: instance(Date)
  isDeleted: boolean(),
})

type Props = InferInput<typeof vProps>

export class UserEntity implements Props {
  readonly id!: Props["id"]

  /**
   * 名前
   */
  readonly name!: Props["name"]

  readonly description!: Props["description"]

  readonly createdAt!: Props["createdAt"]

  readonly isDeleted!: Props["isDeleted"]

  constructor(private readonly props: Props) {
    Object.assign(this, parse(vProps, props))
  }

  updateName(name: NameValue) {
    return new UserEntity({ ...this.props, name })
  }

  delete() {
    return new UserEntity({ ...this.props, isDeleted: true })
  }
}
```
