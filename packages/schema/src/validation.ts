import type { UriReferenceString } from './standard/meta/common'
import type { Schema } from './standard/meta/schema'
import type {
  BasicOutput,
  DetailedOutput,
  FlagOutput,
  OutputUnit,
  VerboseOutput,
} from './standard/output/schema'
import type { FormatValidators } from './validators/formatAnnotation'
import type { Option } from '@talesoft/option'
import { applicatorValidators } from './validators/applicator'
import { validationValidators } from './validators/validation'
import { isSchema } from './common'
import { standardFormatValidators, formatAnnotationValidators } from './validators/formatAnnotation'
import { coreContextTransformers, coreValidators } from './validators/core'
import { isBoolean, isObject, isArray, isString } from '@talesoft/types'

export type Validator = (
  schema: Schema,
  value: unknown,
  context: ValidationContext,
) => Promise<Option<VerboseOutput>>

export type ContextTransformer = (schema: Schema, context: ValidationContext) => ValidationContext

export type ValidationContext = {
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

const output = (data: Partial<OutputUnit>, context: ValidationContext): VerboseOutput => ({
  absoluteKeywordLocation: `${context.currentSchemaId !== '#' ? context.currentSchemaId : ''}${
    context.keywordLocation ? context.keywordLocation : ''
  }`,
  valid: true,
  keywordLocation: context.keywordLocation,
  instanceLocation: context.instanceLocation,
  ...data,
})

export const invalidOutput = (
  errors: VerboseOutput[],
  error: string,
  context: ValidationContext,
): VerboseOutput =>
  output({ valid: false, error, ...(errors.length > 0 ? { errors } : {}) }, context)

export const validOutput = (
  annotations: VerboseOutput[],
  context: ValidationContext,
): VerboseOutput =>
  output({ valid: true, ...(annotations.length > 0 ? { annotations } : {}) }, context)

export const combineOutputs = (
  outputs: VerboseOutput[],
  error: string,
  context: ValidationContext,
): VerboseOutput => {
  const valid = outputs.every(output => output.valid)
  const annotations = outputs.filter(output => output.valid)
  const errors = outputs.filter(output => !output.valid)
  return output(
    {
      valid,
      ...(annotations.length > 0 ? { annotations } : undefined),
      ...(errors.length > 0 ? { errors } : undefined),
      ...(!valid && error !== undefined ? { error } : undefined),
    },
    context,
  )
}

const flatError = (value: VerboseOutput): BasicOutput => {
  return {
    valid: value.valid,
    keywordLocation: value.keywordLocation,
    absoluteKeywordLocation: value.absoluteKeywordLocation,
    instanceLocation: value.instanceLocation,
    error: value.error,
  }
}

const onlyErrors = (errors: ReadonlyArray<OutputUnit>): ReadonlyArray<BasicOutput> =>
  errors
    .filter(error => !error.valid)
    .map(error => (error.errors ? { ...error, errors: onlyErrors(error.errors) } : error))

const flattenBasic = (errors: ReadonlyArray<VerboseOutput>): ReadonlyArray<BasicOutput> =>
  errors
    .filter(error => !error.valid)
    .flatMap(error => [flatError(error), ...(error?.errors ? flattenBasic(error.errors) : [])])

const toFlagOutput = (output: VerboseOutput) => ({ valid: output.valid })

const toBasicOutput = (output: VerboseOutput) => ({
  valid: output.valid,
  keywordLocation: output.keywordLocation,
  instanceLocation: output.instanceLocation,
  ...(!output.valid
    ? {
        errors: flattenBasic([output]),
      }
    : undefined),
})

const toDetailedOutput = (output: VerboseOutput) => ({
  valid: output.valid,
  keywordLocation: output.keywordLocation,
  absoluteKeywordLocation: output.absoluteKeywordLocation,
  instanceLocation: output.instanceLocation,
  ...(!output.valid
    ? {
        errors: onlyErrors(output.errors ?? []),
      }
    : undefined),
})

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

export function validateWithContext<SchemaType extends Schema, Value>(
  schema: SchemaType,
  value: Value,
  context: ValidationContext,
): Promise<VerboseOutput> {
  // Transform context (e.g. core operations register schemas and anchors)
  const transformedContext = Object.values(context.contextTransformers).reduce(
    (resultContext, register) => register(schema, resultContext),
    context,
  )
  const validations = Object.values(context.validators).map(getValidatorOutput =>
    Promise.resolve(getValidatorOutput(schema, value, transformedContext)),
  )
  // Validate
  return Promise.all(validations)
    .then(results => results.flatMap(result => result.asArray))
    .then(results =>
      combineOutputs(results, transformedContext.error`Validation failed`, transformedContext),
    )
}

export const standardValidators = {
  ...coreValidators,
  ...applicatorValidators,
  ...validationValidators,
  ...formatAnnotationValidators,
}

export const validateVerbose = <SchemaType extends Schema>(
  schema: SchemaType,
  value: unknown,
  options?: ValidationOptions,
): Promise<VerboseOutput> => {
  const id = isObject(schema) && isString(schema.$id) ? schema.$id : '#'
  const context = {
    loadedSchemas: { [id]: schema, ...options?.loadedSchemas },
    anchors: {},
    dynamicAnchors: {},
    currentSchemaId: options?.currentSchemaId ?? id,
    keywordLocation: options?.keywordLocation ?? '#',
    instanceLocation: options?.instanceLocation ?? '#',
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
  return validateWithContext(schema, value, context)
}

export function validateDetailed<SchemaType extends Schema>(
  schema: SchemaType,
  value: unknown,
  options?: ValidationOptions,
): Promise<DetailedOutput> {
  return validateVerbose(schema, value, options).then(toDetailedOutput)
}

export function validateBasic<SchemaType extends Schema>(
  schema: SchemaType,
  value: unknown,
  options?: ValidationOptions,
): Promise<BasicOutput> {
  return validateVerbose(schema, value, options).then(toBasicOutput)
}

export function validateFlag<SchemaType extends Schema>(
  schema: SchemaType,
  value: unknown,
  options?: ValidationOptions,
): Promise<FlagOutput> {
  return validateVerbose(schema, value, options).then(toFlagOutput)
}
