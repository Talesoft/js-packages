"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.negate = negate;
exports.isUndefined = isUndefined;
exports.isNull = isNull;
exports.isNullOrUndefined = isNullOrUndefined;
exports.isBoolean = isBoolean;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isInteger = isInteger;
exports.isNumeric = isNumeric;
exports.isArray = isArray;
exports.isObject = isObject;
exports.isFunction = isFunction;

function negate(predicate) {
  return value => !predicate(value);
}

function isUndefined(value) {
  return value === undefined;
}

function isNull(value) {
  return value === null;
}

function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

function isBoolean(value) {
  return typeof value === 'boolean';
}

function isString(value) {
  return typeof value === 'string';
}

function isNumber(value) {
  return typeof value === 'number';
}

function isInteger(value) {
  return typeof value === 'number' && Math.floor(value) === value;
}

function isNumeric(value) {
  return !isNaN(parseFloat(String(value))) && isFinite(Number(value));
}

function isArray(value) {
  return Array.isArray(value);
}

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isFunction(value) {
  return typeof value === 'function';
}