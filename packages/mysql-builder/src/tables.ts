import { Column, ColumnBuilder } from './columns'
import { Key } from './keys'

export interface Table {
    readonly name: string
    readonly columns: Column[]
    readonly keys: Key[]
}

export class TableBuilder {
    constructor(readonly table: Table) {}

    column(name: string, build: (builder: ColumnBuilder) => ColumnBuilder) {
        const existingCol = this.table.columns.find(f => f.name === name)
        const builder = new ColumnBuilder(existingCol ?? { name, type: 'INT(11)', nullable: false })
        const newCol = build(builder).column
        if (existingCol === newCol) {
            return this
        }
        return new TableBuilder({
            ...this.table,
            columns: this.table.columns.map(field => (field === existingCol ? newCol : field)),
        })
    }
}
