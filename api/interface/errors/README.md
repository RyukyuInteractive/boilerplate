# GraphQL Error

GraphQLのレスポンスで使用できるエラーを定義してます。

例えば、このようにエラーを返却できます。

```ts
if (user === null) {
  throw new InternalError()
}
```

## 参考

エラーコードはこのクラスを参考にしている。

https://github.com/grpc/grpc/blob/master/doc/statuscodes.md

コードはこちら。

https://github.com/firebase/firebase-functions/blob/master/src/common/providers/https.ts

```ts
export type FunctionsErrorCode =
  | "ok"
  | "cancelled"
  | "unknown"
  | "invalid-argument"
  | "deadline-exceeded"
  | "not-found"
  | "already-exists"
  | "permission-denied"
  | "resource-exhausted"
  | "failed-precondition"
  | "aborted"
  | "out-of-range"
  | "unimplemented"
  | "internal"
  | "unavailable"
  | "data-loss"
  | "unauthenticated";

export type CanonicalErrorCodeName =
  | "OK"
  | "CANCELLED"
  | "UNKNOWN"
  | "INVALID_ARGUMENT"
  | "DEADLINE_EXCEEDED"
  | "NOT_FOUND"
  | "ALREADY_EXISTS"
  | "PERMISSION_DENIED"
  | "UNAUTHENTICATED"
  | "RESOURCE_EXHAUSTED"
  | "FAILED_PRECONDITION"
  | "ABORTED"
  | "OUT_OF_RANGE"
  | "UNIMPLEMENTED"
  | "INTERNAL"
  | "UNAVAILABLE"
  | "DATA_LOSS";
```
