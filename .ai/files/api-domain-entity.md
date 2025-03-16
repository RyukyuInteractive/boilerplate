## api/domain/entities/*.entity.ts

- クラス名はEntityで終わる
- valibotを使用する
- イミュータブル
- 必要に応じて値オブジェクトを定義する
- 必要に応じてプロパティに説明を追加する

```ts
import { NameValue } from "~/domain/values/name.value"

const vProps = object({
  id: string(),
  name: instance(NameValue),
})

type Props = InferInput<typeof vProps>

export class UserEntity implements Props {
  readonly id: Props["id"]

  /**
   * 名前
   */
  readonly name: Props["name"]

  constructor(private readonly props: Props) {
    this.id = props.id
    this.name = props.name
  }

  updateName(name: NameValue) {
    return new UserEntity({ ...this.props, name })
  }
}
```
