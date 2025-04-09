import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "~/interface/components/ui/button"
import { Input } from "~/interface/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/interface/components/ui/table"
import { useToast } from "~/interface/components/ui/use-toast"
import { graphql } from "~/interface/gql"
import { useMutation, useQuery } from "~/interface/hooks/graphql"

const GET_TABLE = graphql(`
  query GetTable($id: String!) {
    table(id: $id) {
      id
      name
      projectId
      columns {
        id
        name
        type
        order
      }
      records {
        id
        cells {
          id
          value
          columnId
        }
      }
    }
  }
`)

const CREATE_COLUMN = graphql(`
  mutation CreateColumn($name: String!, $type: String!, $tableId: String!, $order: Int!) {
    createColumn(name: $name, type: $type, tableId: $tableId, order: $order) {
      id
      name
      type
      order
    }
  }
`)

const CREATE_RECORD = graphql(`
  mutation CreateRecord($tableId: String!) {
    createRecord(tableId: $tableId) {
      id
    }
  }
`)

const UPDATE_CELL = graphql(`
  mutation UpdateCell($id: String!, $value: String) {
    updateCell(id: $id, value: $value) {
      id
      value
    }
  }
`)

export type TableViewProps = {
  tableId: string
  isEditMode?: boolean
}

export const TableView = ({ tableId, isEditMode = false }: TableViewProps) => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [newColumnName, setNewColumnName] = useState("")
  const [newColumnType, setNewColumnType] = useState("text")
  const [cellValues, setCellValues] = useState<Record<string, string>>({})

  const { data, loading, error, refetch } = useQuery(GET_TABLE, {
    variables: { id: tableId },
  })

  const [createColumn] = useMutation(CREATE_COLUMN, {
    onCompleted: () => {
      setNewColumnName("")
      refetch()
      toast({
        title: "Column created",
        description: "The column has been created successfully.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error creating column",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const [createRecord] = useMutation(CREATE_RECORD, {
    onCompleted: () => {
      refetch()
      toast({
        title: "Record created",
        description: "The record has been created successfully.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error creating record",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const [updateCell] = useMutation(UPDATE_CELL, {
    onCompleted: () => {
      toast({
        title: "Cell updated",
        description: "The cell has been updated successfully.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error updating cell",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const handleAddColumn = useCallback(() => {
    if (!newColumnName) {
      toast({
        title: "Column name required",
        description: "Please enter a name for the new column.",
        variant: "destructive",
      })
      return
    }

    const order = data?.table?.columns?.length || 0

    createColumn({
      variables: {
        name: newColumnName,
        type: newColumnType,
        tableId,
        order,
      },
    })
  }, [createColumn, data?.table?.columns?.length, newColumnName, newColumnType, tableId, toast])

  const handleAddRecord = useCallback(() => {
    createRecord({
      variables: {
        tableId,
      },
    })
  }, [createRecord, tableId])

  const handleCellChange = useCallback((cellId: string, value: string) => {
    setCellValues((prev) => ({
      ...prev,
      [cellId]: value,
    }))
  }, [])

  const handleCellBlur = useCallback((cellId: string) => {
    const value = cellValues[cellId]
    if (value !== undefined) {
      updateCell({
        variables: {
          id: cellId,
          value,
        },
      })
    }
  }, [cellValues, updateCell])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data?.table) return <div>Table not found</div>

  const { table } = data
  const columns = table.columns || []
  const records = table.records || []

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{table.name}</h1>
        <div className="flex gap-2">
          <Button onClick={() => navigate(`/projects/${table.projectId}/tables`)}>
            Back to Tables
          </Button>
          {isEditMode ? (
            <Button onClick={() => navigate(`/projects/${table.projectId}/tables/${tableId}`)}>
              View Mode
            </Button>
          ) : (
            <Button onClick={() => navigate(`/projects/${table.projectId}/tables/${tableId}/edit`)}>
              Edit Mode
            </Button>
          )}
        </div>
      </div>

      {isEditMode && (
        <div className="flex gap-2 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium">Column Name</label>
            <Input
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="Enter column name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Column Type</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={newColumnType}
              onChange={(e) => setNewColumnType(e.target.value)}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="boolean">Boolean</option>
              <option value="select">Select</option>
            </select>
          </div>
          <Button onClick={handleAddColumn}>Add Column</Button>
        </div>
      )}

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id}>{column.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                {columns.map((column) => {
                  const cell = record.cells?.find((cell) => cell.columnId === column.id)
                  const cellId = cell?.id || ""
                  const cellValue = cellValues[cellId] !== undefined ? cellValues[cellId] : cell?.value || ""

                  return (
                    <TableCell key={column.id}>
                      {isEditMode ? (
                        <Input
                          value={cellValue}
                          onChange={(e) => handleCellChange(cellId, e.target.value)}
                          onBlur={() => handleCellBlur(cellId)}
                        />
                      ) : (
                        cellValue
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button onClick={handleAddRecord}>Add Record</Button>
    </div>
  )
}
