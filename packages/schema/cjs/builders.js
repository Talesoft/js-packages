"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allOf = allOf;
exports.anyOf = anyOf;
exports.oneOf = oneOf;
exports.not = not;
exports.any = any;
exports.nothing = nothing;
exports.schemaNull = schemaNull;
exports.boolean = boolean;
exports.string = string;
exports.number = number;
exports.integer = integer;
exports.array = array;
exports.object = object;
exports.arrayOf = arrayOf;
exports.tupleOf = tupleOf;
exports.objectOf = objectOf;
exports.mapOf = mapOf;
exports.objectSchema = exports.arraySchema = exports.integerSchema = exports.numberSchema = exports.stringSchema = exports.booleanSchema = exports.nullSchema = exports.nothingSchema = exports.anySchema = void 0;

function allOf(...schemas) {
  return {
    allOf: schemas
  };
}

function anyOf(...schemas) {
  return {
    anyOf: schemas
  };
}

function oneOf(...schemas) {
  return {
    oneOf: schemas
  };
}

function not(schema) {
  return {
    not: schema
  };
}

const anySchema = {};
exports.anySchema = anySchema;
const nothingSchema = not({});
exports.nothingSchema = nothingSchema;
const nullSchema = {
  type: 'null'
};
exports.nullSchema = nullSchema;
const booleanSchema = {
  type: 'boolean'
};
exports.booleanSchema = booleanSchema;
const stringSchema = {
  type: 'string'
};
exports.stringSchema = stringSchema;
const numberSchema = {
  type: 'number'
};
exports.numberSchema = numberSchema;
const integerSchema = {
  type: 'integer'
};
exports.integerSchema = integerSchema;
const arraySchema = {
  type: 'array'
};
exports.arraySchema = arraySchema;
const objectSchema = {
  type: 'object'
};
exports.objectSchema = objectSchema;

function any() {
  return anySchema;
}

function nothing() {
  return nothingSchema;
}

function schemaNull() {
  return nullSchema;
}

function boolean() {
  return booleanSchema;
}

function string(options) {
  return { ...stringSchema,
    ...options
  };
}

function number(options) {
  return { ...numberSchema,
    ...options
  };
}

function integer(options) {
  return { ...integerSchema,
    ...options
  };
}

function array(options) {
  return { ...arraySchema,
    ...options
  };
}

function object(options) {
  return { ...objectSchema,
    ...options
  };
}

function arrayOf(schema) {
  return { ...arraySchema,
    items: schema
  };
}

function tupleOf(...schema) {
  return { ...arraySchema,
    items: schema
  };
}

function objectOf(properties) {
  return { ...objectSchema,
    properties
  };
}

function mapOf(item) {
  return { ...objectSchema,
    additionalProperties: item
  };
}