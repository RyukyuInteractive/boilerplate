# 仕様書のルール

以下の仕様書があります。

- workspace/overview.md - 製品の概要
- workspace/sheets/pages.csv - ページの一覧
- workspace/sheets/features.csv - 機能の一覧
- workspace/note.md - 機能の詳細な解説
- workspace/decisions.md - 重要な決定事項のメモ

## workspace/pages.csv

以下の形式のCSVであること。

```
path,name,description,deprecated_reason
パス,名前,簡単な説明,廃止の場合は理由（or 空文字）
```

## workspace/features.csv

以下の形式のCSVであること。

```
path,priority,name,description,deprecated_reason
パス,重要度,名前,簡単な説明,廃止の場合は理由（or 空文字）
```

値は以下のルールに従うこと。

- パス: pages.csvに存在するパスのみを使用する
- priority: 数字で重要度を表現する
  - 0: コアの機能
  - 1: 必要なサブ機能
  - 2: 補助的な機能
