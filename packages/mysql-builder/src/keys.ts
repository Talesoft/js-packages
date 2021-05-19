export enum KeyType {
    PRIMARY,
    UNIQUE,
    FOREIGN,
}

export interface PrimaryKey {
    readonly type: KeyType.PRIMARY
    readonly columnNames: string[]
}

export interface UniqueKey {
    readonly type: KeyType.UNIQUE
    readonly columnNames: string[]
}

export interface ForeignKey {
    readonly type: KeyType.FOREIGN
    readonly columnNames: string[]
    readonly referencedTableName: string
    readonly referencedColumnNames: string[]
}

export type Key = PrimaryKey | UniqueKey | ForeignKey

export function primaryKey(columnNames: string[]) {
    return { type: KeyType.PRIMARY, columnNames } as PrimaryKey
}

export function uniqueKey(columnNames: string[]) {
    return { type: KeyType.UNIQUE, columnNames } as UniqueKey
}

export function foreignKey(
    columnNames: string[],
    referencedTableName: string,
    referencedColumnNames: string[],
) {
    return {
        type: KeyType.FOREIGN,
        columnNames,
        referencedTableName,
        referencedColumnNames,
    } as ForeignKey
}
