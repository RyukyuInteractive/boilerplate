---
applyTo: "**/api/domain/values/*.value.ts"
---

# api/domain/values/*.value.ts

- クラス名はValueで終わる

```ts
import { type InferInput, maxLength, parse, pipe, string } from "valibot"

const vValue = pipe(string(), maxLength(128))

type Value = InferInput<typeof vValue>

export class NameValue {
  constructor(public readonly value: Value) {
    Object.assign(this, parse(vValue, value))
  }
}
```
