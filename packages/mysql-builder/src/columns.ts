import { Connection } from './connection'
import { escaped, generated, raw, Value } from './values'

export interface Column {
    readonly name: string
    readonly type: string
    readonly nullable: boolean
    readonly defaultValue?: Value
    readonly before?: string
    readonly after?: string
}

export class ColumnBuilder {
    constructor(readonly column: Column) {}

    withType(type: string) {
        return new ColumnBuilder({
            ...this.column,
            type,
        })
    }

    integerId(length = 11) {
        return new ColumnBuilder({
            ...this.column,
            type: `INT(${length})`,
            defaultValue: generated('autoIncrement'),
        })
    }

    uuid(generateUuid: () => string) {
        return new ColumnBuilder({
            ...this.column,
            type: `CHAR(${length})`,
            defaultValue: generated(generateUuid),
        })
    }

    integer(length = 11) {
        return this.withType(`INT(${length})`)
    }

    unsignedInteger(length = 11) {
        return this.withType(`UNSIGNED INT(${length})`)
    }

    string(length = 100) {
        return this.withType(`VARCHAR(${length})`)
    }

    fixedString(length = 100) {
        return this.withType(`CHAR(${length})`)
    }

    default(value: string | number) {
        return new ColumnBuilder({
            ...this.column,
            defaultValue: escaped(value),
        })
    }

    rawDefault(value: string) {
        return new ColumnBuilder({ ...this.column, defaultValue: raw(value) })
    }
}

export class ColumnView {
    constructor(
        readonly connection: Connection,
        readonly tableName: string,
        readonly column: Column,
    ) {}
}
