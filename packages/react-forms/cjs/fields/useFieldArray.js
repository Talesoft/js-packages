"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFieldArray;

var _react = require("react");

var _useField = _interopRequireDefault(require("./useField"));

var _immutable = require("immutable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isList(value) {
  return value instanceof _immutable.List;
}

function useFieldArray(name) {
  const {
    immutableValue,
    setValue
  } = (0, _useField.default)(name);

  if (!isList(immutableValue)) {
    throw new Error(`immutableValue needs to be a immutable.js List. ` + `You probably don't have an array stored in ${name}'s value`);
  }

  return (0, _react.useMemo)(() => ({
    push: (...values) => setValue(immutableValue.push(...values.map(value => (0, _immutable.fromJS)(value)))),
    pop: () => setValue(immutableValue.pop()),
    unshift: (...values) => setValue(immutableValue.unshift(...values.map(value => (0, _immutable.fromJS)(value)))),
    shift: () => setValue(immutableValue.shift()),
    insert: (key, value) => setValue(immutableValue.insert(key, value)),
    remove: key => setValue(immutableValue.remove(key)),
    map: mapFn => immutableValue.map((_0, key) => {
      const childName = path => [name, key, path].join('.');

      const insertBefore = value => setValue(immutableValue.insert(key - 1, value));

      const insertAfter = value => setValue(immutableValue.insert(key, value));

      const remove = () => setValue(immutableValue.remove(key));

      return mapFn({
        childName,
        key,
        insertBefore,
        insertAfter,
        remove
      });
    })
  }), [immutableValue]);
}