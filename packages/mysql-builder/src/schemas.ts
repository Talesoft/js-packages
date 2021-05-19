import { Table, TableBuilder } from './tables'

export interface Schema {
    name: string
    tables: Table[]
}

export class SchemaBuilder {
    constructor(readonly schema: Schema) {}

    table(name: string, build: (builder: TableBuilder) => TableBuilder) {
        const existingTable = this.schema.tables.find(c => c.name === name)
        const builder = new TableBuilder(
            existingTable ?? {
                name,
                columns: [],
                keys: [],
            },
        )
        const newTable = build(builder).table
        if (existingTable === newTable) {
            return this
        }
        return new SchemaBuilder({
            ...this.schema,
            tables: this.schema.tables.map(t => (t === existingTable ? newTable : t)),
        })
    }
}

export function schema(name: string) {
    return new SchemaBuilder({ name, tables: [] })
}
