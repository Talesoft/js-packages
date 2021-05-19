import {
    createPool,
    FieldPacket,
    OkPacket,
    Pool,
    PoolConnection,
    PoolOptions,
    ResultSetHeader,
    RowDataPacket,
} from 'mysql2/promise'
import {
    Computation,
    isComputedValue,
    isEscapedValue,
    isGeneratedValue,
    isIdentifierValue,
    isPathValue,
    isRawValue,
    isValue,
    Value,
    valueTypeSymbol,
} from './values'

const computationMap = {
    [Computation.COUNT]: 'COUNT',
}

export class Query {
    constructor(readonly queryString: string = '', readonly parameters: any[] = []) {}

    concat(query: Query) {
        return [this.queryString + query.queryString, this.parameters.concat(query.parameters)]
    }

    static join(delimiter: string, queries: Query[]) {
        return queries.reduce((result, query, index) => {
            const isLast = index === queries.length - 1
            return new Query(
                result.queryString + (isLast ? '' : delimiter),
                result.parameters.concat(query.parameters),
            )
        }, new Query())
    }
}

export class Executor {
    constructor(readonly pool: Pool) {}

    async query(strings: TemplateStringsArray, ...parameters: any[]) {
        const connection = await this.pool.getConnection()
        // await connection.query(await this.escapeQuery(connection, strings, parameters))
        connection.release()
    }

    async execute<Result = Record<string, any>>(
        strings: TemplateStringsArray,
        ...parameters: any[]
    ) {
        const connection = await this.pool.getConnection()
        // const resultTuple = await connection.execute(
        //     await this.escapeQuery(connection, strings, parameters),
        // )
        connection.release()
        // return this.mapResult<Result>(resultTuple)
    }

    private mapResult<Result = Record<string, any>>([result, fields]: readonly [
        RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader,
        FieldPacket[],
    ]) {
        if (!Array.isArray(result)) {
            throw new Error(
                'Failed to return SQL query result: Result was not an array. Use query or the pool directly.',
            )
        }
        return result.map((packet: RowDataPacket | RowDataPacket[] | OkPacket) => {
            if (Array.isArray(packet) || packet.constructor.name !== 'RowDataPacket') {
                throw new Error(
                    'Received invalid row from SQL query. Result was not a RowDataPacket. Use query or the pool directly instead.',
                )
            }
            return Object.fromEntries(
                fields.map((field, index) => [field.name, (packet as RowDataPacket)[index]]),
            ) as Result
        })
    }

    private async escapeQuery(
        poolConnection: PoolConnection,
        strings: TemplateStringsArray,
        ...parameters: any[]
    ) {
        return strings.reduce(
            (result, currentString, index) => {
                return [
                    `${result}${currentString}${
                        parameters[index] ? this.escape(poolConnection, parameters[index]) : ''
                    }`,
                ]
            },
            ['', []],
        )
    }

    private async escape(poolConnection: PoolConnection, value: any) {
        if (isValue(value)) {
            return this.escapeValue(poolConnection, value)
        }
        return poolConnection.escape(value)
    }

    private async escapeValue(
        poolConnection: PoolConnection,
        value: Value,
    ): Promise<[string, any[]]> {
        if (isRawValue(value)) {
            return [value.data, []]
        }
        if (isIdentifierValue(value)) {
            return [poolConnection.escapeId(value.name), []]
        }
        if (isPathValue(value)) {
            const escapedIdentifiers = await Promise.all(
                value.identifiers.map(async id => (await this.escapeValue(poolConnection, id))[0]),
            )
            return [escapedIdentifiers.join('.'), []]
        }
        if (isEscapedValue(value)) {
            return ['?', [value]]
        }
        if (isGeneratedValue(value)) {
            if (value.generator === 'autoIncrement') {
                return ['AUTO_INCREMENT', []]
            }
            return this.escapeValue(poolConnection, await value.generator())
        }
        if (isComputedValue(value)) {
            const parameterSql = Array.from({ length: value.parameters.length }, () => '?').join(
                ',',
            )
            return [
                `${computationMap[value.computation]}(${value.parameters
                    .map(param => this.escapeValue(poolConnection, param))
                    .join(',')})`,
                value.parameters,
            ]
        }
        throw new Error(`Invalid value type ${value[valueTypeSymbol]} encountered`)
    }
}

export function createExecutor(optionsOrUri: string): Executor
export function createExecutor(optionsOrUri: PoolOptions): Executor
export function createExecutor(optionsOrUri: string | PoolOptions) {
    const pool = createPool(typeof optionsOrUri === 'string' ? { uri: optionsOrUri } : optionsOrUri)
    return new Executor(pool)
}
