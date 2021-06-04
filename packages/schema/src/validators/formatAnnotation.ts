import type { Validator } from '../validation'
import { isBoolean, isString } from '../common'
import { enterKeyword, invalidOutput, validOutput } from '../validation'

export type FormatValidator = (value: string) => boolean
export type FormatValidators = Record<string, FormatValidator>

export const standardFormatValidators: FormatValidators = {
  // TODO: Any sensible way to check this?
  regex: value => value.match(/.+/) !== null,
  'date-time': value => value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}+\d{2}:\d{2}$/) !== null,
  time: value => value.match(/^\d{2}:\d{2}:\d{2}$/) !== null,
  date: value => value.match(/^\d{4}-\d{2}-\d{2}$/) !== null,
  // TODO: Any sensible way to check this?
  email: value => value.includes('@'),
  // TODO: Any sensible way to check this?
  'idn-email': value => value.includes('@'),
  // TODO: Any sensible way to check this?
  hostname: value =>
    value.match(
      /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/,
    ) !== null,
  // TODO: Any sensible way to check this?
  'idn-hostname': value => value.match(/.+/) !== null,
  // TODO: Any sensible way to check this?
  'iri-reference': value => value.match(/.+/) !== null,
  // TODO: Any sensible way to check this?
  iri: value => value.match(/.+/) !== null,
  // TODO: Any sensible way to check this?
  'uri-reference': value => value.match(/.+/) !== null,
  // TODO: Any sensible way to check this?
  uri: value => value.match(/.+/) !== null,
  // TODO: Any sensible way to check this?
  'json-pointer': value => value.match(/.+/) !== null,
  ipv4: value =>
    value.match(
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    ) !== null,
  ipv6: value =>
    value.match(
      /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
    ) !== null,
}

export const formatAnnotationValidators: Record<string, Validator> = {
  format: (schema, value, context) => {
    if (
      isBoolean(schema) ||
      !isString(schema.format) ||
      !context.formatValidators[schema.format] ||
      !isString(value)
    ) {
      return undefined
    }

    const localContext = enterKeyword('format', context)
    const valid = context.formatValidators[schema.format](value)
    return valid
      ? validOutput([], localContext)
      : invalidOutput([], localContext.error`Must be of format ${schema.format}`, localContext)
  },
}

export default formatAnnotationValidators
