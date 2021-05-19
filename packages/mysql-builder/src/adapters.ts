import { Column } from './columns'
import { Schema } from './schemas'
import { Table } from './tables'

export interface Adapter {
    open(): Promise<void>
    close(): Promise<void>

    getSchemas(): Promise<Schema[]>
    getSchemaByName(name: string): Promise<Schema>
    createSchema(name: string): Promise<void>
    updateSchema(name: string): Promise<void>
    deleteSchema(name: string): Promise<void>

    getTables(schemaName: string): Promise<Table[]>
    getTableByName(schemaName: string, name: string): Promise<Table>
    createTable(schemaName: string, table: Table): Promise<void>
    updateTable(schemaName: string, table: Table): Promise<void>
    deleteTable(schemaName: string, table: Table): Promise<void>

    getColumn(schemaName: string, tableName: string): Promise<Table[]>
    getColumnByName(schemaName: string, tableName: string, name: string): Promise<Table>
    createColumn(schemaName: string, tableName: string, column: Column): Promise<void>
    updateColumn(schemaName: string, tableName: string, column: Column): Promise<void>
    deleteColumn(schemaName: string, tableName: string, column: Column): Promise<void>
}
