"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ok = ok;
exports.failure = failure;
exports.fromFallible = fromFallible;
exports.vocabulary = void 0;

var _option = require("@talesoft/option");

const vocabulary = 'https://schema.tale.codes/result.json#';
exports.vocabulary = vocabulary;

function ok(value) {
  return Object.defineProperties({
    '@vocab': vocabulary,
    '@type': 'ok',
    value
  }, {
    map: {
      value: transform => ok(transform(value))
    },
    mapError: {
      value: () => ok(value)
    },
    orThrow: {
      value
    },
    asOption: {
      get: () => (0, _option.some)(value)
    },
    asErrorOption: {
      value: _option.none
    },
    asArray: {
      get: () => [value]
    },
    asErrorArray: {
      get: () => []
    }
  });
}

function failure(error) {
  return Object.defineProperties({
    '@vocab': vocabulary,
    '@type': 'failure',
    error
  }, {
    map: {
      value: () => failure(error)
    },
    mapError: {
      value: transform => failure(transform(error))
    },
    orThrow: {
      get: () => {
        throw error;
      }
    },
    asOption: {
      value: _option.none
    },
    asErrorOption: {
      get: () => (0, _option.some)(error)
    },
    asArray: {
      get: () => []
    },
    asErrorArray: {
      get: () => [error]
    }
  });
}

function fromFallible(fallible) {
  try {
    return ok(fallible());
  } catch (error) {
    return failure(error);
  }
}