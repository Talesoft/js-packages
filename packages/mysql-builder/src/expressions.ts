import { Value } from './values'

export enum Operator {
    EQUALS = '=',
    NOT_EQUALS = '!=',
    IN = 'in',
    NOT_IN = 'not in',
}

export enum LogicalOperator {
    AND = 'and',
    OR = 'or',
}

export enum ExpressionType {
    LOGICAL = 'logical',
    COMPARISON = 'comparison',
}

export interface ComparisonExpression {
    type: ExpressionType.COMPARISON
    left: Value
    operator: Operator
    right: Value
}

export interface LogicalExpression {
    type: ExpressionType.LOGICAL
    left: ComparisonExpression
    logicalOperator: LogicalOperator
    right: ComparisonExpression
}
