import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useToast } from "../../hooks/use-toast"
import { graphql } from "../../gql"
import { useMutation, useQuery } from "../../hooks/graphql"
import { Input } from "../ui/input"
import { useState } from "react"

interface GetTablesData {
  tables: TableType[];
}

interface GetTablesVars {
  projectId: string;
}

interface CreateTableData {
  createTable: TableType;
}

interface CreateTableVars {
  name: string;
  projectId: string;
}

const GET_TABLES = graphql(`
  query GetTables($projectId: String!) {
    tables(projectId: $projectId) {
      id
      name
      projectId
    }
  }
`)

const CREATE_TABLE = graphql(`
  mutation CreateTable($name: String!, $projectId: String!) {
    createTable(name: $name, projectId: $projectId) {
      id
      name
      projectId
    }
  }
`)

export type TableListProps = {
  projectId: string
}

interface TableType {
  id: string
  name: string
  projectId: string
}

export const TableList = ({ projectId }: TableListProps) => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [newTableName, setNewTableName] = useState("")

  const { data, loading, error, refetch } = useQuery<GetTablesData, GetTablesVars>(GET_TABLES, {
    variables: { projectId },
  })

  const [createTable] = useMutation<CreateTableData, CreateTableVars>(CREATE_TABLE, {
    onCompleted: () => {
      setNewTableName("")
      refetch()
      toast({
        title: "テーブルが作成されました",
        description: "新しいテーブルが正常に作成されました。",
      })
    },
    onError: (error: Error) => {
      toast({
        title: "テーブル作成エラー",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const handleCreateTable = () => {
    if (!newTableName) {
      toast({
        title: "テーブル名が必要です",
        description: "新しいテーブルの名前を入力してください。",
        variant: "destructive",
      })
      return
    }

    createTable({
      variables: {
        name: newTableName,
        projectId,
      },
    })
  }

  if (loading) return <div>読み込み中...</div>
  if (error) return <div>エラー: {error?.message || "不明なエラー"}</div>

  const tables = data?.tables || []

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">テーブル一覧</h1>
        <Button onClick={() => navigate(`/projects/${projectId}`)}>
          プロジェクトに戻る
        </Button>
      </div>

      <div className="flex gap-2">
        <Input
          value={newTableName}
          onChange={(e) => setNewTableName(e.target.value)}
          placeholder="新しいテーブル名"
        />
        <Button onClick={handleCreateTable}>テーブルを作成</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((table: TableType) => (
          <Card key={table.id} className="cursor-pointer hover:bg-gray-50" onClick={() => navigate(`/projects/${projectId}/tables/${table.id}`)}>
            <CardHeader className="pb-2">
              <CardTitle>{table.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">ID: {table.id}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {tables.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">テーブルがありません。新しいテーブルを作成してください。</p>
        </div>
      )}
    </div>
  )
}
