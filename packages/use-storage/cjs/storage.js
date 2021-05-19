"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStorageItem = getStorageItem;
exports.getJsonStorageItem = getJsonStorageItem;
exports.setStorageItem = setStorageItem;
exports.setJsonStorageItem = setJsonStorageItem;
const storages = {
  memory: {},
  persistent: {},
  temporary: {}
};

function getStorageItem(type, key) {
  switch (type) {
    case 'memory':
      {
        return storages.memory[key];
      }

    case 'persistent':
      {
        if ('localStorage' in globalThis) {
          var _globalThis$localStor;

          return (_globalThis$localStor = globalThis.localStorage.getItem(key)) !== null && _globalThis$localStor !== void 0 ? _globalThis$localStor : undefined;
        }

        return storages.persistent[key];
      }

    case 'temporary':
      {
        if ('sessionStorage' in globalThis) {
          var _globalThis$sessionSt;

          return (_globalThis$sessionSt = globalThis.sessionStorage.getItem(key)) !== null && _globalThis$sessionSt !== void 0 ? _globalThis$sessionSt : undefined;
        }

        return storages.temporary[key];
      }
  }
}

function getJsonStorageItem(type, key) {
  const value = getStorageItem(type, key);

  if (value === undefined) {
    return undefined;
  }

  return JSON.parse(value);
}

function setStorageItem(type, key, value) {
  switch (type) {
    case 'memory':
      {
        storages.memory[key] = value;
        break;
      }

    case 'persistent':
      {
        if ('localStorage' in globalThis) {
          globalThis.localStorage.setItem(key, value);
        }

        storages.persistent[key] = value;
        break;
      }

    case 'temporary':
      {
        if ('sessionStorage' in globalThis) {
          globalThis.sessionStorage.getItem(key), value;
        }

        storages.temporary[key] = value;
        break;
      }
  }
}

function setJsonStorageItem(type, key, value) {
  return setStorageItem(type, key, JSON.stringify(value));
}