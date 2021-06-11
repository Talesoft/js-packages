"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ok = ok;
exports.failure = failure;

function withMethods(value, methods) {
  Object.entries(methods).forEach(([name, method]) => Object.defineProperty(value, name, {
    enumerable: false,
    configurable: false,
    writable: false,
    value: method
  }));
  return value;
}

function ok(value) {
  return withMethods({
    value
  }, {
    map: transform => ok(transform(value)),
    mapError: () => ok(value),
    then: transform => transform(value),
    catch: () => ok(value),
    orThrow: () => value
  });
}

function failure(error) {
  return withMethods({
    error
  }, {
    map: () => failure(error),
    mapError: transform => failure(transform(error)),
    then: () => failure(error),
    catch: transform => transform(error),
    orThrow: () => {
      'hide source';

      throw error;
    }
  });
}