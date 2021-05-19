import { ComparisonExpression, LogicalExpression } from './expressions'
import {
    computedCount,
    id,
    path,
    PathValue,
    IdentifierValue,
    Value,
    allColumns,
    escaped,
} from './values'

export type Filter = ComparisonExpression | LogicalExpression

export interface Selection {
    value: Value
    alias?: IdentifierValue
}

/**
 * This is SELECT <...> FROM
 */
export interface Selectable {
    selections?: Selection[]
}

/**
 * This is WHERE <...>
 */
export interface Filterable {
    filters?: Filter[]
}

/**
 * This is HAVING <...>
 */
export interface SelectFilterable extends Selectable {
    selectFilters?: Filter[]
}

/**
 * This is LIMIT <...>
 */
export interface Limitable {
    offset?: number
    limit?: number
}

export enum SortOrder {
    ASCENDING = 'asc',
    DESCENDING = 'desc',
}

export interface Sorting {
    value: Value
    direction?: SortOrder
}

/**
 * This is ORDER BY <...>
 */
export interface Sortable {
    sortings?: Sorting[]
}

/**
 * This is GROUP BY <...>
 */
export interface Groupable {
    groups?: Value[]
}

export enum JoinType {
    INNER = 'inner',
    LEFT_OUTER = 'leftOuter',
    RIGHT_OUTER = 'rightOuter',
    FULL_OUTER = 'fullOuter',
}

export interface Join {
    type: JoinType
    targetTable: PathValue
    on: Filter
}

/**
 * This is JOIN <...>
 */
export interface Joinable {
    joins?: Join[]
}

export interface ValuePair {
    column: IdentifierValue
    value: Value
}

/**
 * This is SET <...>
 */
export interface Settable {
    valuePairs?: ValuePair[]
}

export enum QueryType {
    SELECT,
    INSERT,
    REPLACE,
    UPDATE,
    UPSERT,
    DELETE,
}

export interface ComplexQuery extends Joinable, Filterable, Sortable, Limitable {}

export interface SelectQuery extends ComplexQuery, Selectable, SelectFilterable, Groupable {
    type: QueryType.SELECT
    targetTable: PathValue
    targetTableAlias?: IdentifierValue
}

export interface InsertQuery extends Settable {
    type: QueryType.INSERT
    targetTable: PathValue
}

export interface ReplaceQuery extends Settable {
    type: QueryType.REPLACE
    targetTable: PathValue
}

export interface UpdateQuery extends ComplexQuery, Settable {
    type: QueryType.UPDATE
    targetTable: PathValue
}

export interface UpsertQuery extends Settable {
    type: QueryType.UPSERT
    targetTable: PathValue
    updateValuePairs?: ValuePair[]
}

export interface DeleteQuery extends ComplexQuery {
    type: QueryType.DELETE
    targetTable: PathValue
    targetTableAlias?: IdentifierValue
}

export type Query =
    | SelectQuery
    | InsertQuery
    | ReplaceQuery
    | UpdateQuery
    | UpsertQuery
    | DeleteQuery

function selection(value: Value, alias?: IdentifierValue) {
    return { value, alias } as Selection
}

function valuePair(column: IdentifierValue, value: Value) {
    return { column, value } as ValuePair
}

export function splitAlias(stringValue: string) {
    return stringValue.split(' as ', 2)
}

export function parsePath(stringValue: string) {
    return path(stringValue.split('.').map(id))
}

export function parsePathWithAlias(stringValue: string) {
    const [identifierPathString, aliasString] = splitAlias(stringValue)
    return [parsePath(identifierPathString), aliasString ? id(aliasString) : undefined] as const
}

export function parseSelection(stringValue: string) {
    const [value, alias] = parsePathWithAlias(stringValue)
    return selection(value, alias)
}

export function toValuePairs(object: Record<string, any>) {
    return Object.entries(object).map(([columnName, value]) =>
        valuePair(id(columnName), escaped(value)),
    )
}

export class ComplexQueryBuilder<QueryType extends ComplexQuery> {
    constructor(readonly query: QueryType) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    where(_strings: TemplateStringsArray, ..._values: any[]) {
        return this
    }
}

export class SelectQueryBuilder extends ComplexQueryBuilder<SelectQuery> {
    withSelections(selections: Selection[]) {
        return new SelectQueryBuilder({
            ...this.query,
            selections,
        })
    }

    columns(columnPaths: string[]) {
        return this.withSelections(columnPaths.map(parseSelection))
    }

    countOf(columnPath: string, aliasName: string) {
        const [path, alias = aliasName ? id(aliasName) : undefined] = parsePathWithAlias(columnPath)
        return this.withSelections([selection(computedCount([path]), alias)])
    }

    allColumns() {
        return this.withSelections([
            selection(path(this.query.targetTable.identifiers.concat(allColumns()))),
        ])
    }
}

export class UpdateQueryBuilder extends ComplexQueryBuilder<UpdateQuery> {}

export class DeleteQueryBuilder extends ComplexQueryBuilder<DeleteQuery> {}

export class QueryBuilder {
    constructor(readonly targetTable: PathValue, readonly targetTableAlias?: IdentifierValue) {}

    get select() {
        return new SelectQueryBuilder({
            type: QueryType.SELECT,
            targetTable: this.targetTable,
            targetTableAlias: this.targetTableAlias,
        }).allColumns()
    }

    get delete() {
        return new DeleteQueryBuilder({
            type: QueryType.DELETE,
            targetTable: this.targetTable,
            targetTableAlias: this.targetTableAlias,
        })
    }

    insert(values: Record<string, any>) {
        return {
            type: QueryType.INSERT,
            targetTable: this.targetTable,
            valuePairs: toValuePairs(values),
        } as InsertQuery
    }

    replace(values: Record<string, any>) {
        return {
            type: QueryType.REPLACE,
            targetTable: this.targetTable,
            valuePairs: toValuePairs(values),
        } as ReplaceQuery
    }

    update(values: Record<string, any>) {
        return new UpdateQueryBuilder({
            type: QueryType.UPDATE,
            targetTable: this.targetTable,
            valuePairs: toValuePairs(values),
        })
    }
}

export function inTable(tableNameOrStrings: string, targetTableAliasName?: string): QueryBuilder
export function inTable(tableNameOrStrings: TemplateStringsArray): QueryBuilder
export function inTable(
    tableNameOrStrings: TemplateStringsArray | string,
    targetTableAliasName?: string,
) {
    const [
        targetTable,
        targetTableAlias = targetTableAliasName ? id(targetTableAliasName) : undefined,
    ] = parsePathWithAlias(
        typeof tableNameOrStrings === 'string' ? tableNameOrStrings : tableNameOrStrings[0] ?? '',
    )
    return new QueryBuilder(targetTable, targetTableAlias)
}
