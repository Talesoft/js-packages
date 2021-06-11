"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.some = some;
exports.fromPredicate = fromPredicate;
exports.fromNullable = fromNullable;
exports.fromFalsible = fromFalsible;
exports.none = exports.vocabulary = void 0;
const vocabulary = 'https://schema.tale.codes/option.json#';
exports.vocabulary = vocabulary;

function some(value) {
  return Object.defineProperties({
    '@vocab': vocabulary,
    '@type': 'some',
    value
  }, {
    map: {
      value: transform => some(transform(value))
    },
    orUndefined: {
      value
    },
    orNull: {
      value
    },
    asArray: {
      get: () => [value]
    }
  });
}

const none = Object.defineProperties({
  '@vocab': vocabulary,
  '@type': 'none'
}, {
  map: {
    value: () => none
  },
  orUndefined: {
    value: undefined
  },
  orNull: {
    value: null
  },
  asArray: {
    value: []
  }
});
exports.none = none;

function fromPredicate(predicate, value) {
  return predicate(value) ? some(value) : none;
}

function fromNullable(value) {
  return fromPredicate(value => value !== null && value !== undefined, value);
}

function fromFalsible(value) {
  return fromPredicate(Boolean, value);
}