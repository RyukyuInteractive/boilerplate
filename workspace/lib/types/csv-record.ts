/**
 * CSVパース結果の型を推論するための型
 *
 * 使用例:
 * - CsvRecord<["path", "name"]> // 配列を渡す場合
 * - CsvRecord<readonly ["path", "name"]> // 読み取り専用配列を渡す場合
 */
export type CsvRecord<T extends readonly string[]> = {
  [K in T[number]]: string
}

/**
 * 2つのキーを持つレコードの型
 *
 * 使用例:
 * - Record2Keys<"path", "name"> // { path: string, name: string }
 */
export type Record2Keys<K1 extends string, K2 extends string> = {
  [P in K1 | K2]: string
}

/**
 * 3つのキーを持つレコードの型
 *
 * 使用例:
 * - Record3Keys<"path", "name", "description"> // { path: string, name: string, description: string }
 */
export type Record3Keys<
  K1 extends string,
  K2 extends string,
  K3 extends string,
> = {
  [P in K1 | K2 | K3]: string
}

/**
 * 複数のキーを持つレコードの型
 *
 * 使用例:
 * - RecordWithPath<"path"> // { path: string }
 * - RecordWithPath<"path", "name"> // { path: string, name: string }
 * - RecordWithPath<"path", "name", "description"> // { path: string, name: string, description: string }
 */
export type RecordWithPath<
  K1 extends "path",
  K2 extends
    | "name"
    | "description"
    | "is_deprecated"
    | "deprecated_reason"
    | "file" = never,
  K3 extends
    | "name"
    | "description"
    | "is_deprecated"
    | "deprecated_reason"
    | "file" = never,
> = {
  [P in K1 | K2 | K3]: string
}

/**
 * 単一のキーを持つレコードの型
 */
export type KeyRecord<K extends string> = {
  [P in K]: string
}

/**
 * 複数のキーを持つCSVレコードの型
 */
export type RecordWithKeys<
  K1 extends string,
  K2 extends string = never,
  K3 extends string = never,
> = {
  [P in K1 | K2 | K3]: string
}

/**
 * 特定のキーを持つCSVレコードの型
 */
export type TypedCsvRecord<T extends Record<string, string>> = {
  [K in keyof T]: string
}

/**
 * ページの型
 */
export type PageRecord = {
  path: string
  name: string
  description: string
  [key: string]: string
}

/**
 * 特定のキーを持つCSVレコードの型（ジェネリクス版）
 */
export type TypedCsvRecord2<K extends string> = {
  [P in K]: string
} & {
  [key: string]: string
}
