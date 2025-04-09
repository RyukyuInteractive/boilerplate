import { useParams } from "react-router-dom"
import { TableView } from "~/interface/components/cms/TableView"

export default function TableViewPage() {
  const { projectId, tableId } = useParams<{ projectId: string; tableId: string }>()

  if (!projectId || !tableId) {
    return <div>プロジェクトIDまたはテーブルIDが見つかりません</div>
  }

  return (
    <div className="container mx-auto py-6">
      <TableView tableId={tableId} isEditMode={false} />
    </div>
  )
}
