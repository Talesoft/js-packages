import type { UriReferenceString } from './standard/meta/common'
import type { Schema } from './standard/meta/schema'
import type {
  BasicOutput,
  DetailedOutput,
  FlagOutput,
  Output,
  OutputType,
  OutputUnit,
  VerboseOutput,
} from './standard/output/schema'
import type { FormatValidators } from './validators/formatAnnotation'
import { applicatorValidators } from './validators/applicator'
import { validationValidators } from './validators/validation'
import { isArray, isBoolean, isObject, isSchema, isString } from './common'
import { standardFormatValidators, formatAnnotationValidators } from './validators/formatAnnotation'
import { coreContextTransformers, coreValidators } from './validators/core'

export type Validator = (
  schema: Schema,
  value: unknown,
  context: ValidationContext,
) => VerboseOutput | undefined

export type ContextTransformer = (schema: Schema, context: ValidationContext) => ValidationContext

export interface ValidationContext {
  readonly loadedSchemas: Record<string, Schema>
  readonly anchors: Record<string, Schema>
  readonly dynamicAnchors: Record<string, Schema>
  readonly currentSchemaId: string
  readonly keywordLocation: UriReferenceString
  readonly instanceLocation: UriReferenceString
  readonly validators: Record<string, Validator>
  readonly formatValidators: FormatValidators
  readonly contextTransformers: Record<string, ContextTransformer>
  readonly error: (strings: TemplateStringsArray, ...params: ReadonlyArray<unknown>) => string
}

export type ValidationOptions = Partial<ValidationContext>

export function output(data: Partial<OutputUnit>, context: ValidationContext): VerboseOutput {
  const absoluteKeywordLocation = `${context.currentSchemaId}${
    context.keywordLocation ? `/${context.keywordLocation}` : ''
  }`
  return {
    absoluteKeywordLocation,
    valid: true,
    keywordLocation: context.keywordLocation,
    instanceLocation: context.instanceLocation,
    ...data,
  }
}

export function invalidOutput(
  errors: VerboseOutput[],
  error: string,
  context: ValidationContext,
): VerboseOutput {
  return output({ valid: false, error, ...(errors.length > 0 ? { errors } : {}) }, context)
}

export function validOutput(
  annotations: VerboseOutput[],
  context: ValidationContext,
): VerboseOutput {
  return output({ valid: true, ...(annotations.length > 0 ? { annotations } : {}) }, context)
}

export function combineOutputs(
  outputs: VerboseOutput[],
  error: string,
  context: ValidationContext,
): VerboseOutput {
  const valid = outputs.every(output => output.valid)
  const annotations = outputs.filter(output => output.valid)
  const errors = outputs.filter(output => !output.valid)
  return output(
    {
      valid,
      ...(annotations.length > 0 ? { annotations } : {}),
      ...(errors.length > 0 ? { errors } : {}),
      ...(!valid && error !== undefined ? { error } : {}),
    },
    context,
  )
}

function flatError(value: OutputUnit): BasicOutput {
  return {
    valid: value.valid,
    keywordLocation: value.keywordLocation,
    absoluteKeywordLocation: value.absoluteKeywordLocation,
    instanceLocation: value.instanceLocation,
    error: value.error,
  }
}

function onlyErrors(errors: ReadonlyArray<OutputUnit>): ReadonlyArray<BasicOutput> {
  return errors
    .filter(error => !error.valid)
    .map(error => (error.errors ? { ...error, errors: onlyErrors(error.errors) } : error))
}

function flattenBasic(errors: ReadonlyArray<OutputUnit>): ReadonlyArray<BasicOutput> {
  return errors
    .filter(error => !error.valid)
    .flatMap(error => [flatError(error), ...(error?.errors ? flattenBasic(error.errors) : [])])
}

function transformOutput(type: OutputType, data: OutputUnit): Output {
  switch (type) {
    case 'flag': {
      return {
        valid: data.valid,
      }
    }
    case 'basic': {
      return {
        valid: data.valid,
        ...(!data.valid
          ? {
              errors: flattenBasic([data]),
            }
          : undefined),
      }
    }
    case 'detailed':
      return {
        ...data,
        ...(!data.valid
          ? {
              errors: onlyErrors(data.errors ?? []),
            }
          : undefined),
      }
  }
  return data
}

export function enterKeyword(
  keyword: string | number,
  context: ValidationContext,
): ValidationContext {
  return {
    ...context,
    keywordLocation: `${context.keywordLocation}/${keyword}`,
  }
}

export function enterInstance(key: string | number, context: ValidationContext): ValidationContext {
  return {
    ...context,
    instanceLocation: `${context.instanceLocation}/${key}`,
  }
}

export function enterBoth(key: string | number, context: ValidationContext): ValidationContext {
  return {
    ...context,
    keywordLocation: `${context.keywordLocation}/${key}`,
    instanceLocation: `${context.instanceLocation}/${key}`,
  }
}

export function jsonError(strings: TemplateStringsArray, ...params: unknown[]): string {
  return strings
    .map(
      (string, index) => `${string}${index < params.length ? JSON.stringify(params[index]) : ''}`,
    )
    .join('')
}

export function getEvaluatedProperties(schema: Schema, value: unknown): string[] {
  if (isBoolean(schema) || !isObject(value)) {
    return []
  }

  return Object.keys(value).filter(
    key =>
      (isObject(schema.properties) && key in schema.properties) ||
      (isObject(schema.patternProperties) &&
        Object.keys(schema.patternProperties).some(pattern => key.match(new RegExp(pattern)))),
  )
}

export function getEvaluatedLength(schema: Schema, value: unknown): number {
  if (isBoolean(schema) || !isArray(value)) {
    return 0
  }

  return isSchema(schema.items) ? Infinity : schema.prefixItems?.length ?? 0
}

export function validateValue<SchemaType extends Schema, Value>(
  schema: SchemaType,
  value: Value,
  context: ValidationContext,
): VerboseOutput {
  // Transform context (e.g. core operations register schemas and anchors)
  const transformedContext = Object.values(context.contextTransformers).reduce(
    (resultContext, register) => register(schema, resultContext),
    context,
  )
  // Validate
  const results = Object.values(context.validators)
    .map(getValidatorOutput => getValidatorOutput(schema, value, transformedContext))
    .filter(Boolean) as VerboseOutput[]
  // Generate combined output
  return combineOutputs(results, transformedContext.error`Validation failed`, transformedContext)
}

export const standardValidators = {
  ...coreValidators,
  ...applicatorValidators,
  ...validationValidators,
  ...formatAnnotationValidators,
}

export function validate<SchemaType extends Schema>(
  outputType: 'flag',
  schema: SchemaType,
  value: unknown,
  options?: ValidationOptions,
): FlagOutput
export function validate<SchemaType extends Schema>(
  outputType: 'basic',
  schema: SchemaType,
  value: unknown,
  options?: ValidationOptions,
): BasicOutput
export function validate<SchemaType extends Schema>(
  outputType: 'detailed',
  schema: SchemaType,
  value: unknown,
  options?: ValidationOptions,
): DetailedOutput
export function validate<SchemaType extends Schema>(
  outputType: 'verbose',
  schema: SchemaType,
  value: unknown,
  options?: ValidationOptions,
): VerboseOutput
export function validate<SchemaType extends Schema>(
  outputType: OutputType,
  schema: SchemaType,
  value: unknown,
  options?: ValidationOptions,
): Output {
  const id = isObject(schema) && isString(schema.$id) ? schema.$id : '#'
  const context = {
    loadedSchemas: { [id]: schema, ...options?.loadedSchemas },
    anchors: {},
    dynamicAnchors: {},
    currentSchemaId: options?.currentSchemaId ?? id,
    keywordLocation: options?.keywordLocation ?? '',
    instanceLocation: options?.instanceLocation ?? '',
    validators: {
      ...standardValidators,
      ...options?.validators,
    },
    contextTransformers: {
      ...coreContextTransformers,
      ...options?.contextTransformers,
    },
    formatValidators: standardFormatValidators,
    error: options?.error ?? jsonError,
  }
  const result = validateValue(schema, value, context)
  return transformOutput(outputType, result)
}

export function validateFlag<SchemaType extends Schema>(
  schema: SchemaType,
  value: unknown,
  options?: ValidationOptions,
): FlagOutput {
  return validate('flag', schema, value, options)
}

export function validateBasic<SchemaType extends Schema>(
  schema: SchemaType,
  value: unknown,
  options?: ValidationOptions,
): BasicOutput {
  return validate('basic', schema, value, options)
}

export function validateDetailed<SchemaType extends Schema>(
  schema: SchemaType,
  value: unknown,
  options?: ValidationOptions,
): DetailedOutput {
  return validate('detailed', schema, value, options)
}

export function validateVerbose<SchemaType extends Schema>(
  schema: SchemaType,
  value: unknown,
  options?: ValidationOptions,
): VerboseOutput {
  return validate('verbose', schema, value, options)
}
