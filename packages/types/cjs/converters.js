"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toUndefinable = toUndefinable;
exports.toNullable = toNullable;
exports.toBoolean = toBoolean;
exports.toString = toString;
exports.toNumber = toNumber;
exports.toInteger = toInteger;

function toUndefinable(value) {
  return value || undefined;
}

function toNullable(value) {
  return value || null;
}

function toBoolean(value) {
  return Boolean(value);
}

function toString(value) {
  return String(value);
}

function toNumber(value) {
  return Number(value);
}

function toInteger(value) {
  return parseInt(value);
}