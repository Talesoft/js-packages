// import { primitives } from './common'
// import {
//   isArraySchema,
//   isIntegerSchema,
//   isNumberSchema,
//   isObjectSchema,
//   isStringSchema,
// } from './factories'
// import type { Primitive } from './common'
// import type { Schema } from './schemas'

// export interface ValidationErrorBase<SchemaType extends Schema = Schema, Value = unknown> {
//   readonly schema: SchemaType
//   readonly value: Value
//   readonly path: ReadonlyArray<string | number>
// }

// export interface InvalidValueTypeValidationError<
//   SchemaType extends Schema = Schema,
//   Value = unknown,
// > extends ValidationErrorBase<SchemaType, Value> {
//   readonly type: 'invalidValueType'
//   readonly expectedTypes: ReadonlyArray<Primitive>
//   readonly actualType: Primitive | 'language-specific'
// }

// export interface OutOfBoundsValidationError<SchemaType extends Schema = Schema, Value = unknown>
//   extends ValidationErrorBase<SchemaType, Value> {
//   readonly type: 'outOfBounds'
//   readonly minValue?: number
//   readonly exclusiveMinValue?: number
//   readonly maxValue?: number
//   readonly exclusiveMaxValue?: number
// }

// export interface PatternFailureValidationError<SchemaType extends Schema = Schema, Value = unknown>
//   extends ValidationErrorBase<SchemaType, Value> {
//   readonly type: 'patternFailure'
//   readonly pattern: string
// }

// export interface InvalidFormatValidationError<SchemaType extends Schema = Schema, Value = unknown>
//   extends ValidationErrorBase<SchemaType, Value> {
//   readonly type: 'invalidFormat'
//   readonly format: string
//   readonly availableFormats: ReadonlyArray<string>
// }

// export interface FormatFailureValidationError<SchemaType extends Schema = Schema, Value = unknown>
//   extends ValidationErrorBase<SchemaType, Value> {
//   readonly type: 'formatFailure'
//   readonly format: string
// }

// export interface MultiplicityFailureValidationError<
//   SchemaType extends Schema = Schema,
//   Value = unknown,
// > extends ValidationErrorBase<SchemaType, Value> {
//   readonly type: 'multiplicityFailure'
//   readonly requiredMultipleOf: number
// }

// export interface UniquenessFailureValidationError<
//   SchemaType extends Schema = Schema,
//   Value = unknown,
// > extends ValidationErrorBase<SchemaType, Value> {
//   readonly type: 'uniquenessFailure'
//   readonly firstIndex: number
//   readonly duplicateIndex: number
// }

// export interface MissingPropertyValidationError<SchemaType extends Schema = Schema, Value = unknown>
//   extends ValidationErrorBase<SchemaType, Value> {
//   readonly type: 'missingProperty'
//   readonly propertyKey: string
// }

// export interface CompositionFailureValidationError<
//   SchemaType extends Schema = Schema,
//   Value = unknown,
// > extends ValidationErrorBase<SchemaType, Value> {
//   readonly type: 'compositionFailure'
//   readonly compositionType: 'not' | 'any' | 'one' | 'all'
//   readonly schemaErrors: ReadonlyArray<
//     readonly [Schema, ReadonlyArray<ValidationError<SchemaType, Value>>]
//   >
// }

// export interface EnumFailureValidationError<SchemaType extends Schema = Schema, Value = unknown>
//   extends ValidationErrorBase<SchemaType, Value> {
//   readonly type: 'enumFailure'
//   readonly allowedValues: ReadonlyArray<Value>
// }

// export type ValidationError<SchemaType extends Schema = Schema, Value = unknown> =
//   | InvalidValueTypeValidationError<SchemaType, Value>
//   | OutOfBoundsValidationError<SchemaType, Value>
//   | PatternFailureValidationError<SchemaType, Value>
//   | InvalidFormatValidationError<SchemaType, Value>
//   | FormatFailureValidationError<SchemaType, Value>
//   | MultiplicityFailureValidationError<SchemaType, Value>
//   | UniquenessFailureValidationError<SchemaType, Value>
//   | MissingPropertyValidationError<SchemaType, Value>
//   | CompositionFailureValidationError<SchemaType, Value>
//   | EnumFailureValidationError<SchemaType, Value>

// export type StringValidator = (value: string) => boolean
// export type StringValidators = Record<string, StringValidator>

// export type ConstraintValidator = <SchemaType extends Schema, Value>(
//   schema: SchemaType,
//   value: Value,
//   context: ValidationContext,
// ) => Generator<ValidationError, void, undefined>
// export type ConstraintValidators = ConstraintValidator[]

// export interface ValidationContext {
//   path: ReadonlyArray<string | number>
//   stringValidators: StringValidators
//   constraintValidators: ConstraintValidators
//   rootSchema: Schema
// }

// const standardStringValidators: StringValidators = {
//   'date-time': value => value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}+\d{2}:\d{2}$/) !== null,
//   time: value => value.match(/^\d{2}:\d{2}:\d{2}$/) !== null,
//   date: value => value.match(/^\d{4}-\d{2}-\d{2}$/) !== null,
//   // TODO: Any sensible way to check this?
//   email: value => value.includes('@'),
//   // TODO: Any sensible way to check this?
//   'idn-email': value => value.includes('@'),
//   // TODO: Any sensible way to check this?
//   hostname: value =>
//     value.match(
//       /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/,
//     ) !== null,
//   // TODO: Any sensible way to check this?
//   'idn-hostname': value => value.match(/.+/) !== null,
//   // TODO: Any sensible way to check this?
//   'iri-reference': value => value.match(/.+/) !== null,
//   // TODO: Any sensible way to check this?
//   iri: value => value.match(/.+/) !== null,
//   // TODO: Any sensible way to check this?
//   'uri-reference': value => value.match(/.+/) !== null,
//   // TODO: Any sensible way to check this?
//   uri: value => value.match(/.+/) !== null,
//   ipv4: value =>
//     value.match(
//       /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
//     ) !== null,
//   ipv6: value =>
//     value.match(
//       /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
//     ) !== null,
// }

// /**
//  * Checks for deep equality between two arbitrary values
//  *
//  * @param left
//  * @param right
//  * @returns
//  */
// function equals<Value>(left: Value, right: Value): boolean {
//   if (typeof left !== typeof right) {
//     return false
//   }

//   if ((left === undefined && right === undefined) || (left === null && right === null)) {
//     return true
//   }

//   if (Array.isArray(left) && Array.isArray(right)) {
//     return left.length === right.length && left.every((value, index) => equals(value, right[index]))
//   }

//   if (typeof left === 'object' && typeof right === 'object') {
//     const value = left as Record<string, unknown>
//     const other = right as Record<string, unknown>
//     const valueKeys = Object.keys(value)
//     return (
//       valueKeys.length === Object.keys(other).length &&
//       valueKeys.every(key => equals(value[key], other[key]))
//     )
//   }

//   return left === right
// }

// /**
//  * Validates all string constraints in a JSON-schema and returns a generator of errors.
//  *
//  * @param schema
//  * @param value
//  * @param context
//  * @returns
//  */
// function* validateStringConstraints<SchemaType extends Schema, Value>(
//   schema: SchemaType,
//   value: Value,
//   context: ValidationContext,
// ): Generator<ValidationError<Schema, unknown>, void, undefined> {
//   if (!isStringSchema(schema) || typeof value !== 'string') {
//     return
//   }

//   if (
//     (schema.minLength !== undefined && value.length < schema.minLength) ||
//     (schema.maxLength !== undefined && value.length > schema.maxLength)
//   ) {
//     yield {
//       schema,
//       value,
//       path: context.path,
//       type: 'outOfBounds',
//       minValue: schema.minLength,
//       maxValue: schema.maxLength,
//     }
//   }

//   if (schema.pattern !== undefined && !value.match(new RegExp(schema.pattern))) {
//     yield {
//       schema,
//       value,
//       path: context.path,
//       type: 'patternFailure',
//       pattern: schema.pattern,
//     }
//   }

//   if (schema.format !== undefined) {
//     const validateFormat = context.stringValidators[schema.format]

//     if (!validateFormat) {
//       yield {
//         schema,
//         value,
//         path: context.path,
//         type: 'invalidFormat',
//         format: schema.format,
//         availableFormats: Object.keys(context.stringValidators),
//       }
//     } else if (!validateFormat(value)) {
//       yield {
//         schema,
//         value,
//         path: context.path,
//         type: 'formatFailure',
//         format: schema.format,
//       }
//     }
//   }
// }

// /**
//  * Validates all number constraints in a JSON-schema and returns a generator of errors.
//  *
//  * @param schema
//  * @param value
//  * @param context
//  * @returns
//  */
// function* validateNumberConstraints<SchemaType extends Schema, Value>(
//   schema: SchemaType,
//   value: Value,
//   context: ValidationContext,
// ): Generator<ValidationError<Schema, unknown>, void, undefined> {
//   if ((!isNumberSchema(schema) && !isIntegerSchema(schema)) || typeof value !== 'number') {
//     return
//   }

//   if (schema.multipleOf !== undefined && value % schema.multipleOf !== 0) {
//     yield {
//       schema,
//       value,
//       path: context.path,
//       type: 'multiplicityFailure',
//       requiredMultipleOf: schema.multipleOf,
//     }
//   }

//   if (
//     (schema.minimum !== undefined && value < schema.minimum) ||
//     (schema.exclusiveMinimum !== undefined && value >= schema.exclusiveMinimum) ||
//     (schema.maximum !== undefined && value > schema.maximum) ||
//     (schema.exclusiveMaximum !== undefined && value >= schema.exclusiveMaximum)
//   ) {
//     yield {
//       schema,
//       value,
//       path: context.path,
//       type: 'outOfBounds',
//       minValue: schema.minLength,
//       exclusiveMinValue: schema.exclusiveMinimum,
//       maxValue: schema.maxLength,
//       exclusiveMaxValue: schema.exclusiveMaximum,
//     }
//   }

//   if (schema.type === 'integer' && Math.floor(value) !== value) {
//     yield {
//       schema,
//       value,
//       path: context.path,
//       type: 'multiplicityFailure',
//       requiredMultipleOf: 1,
//     }
//   }
// }

// /**
//  * Validates all array constraints in a JSON-schema and returns a generator of errors.
//  *
//  * @param schema
//  * @param value
//  * @param context
//  * @returns
//  */
// function* validateArrayConstraints<SchemaType extends Schema, Value>(
//   schema: SchemaType,
//   value: Value,
//   context: ValidationContext,
// ): Generator<ValidationError, void, undefined> {
//   if (!isArraySchema(schema) || !Array.isArray(value)) {
//     return
//   }

//   const items = schema.items
//   if (items !== undefined) {
//     if (Array.isArray(items)) {
//       if (value.length < items.length) {
//         yield {
//           schema,
//           value,
//           path: context.path,
//           type: 'outOfBounds',
//           minValue: items.length,
//         }
//       } else {
//         // Validate tuple type ({ items: [a, b, c] })
//         yield* items.flatMap((itemSchema, index) =>
//           Array.from(
//             validateValue(itemSchema, value[index], {
//               ...context,
//               path: [...context.path, index],
//             }),
//           ),
//         )
//       }

//       // Validate additional items set to false
//       if (schema.additionalItems === false && items.length < value.length) {
//         yield {
//           schema,
//           value,
//           path: context.path,
//           type: 'outOfBounds',
//           maxValue: items.length,
//         }
//       }

//       // Validate additional items configured to a single schema
//       if (
//         typeof schema.additionalItems === 'object' &&
//         schema.additionalItems !== null &&
//         items.length < value.length
//       ) {
//         const offset = items.length - 1
//         yield* value.slice(offset).flatMap((childValue, index) =>
//           Array.from(
//             validateValue(schema.additionalItems as Schema, childValue, {
//               ...context,
//               path: [...context.path, offset + index],
//             }),
//           ),
//         )
//       }
//     } else {
//       // Validate items set to single schema ({ items: string() })
//       yield* value.flatMap((childValue, index) =>
//         Array.from(
//           validateValue(schema.items as Schema, childValue, {
//             ...context,
//             path: [...context.path, index],
//           }),
//         ),
//       )
//     }
//   } else if (typeof schema.additionalItems === 'object' && schema.additionalItems !== null) {
//     // Validate only additionalItems configured to single schema ({ additionalItems: string() })
//     yield* value.flatMap((childValue, index) =>
//       Array.from(
//         validateValue(schema.additionalItems as Schema, childValue, {
//           ...context,
//           path: [...context.path, index],
//         }),
//       ),
//     )
//   }

//   if (
//     (schema.minItems !== undefined && value.length < schema.minItems) ||
//     (schema.maxItems !== undefined && value.length > schema.maxItems)
//   ) {
//     yield {
//       schema,
//       value,
//       type: 'outOfBounds',
//       path: context.path,
//       minValue: schema.minItems,
//       maxValue: schema.maxItems,
//     }
//   }

//   if (schema.uniqueItems === true) {
//     yield* value.flatMap((childValue, index): ReadonlyArray<ValidationError> => {
//       const lastIndex = value.lastIndexOf(childValue)
//       if (lastIndex === index) {
//         return []
//       }
//       return [
//         {
//           schema,
//           value,
//           path: context.path,
//           type: 'uniquenessFailure',
//           firstIndex: index,
//           duplicateIndex: lastIndex,
//         },
//       ]
//     })
//   }
// }

// /**
//  * Validates all object constraints in a JSON-schema and returns a generator of errors.
//  *
//  * @param schema
//  * @param value
//  * @param context
//  * @returns
//  */
// function* validateObjectConstraints<SchemaType extends Schema, Value>(
//   schema: SchemaType,
//   value: Value,
//   context: ValidationContext,
// ): Generator<ValidationError, void, undefined> {
//   if (
//     !isObjectSchema(schema) ||
//     typeof value !== 'object' ||
//     Array.isArray(value) ||
//     value === null
//   ) {
//     return
//   }

//   const record = value as Record<string, unknown>
//   const props = schema.properties
//   const valueKeys = Object.keys(record)

//   if (props !== undefined) {
//     // When normal properties are defined ({ properties: { name: string() }})
//     const propKeys = Object.keys(props)
//     yield* propKeys.flatMap(key => {
//       // The case of values being undefined will be handled by schema.required handling further below
//       if (record[key] === undefined) {
//         return []
//       }

//       return Array.from(
//         validateValue(props[key], record[key], { ...context, path: [...context.path, key] }),
//       )
//     })

//     // Validate additionalProperties set to false
//     if (schema.additionalProperties === false && valueKeys.length < propKeys.length) {
//       yield {
//         schema,
//         value,
//         path: context.path,
//         type: 'outOfBounds',
//         maxValue: propKeys.length,
//       }
//     }

//     // Validate additionalItems configured to a single schema
//     if (
//       typeof schema.additionalProperties === 'object' &&
//       schema.additionalProperties !== null &&
//       valueKeys.length < propKeys.length
//     ) {
//       yield* valueKeys
//         .filter(key => !propKeys.includes(key))
//         .flatMap(key =>
//           Array.from(
//             validateValue(schema.additionalProperties as Schema, record[key], {
//               ...context,
//               path: [...context.path, key],
//             }),
//           ),
//         )
//     }
//   } else if (
//     typeof schema.additionalProperties === 'object' &&
//     schema.additionalProperties !== null
//   ) {
//     // Handle only additionalProperties being a single schema ({ additionalProperties: string() })
//     yield* valueKeys.flatMap(key =>
//       Array.from(
//         validateValue(schema.additionalProperties as Schema, record[key], {
//           ...context,
//           path: [...context.path, key],
//         }),
//       ),
//     )
//   }

//   const patternProps = schema.patternProperties
//   if (patternProps !== undefined) {
//     // Handle patternProperties ({ patternProperties: { "text$": string() } })
//     yield* valueKeys
//       .map(
//         key =>
//           [
//             key,
//             Object.keys(patternProps).find(pattern => key.match(new RegExp(pattern)) !== null),
//           ] as const,
//       )
//       .filter(([, pattern]) => Boolean(pattern))
//       .flatMap(([key, pattern]) =>
//         Array.from(
//           validateValue(patternProps[pattern as string], record[key], {
//             ...context,
//             path: [...context.path, key],
//           }),
//         ),
//       )
//   }

//   if (schema.required !== undefined) {
//     // Make sure all required props exist
//     yield* schema.required.flatMap((key): ReadonlyArray<ValidationError> => {
//       if (valueKeys.includes(key)) {
//         return []
//       }
//       return [
//         {
//           schema,
//           value,
//           path: context.path,
//           type: 'missingProperty',
//           propertyKey: key,
//         },
//       ]
//     })
//   }

//   if (
//     (schema.minProperties !== undefined && valueKeys.length < schema.minProperties) ||
//     (schema.maxProperties !== undefined && valueKeys.length > schema.maxProperties)
//   ) {
//     yield {
//       schema,
//       value,
//       type: 'outOfBounds',
//       path: context.path,
//       minValue: schema.minProperties,
//       maxValue: schema.maxProperties,
//     }
//   }

//   const deps = schema.dependentSchemas
//   if (deps !== undefined) {
//     yield* Object.entries(deps).flatMap(([key, dep]): ReadonlyArray<ValidationError> => {
//       if (!valueKeys.includes(key)) {
//         return []
//       }

//       // If the dependency is a string array, we mean "we require all keys in `dep` when `key` is there, too"
//       if (Array.isArray(dep)) {
//         return dep.flatMap(
//           (requiredKey): ReadonlyArray<ValidationError> =>
//             !valueKeys.includes(requiredKey)
//               ? [
//                   {
//                     schema,
//                     value,
//                     path: context.path,
//                     type: 'missingProperty',
//                     propertyKey: requiredKey,
//                   },
//                 ]
//               : [],
//         )
//       }

//       // At this point, dep must be a Schema we will (conditionally) validate against
//       return Array.from(validateValue(dep as Schema, value, context))
//     })
//   }
// }

// /**
//  * Retrieves the best fitting JSON-schema primitive for the respective JS value's type.
//  *
//  * @param value
//  * @returns
//  */
// function getPrimitiveForValue<Value>(value: Value): Primitive | 'language-specific' {
//   switch (typeof value) {
//     case 'string':
//       return 'string'
//     case 'number':
//       // It doesn't really make sense to check for "integer"
//       // Any integer is automatically also a valid "number", so we really never know
//       return 'number'
//     case 'boolean':
//       return 'boolean'
//     case 'object':
//       if (value === null) {
//         return 'null'
//       }
//       if (Array.isArray(value)) {
//         return 'array'
//       }
//       return 'object'
//     default:
//       return 'language-specific'
//   }
// }

// /**
//  * Validates all annotation constraints in a JSON-schema and returns a generator of errors.
//  *
//  * @param schema
//  * @param value
//  * @param context
//  * @returns
//  */
// function* validateAnnotations<SchemaType extends Schema, Value>(
//   schema: SchemaType,
//   value: Value,
//   context: ValidationContext,
// ): Generator<ValidationError, void, undefined> {
//   // Validate "type" annotations
//   if (schema.type !== undefined) {
//     const valueType = getPrimitiveForValue(value)

//     // If it is a language-specific type (say, function or symbol or bigint)
//     // we don't accept it (conversion/casting is out of scope of this library)
//     if (valueType === 'language-specific') {
//       yield {
//         schema,
//         value,
//         path: context.path,
//         type: 'invalidValueType',
//         expectedTypes: primitives,
//         actualType: valueType,
//       }
//       return
//     }

//     // For type-checking we
//     // 1. always check against an array (makes the process easier for composed types, e.g. ['string', 'number'])
//     // 2. we always check for "number" in JS, never for "integer"
//     //    (getPrimitiveForValue() will always return "number", never "integer")
//     const allowedTypes: Primitive[] = (
//       Array.isArray(schema.type) ? schema.type : [schema.type]
//     ).map(type => (type === 'integer' ? 'number' : type))

//     if (!allowedTypes.includes(valueType)) {
//       yield {
//         schema,
//         value,
//         path: context.path,
//         type: 'invalidValueType',
//         expectedTypes: allowedTypes,
//         actualType: valueType,
//       }
//     }
//     return
//   }

//   // Validate enums ({ enum: ['a', 'b', 'c']})
//   // The value always needs to be one of these values!
//   // We use deep-comparison, so enum values can _actually_ also be objects or arrays,
//   // even if it's not feasable for most languages
//   // TODO: equals() should maybe have recursion detection? Generally, don't do recursion
//   //       in schemas. Use refs.
//   if (schema.enum !== undefined) {
//     const foundItem = schema.enum.find(enumValue => equals(enumValue, value))
//     if (!foundItem) {
//       yield {
//         schema,
//         value,
//         path: context.path,
//         type: 'enumFailure',
//         allowedValues: schema.enum,
//       }
//     }
//   }
// }

// /**
//  * Validates schema composition with oneOf/anyOf/allOf/not and returns a generator of errors.
//  *
//  * @param schema
//  * @param value
//  * @param context
//  * @returns
//  */
// function* validateComposition<SchemaType extends Schema, Value>(
//   schema: SchemaType,
//   value: Value,
//   context: ValidationContext,
// ): Generator<ValidationError, void, undefined> {
//   // Handle anyOf ({ anyOf: [string(), number()]})
//   if (schema.anyOf !== undefined) {
//     const errorLists = schema.anyOf.map(subSchema =>
//       Array.from(validateValue(subSchema, value, context)),
//     )
//     const validSchemaCount = errorLists.filter(list => list.length < 1).length

//     // Only of none of the schemata matches, we will register
//     // every single error that occured
//     if (validSchemaCount < 1) {
//       yield {
//         schema,
//         value,
//         path: context.path,
//         type: 'compositionFailure',
//         compositionType: 'any',
//         schemaErrors: schema.anyOf.map((schema, index) => [schema, errorLists[index]]),
//       }
//     }
//   }

//   // Handle oneOf ({ oneOf: [string(), number()]})
//   if (schema.oneOf !== undefined) {
//     const errorLists = schema.oneOf.map(subSchema =>
//       Array.from(validateValue(subSchema, value, context)),
//     )
//     const validSchemaCount = errorLists.filter(list => list.length < 1).length

//     // Only of none of the schemata matches, we will register
//     // every single error that occured
//     if (validSchemaCount !== 1) {
//       yield {
//         schema,
//         value,
//         path: context.path,
//         type: 'compositionFailure',
//         compositionType: 'one',
//         schemaErrors: schema.oneOf.map((schema, index) => [schema, errorLists[index]]),
//       }
//     }
//   }

//   // Handle allOf ({ allOf: [string(), { minLength: 5 }]})
//   if (schema.allOf !== undefined) {
//     const errorLists = schema.allOf.map(subSchema =>
//       Array.from(validateValue(subSchema, value, context)),
//     )
//     const validSchemaCount = errorLists.filter(list => list.length < 1).length

//     // Only of none of the schemata matches, we will register
//     // every single error that occured
//     if (validSchemaCount !== schema.allOf.length) {
//       yield {
//         schema,
//         value,
//         path: context.path,
//         type: 'compositionFailure',
//         compositionType: 'all',
//         schemaErrors: schema.allOf.map((schema, index) => [schema, errorLists[index]]),
//       }
//     }
//   }

//   // Handle not ({ not: [{ format: 'email' }]})
//   if (schema.not !== undefined) {
//     const errors = Array.from(validateValue(schema.not, value, context))

//     if (errors.length < 1) {
//       // The schema didn't return any errors.
//       // But as it's "not", valid means invalid for us.
//       yield {
//         schema,
//         value,
//         path: context.path,
//         type: 'compositionFailure',
//         compositionType: 'not',
//         schemaErrors: [[schema.not, errors]],
//       }
//     }
//   }
// }

// const standardConstraintValidators = [
//   validateAnnotations,
//   validateComposition,
//   validateStringConstraints,
//   validateNumberConstraints,
//   validateArrayConstraints,
//   validateObjectConstraints,
// ]

// /**
//  * Validates all constraints of a schema against a value and returns a generator or errors.
//  *
//  * @param schema
//  * @param value
//  * @param context
//  */
// function* validateValue<SchemaType extends Schema, Value>(
//   schema: SchemaType,
//   value: Value,
//   context: ValidationContext,
// ): Generator<ValidationError, void, undefined> {
//   for (const validateConstraint of context.constraintValidators) {
//     yield* validateConstraint(schema, value, context)
//   }
// }

// /**
//  * Validates a value against a JSON-schema and returns an array of errors.
//  *
//  * @param options
//  * @returns
//  */
// export function validate<SchemaType extends Schema, Value>(
//   schema: SchemaType,
//   value: Value,
//   options?: Partial<ValidationContext>,
// ): ValidationError[] {
//   const context: ValidationContext = {
//     path: options?.path ?? [],
//     stringValidators: { ...standardStringValidators, ...options?.stringValidators },
//     constraintValidators: [
//       ...standardConstraintValidators,
//       ...(options?.constraintValidators ?? []),
//     ],
//     rootSchema: options?.rootSchema ?? schema,
//   }

//   return Array.from(validateValue(schema, value, context))
// }

// export function validateSchema<SchemaType extends Schema>(
//   schema: SchemaType,
//   options?: Partial<ValidationContext>,
// ): ValidationError[] {
//   return
// }
