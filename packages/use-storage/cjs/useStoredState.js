"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useStoredState;

var _react = require("react");

var _tryCatch = _interopRequireDefault(require("@talesoft/try-catch"));

var _storage = require("./storage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useStoredState(storageType, key, initialValue) {
  const [state, setState] = (0, _react.useState)(() => (0, _tryCatch.default)(() => {
    var _getJsonStorageItem;

    return (_getJsonStorageItem = (0, _storage.getJsonStorageItem)(storageType, key)) !== null && _getJsonStorageItem !== void 0 ? _getJsonStorageItem : initialValue;
  }, () => initialValue));
  (0, _react.useEffect)(() => {
    (0, _storage.setJsonStorageItem)(storageType, key, state);
  }, [storageType, key, state]);
  return [state, setState];
}